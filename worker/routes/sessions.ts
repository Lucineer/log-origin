/**
 * Session management endpoints.
 * @see docs/database/SCHEMA-DESIGN.md §1.1
 */
import { Hono } from 'hono';
import type { Env, Variables } from '../../src/types.js';

const sessions = new Hono<{ Bindings: Env; Variables: Variables }>();

sessions.get('/', async (c) => {
  const userId = c.get('userId');
  const result = await c.env.DB.prepare(
    `SELECT id, summary, message_count, last_message_at as lastMessageAt
     FROM sessions WHERE user_id = ? ORDER BY last_message_at DESC`
  ).bind(userId).all();

  return c.json({ sessions: result.results ?? [] });
});

sessions.post('/', async (c) => {
  const userId = c.get('userId');
  const id = crypto.randomUUID();

  await c.env.DB.prepare(
    `INSERT INTO sessions (id, user_id, summary, message_count, last_message_at)
     VALUES (?, ?, '', 0, datetime('now'))`
  ).bind(id, userId).run();

  return c.json({ id });
});

sessions.get('/:id', async (c) => {
  const userId = c.get('userId');
  const id = c.req.param('id');

  const session = await c.env.DB.prepare(
    `SELECT id, summary, message_count, last_message_at as lastMessageAt
     FROM sessions WHERE id = ? AND user_id = ?`
  ).bind(id, userId).first();

  if (!session) {
    return c.json({ error: { type: 'not_found', message: 'Session not found' } }, 404);
  }

  const messages = await c.env.DB.prepare(
    `SELECT id, role, content, created_at as createdAt
     FROM messages WHERE session_id = ? AND user_id = ? ORDER BY created_at ASC`
  ).bind(id, userId).all();

  return c.json({ ...session, messages: messages.results ?? [] });
});

sessions.patch('/:id', async (c) => {
  const userId = c.get('userId');
  const id = c.req.param('id');
  const body: { summary?: string } = await c.req.json().catch(() => ({}));

  if (body.summary !== undefined) {
    await c.env.DB.prepare(
      `UPDATE sessions SET summary = ? WHERE id = ? AND user_id = ?`
    ).bind(body.summary, id, userId).run();
  }

  return c.json({ updated: id });
});

sessions.delete('/:id', async (c) => {
  const userId = c.get('userId');
  const id = c.req.param('id');

  await c.env.DB.prepare(
    `UPDATE sessions SET status = 'deleted' WHERE id = ? AND user_id = ?`
  ).bind(id, userId).run();

  return c.json({ deleted: id });
});

export default sessions;
