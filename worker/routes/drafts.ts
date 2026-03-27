/**
 * Draft comparison endpoints.
 * Sends a message to multiple providers in parallel and returns results.
 */
import { Hono } from 'hono';
import type { Env } from '../../src/types.js';

const drafts = new Hono<{ Bindings: Env }>();

drafts.post('/compare', async (c) => {
  const body = await c.req.json<{ messages: Array<{ role: string; content: string }>; models?: string[] }>();
  const { messages, models } = body;

  if (!messages?.length) {
    return c.json({ error: 'messages array is required' }, 400);
  }

  // Default models to compare
  const defaultModels = ['openai/gpt-4o-mini', 'anthropic/claude-3-haiku-20240307'];
  const targetModels = models?.length ? models : defaultModels;

  // Call all providers in parallel
  const results = await Promise.allSettled(
    targetModels.map(async (model) => {
      const start = Date.now();
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${c.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: model.includes('/') ? model.split('/').pop() : model,
          messages,
          max_tokens: 1024,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Provider error: ${res.status} ${err}`);
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || '';
      const latency = Date.now() - start;

      return {
        id: crypto.randomUUID(),
        model,
        content,
        latency,
        tokens: data.usage || {},
      };
    })
  );

  const successful = results
    .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
    .map(r => r.value);

  const errors = results
    .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
    .map((r, i) => ({ model: targetModels[i], error: r.reason?.message || String(r.reason) }));

  // Store draft results in D1
  try {
    const userId = c.get('userId');
    for (const draft of successful) {
      await c.env.DB?.prepare(
        'INSERT INTO interactions (user_id, role, content, model, tokens_used, metadata) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(
        userId || 'anonymous',
        'assistant',
        draft.content,
        draft.model,
        JSON.stringify(draft.tokens),
        JSON.stringify({ type: 'draft', latency: draft.latency })
      ).run();
    }
  } catch {}

  return c.json({ drafts: successful, errors });
});

drafts.post('/winner/:draftId', async (c) => {
  const draftId = c.req.param('draftId');
  try {
    await c.env.DB?.prepare(
      'UPDATE interactions SET metadata = json_set(metadata, "$.winner", 1) WHERE id = ?'
    ).bind(draftId).run();
  } catch {}
  return c.json({ updated: draftId });
});

export default drafts;
