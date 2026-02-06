import { useState, useEffect } from 'react'
import PromptInput from './components/PromptInput';
import PromptDisplay from './components/PromptDisplay';
import ImageResult from './components/ImageResult';
import SettingsModal from './components/SettingsModal';
import { enhancePrompt } from './utils/promptEnhancer';

function App() {
  const [basicPrompt, setBasicPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const storedKey = localStorage.getItem('google_api_key');
    if (storedKey) setApiKey(storedKey);
  }, []);

  const handleEnhance = () => {
    const enhanced = enhancePrompt(basicPrompt);
    setEnhancedPrompt(enhanced);
  };

  return (
    <div className="app-container">
      <header style={{ marginBottom: '4rem', textAlign: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
          width: '200px', height: '100px', background: 'var(--accent)', filter: 'blur(80px)', opacity: 0.2, zIndex: -1
        }}></div>
        <h1 style={{
          fontSize: '4rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #fff 30%, var(--accent) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          letterSpacing: '-2px'
        }}>
          NANO BANANA PRO
        </h1>
        <button
          onClick={() => setIsSettingsOpen(true)}
          style={{
            position: 'absolute', top: 0, right: 0,
            background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
            width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer',
            fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          title="Settings"
        >
          ⚙️
        </button>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Next-Gen Generative Suite
        </p>
      </header>

      <main className="glass-panel" style={{ padding: '3rem', minHeight: '400px' }}>
        <PromptInput
          value={basicPrompt}
          onChange={setBasicPrompt}
          onEnhance={handleEnhance}
        />

        <PromptDisplay enhancedPrompt={enhancedPrompt} />

        <ImageResult prompt={enhancedPrompt || basicPrompt} apiKey={apiKey} onOpenSettings={() => setIsSettingsOpen(true)} />
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={setApiKey}
      />

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--glass-border)', fontSize: '0.8rem' }}>
        POWERED BY GEMINI 3 PRO ARCHITECTURE
      </footer>
    </div>
  )
}

export default App
