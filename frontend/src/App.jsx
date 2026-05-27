import { useState } from 'react';

export default function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const ping = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hello');
      const data = await res.json();
      setResponse(data);
    } catch {
      setResponse({ message: 'Error: backend unreachable', time: '' });
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.whale}>🐳</div>
        <h1 style={styles.title}>Docker Hello World</h1>
        <p style={styles.sub}>Vite + React frontend · Node/Express backend · Docker Compose</p>

        <button style={styles.btn} onClick={ping} disabled={loading}>
          {loading ? 'Pinging...' : 'Ping Backend'}
        </button>

        {response && (
          <div style={styles.result}>
            <div style={styles.msg}>{response.message}</div>
            {response.time && <div style={styles.time}>{response.time}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 20,
    padding: '48px 56px',
    textAlign: 'center',
    color: '#fff',
    maxWidth: 480,
    width: '90%',
    backdropFilter: 'blur(12px)',
  },
  whale: { fontSize: 64, marginBottom: 12 },
  title: { fontSize: 32, fontWeight: 700, margin: '0 0 8px' },
  sub: { fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 36px', lineHeight: 1.6 },
  btn: {
    background: '#00b4d8',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '14px 36px',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  result: {
    marginTop: 28,
    background: 'rgba(0,180,216,0.1)',
    border: '1px solid rgba(0,180,216,0.3)',
    borderRadius: 10,
    padding: '16px 20px',
  },
  msg: { fontSize: 18, fontWeight: 600 },
  time: { fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 6 },
};
