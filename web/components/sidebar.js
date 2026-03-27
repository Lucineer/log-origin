import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';
import { sidebarOpen, currentSessionId, addToast } from '../app.js';

export function Sidebar() {
  const [sessionList, setSessionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recap, setRecap] = useState(null);
  const [recapId, setRecapId] = useState(null);

  const getToken = () => sessionStorage.getItem('lo-token');

  const fetchSessions = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch('/v1/sessions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setSessionList(data.sessions || []);
    } catch (err) {
      console.error('Failed to fetch sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sessions on mount
  useEffect(() => { fetchSessions(); }, []);

  const handleNewSession = () => {
    currentSessionId.value = crypto.randomUUID();
    addToast('New conversation started');
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/v1/sessions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        setSessionList(prev => prev.filter(s => s.id !== id));
        if (currentSessionId.value === id) currentSessionId.value = null;
        addToast('Session deleted');
      }
    } catch {}
  };

  const handleRecap = async (id, e) => {
    e.stopPropagation();
    if (recapId === id) { setRecap(null); setRecapId(null); return; }
    setRecapId(id);
    try {
      const res = await fetch(`/v1/sessions/${id}/recap`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      setRecap(data.recap || data);
    } catch {
      setRecap('Failed to load recap.');
    }
  };

  const formatTime = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return d.toLocaleDateString();
  };

  const truncate = (str, len = 40) => str && str.length > len ? str.slice(0, len) + '...' : str || '';

  return html`
    <div class="sidebar ${sidebarOpen.value ? '' : 'collapsed'}">
      <div class="sidebar-header">
        <h2>📋 History</h2>
        <button onclick=${() => sidebarOpen.value = false}>✕</button>
      </div>
      <div class="session-list">
        ${loading ? html`<div class="session-loading">Loading...</div>` :
          sessionList.length === 0 ? html`<div class="session-empty">No sessions yet. Start chatting!</div>` :
          sessionList.map(s => html`
            <div class="session-item ${currentSessionId.value === s.id ? 'active' : ''}"
                 onclick=${() => currentSessionId.value = s.id}>
              <div class="session-title">${truncate(s.summary || s.last_message || s.first_message)}</div>
              <div class="session-meta">
                ${s.message_count || 0} msgs · ${formatTime(s.lastMessageAt)}
              </div>
              ${recapId === s.id && recap ? html`<div class="session-recap">${recap}</div>` : null}
              <div class="session-actions">
                <button class="action-btn" onclick=${(e) => handleRecap(s.id, e)} title="Recap">📝</button>
                <button class="action-btn" onclick=${(e) => handleDelete(s.id, e)} title="Delete">🗑</button>
              </div>
            </div>
          `)
        }
      </div>
      <div class="sidebar-footer">
        <button class="primary" onclick=${handleNewSession} style="flex:1">+ New Chat</button>
      </div>
    </div>
  `;
}
