import React, { useEffect, useState } from 'react';

// EntryCard component
function EntryCard({ entry, onDelete }) {
  return (
    <div
      className="entry-card"
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
      }}
    >
      <h3>{entry.title}</h3>
      <p>{entry.content}</p>
      {entry.mood && (
        <p>
          <strong>Mood:</strong> {entry.mood}
        </p>
      )}
      <small>{new Date(entry.createdAt).toLocaleString()}</small>
      <div>
        <button
          onClick={onDelete}
          style={{
            marginTop: '5px',
            background: 'red',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [customMood, setCustomMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [wisdomIndex, setWisdomIndex] = useState(0);

  const API_URL = 'http://localhost:5000/api/entries';

  const wisdoms = [
    "Breathe and let go.",
    "This too shall pass.",
    "Every day is a second chance.",
    "Happiness is homemade.",
    "Small steps matter.",
    "Less is more.",
    "Be here now.",
    "Progress, not perfection.",
    "Kindness is free.",
    "Silence speaks volumes.",
    "Patience is power.",
    "Courage over comfort.",
    "Start where you are.",
    "Focus on what matters.",
    "Dream. Plan. Do.",
    "Gratitude changes everything.",
    "Simplicity is beauty.",
    "Your vibe attracts your tribe.",
    "Listen more, talk less.",
    "Stay curious.",
  ];

  // Cycle through wisdom quotes every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWisdomIndex((prev) => (prev + 1) % wisdoms.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fetch all diary entries
  async function fetchEntries() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch entries');
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error('Failed to fetch entries:', err);
      setEntries([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  // Add a new entry
  async function addEntry(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      return alert('Please fill in title and content.');
    }

    const finalMood = mood === 'Other' ? customMood : mood;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, mood: finalMood }),
      });

      if (res.ok) {
        const newEntry = await res.json();
        setEntries((prev) => [newEntry, ...prev]);
        setTitle('');
        setContent('');
        setMood('');
        setCustomMood('');
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Error adding entry.');
      }
    } catch (err) {
      console.error('Error adding entry:', err);
    }
  }

  // Delete an entry
  async function deleteEntry(id) {
    if (!confirm('Delete this entry?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEntries((prev) => prev.filter((e) => e.id !== id));
      } else {
        alert('Failed to delete entry');
      }
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  }

  return (
    <div
      className="container"
      style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}
    >
      <header>
        <h1>My Diary</h1>
        <p className="subtitle">A friendly, Diary app</p>
      </header>

      <section className="new-entry" style={{ marginBottom: '20px' }}>
        <form onSubmit={addEntry}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts..."
            rows="4"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          >
            <option value="">Select Mood (optional)</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Angry">Angry</option>
            <option value="Excited">Excited</option>
            <option value="Relaxed">Relaxed</option>
            <option value="Other">Other</option>
          </select>
          {mood === 'Other' && (
            <input
              value={customMood}
              onChange={(e) => setCustomMood(e.target.value)}
              placeholder="Type your mood"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          )}
          <div className="controls">
            <button
              className="btn primary"
              type="submit"
              style={{ marginRight: '10px', padding: '8px 12px' }}
            >
              Add Entry
            </button>
            <button
              className="btn ghost"
              type="button"
              onClick={() => {
                setTitle('');
                setContent('');
                setMood('');
                setCustomMood('');
              }}
              style={{ padding: '8px 12px' }}
            >
              Clear
            </button>
          </div>
        </form>
      </section>

      <section className="entries">
        {loading ? (
          <p>Loading...</p>
        ) : entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          entries.map((e) => <EntryCard key={e.id} entry={e} onDelete={() => deleteEntry(e.id)} />)
        )}
      </section>

      <footer
        style={{
          marginTop: '30px',
          textAlign: 'center',
          fontStyle: 'italic',
          color: '#636e72',
          transition: 'all 1s ease-in-out',
        }}
      >
        <span style={{ animation: 'fade 4s infinite' }}>{wisdoms[wisdomIndex]}</span>
      </footer>

      <style>{`
        @keyframes fade {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
