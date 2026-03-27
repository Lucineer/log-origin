import { html } from 'htm/preact';
import { MessageContent } from './chat.js';
import { authState } from '../app.js';

function sendFeedback(message, sentiment) {
  if (!message.id) return;
  const token = sessionStorage.getItem('lo-token') || authState.value.token;
  fetch(`/v1/chat/interactions/${message.id}/feedback`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ sentiment }),
  }).catch(() => {});
}

export function Message({ message }) {
  const { role, content, model, ts } = message;
  const time = ts ? new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  if (role === 'system') {
    return html`<div class="message system">${content}</div>`;
  }

  return html`
    <div class="message ${role}">
      <div class="message-bubble">
        <${MessageContent} content=${content} />
      </div>
      <div class="message-meta">
        ${time}
        ${model ? html`<span class="route-badge">${model.split('/').pop()}</span>` : null}
        ${role === 'assistant' ? html`
          <span class="feedback-btns">
            <button onclick=${() => sendFeedback(message, 'positive')} title="Good">👍</button>
            <button onclick=${() => sendFeedback(message, 'negative')} title="Bad">👎</button>
          </span>
        ` : null}
      </div>
    </div>
  `;
}
