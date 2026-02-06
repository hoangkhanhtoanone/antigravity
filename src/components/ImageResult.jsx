import { useState } from 'react';
import { generateImageGoogle } from '../utils/imageGeneration';

export default function ImageResult({ prompt, apiKey, onOpenSettings }) {
    const [status, setStatus] = useState('idle'); // idle, generating, success, error
    const [imgUrl, setImgUrl] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleGenerate = async () => {
        if (!apiKey) {
            if (confirm("No API Key detected. Open Settings to enter your Google AI Studio Key?")) {
                onOpenSettings();
            }
            return;
        }

        setStatus('generating');
        setErrorMsg('');

        try {
            const result = await generateImageGoogle(prompt, apiKey);
            setImgUrl(result);
            setStatus('success');
        } catch (err) {
            console.error(err);
            setStatus('error');
            setErrorMsg(err.message || "Failed to generate image");
        }
    };

    return (
        <div className="image-section" style={{ marginTop: '2rem' }}>
            {status === 'idle' || status === 'error' ? (
                <div style={{ textAlign: 'center' }}>
                    <button
                        className="btn-primary"
                        onClick={handleGenerate}
                        disabled={!prompt}
                        style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
                    >
                        🚀 Generate with Google Imagen
                    </button>
                    {!prompt && <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Enhance a prompt to enable generation</p>}
                    {status === 'error' && <p style={{ color: '#ff4d4d', marginTop: '1rem' }}>Error: {errorMsg}</p>}
                </div>
            ) : null}

            {status === 'generating' && (
                <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
                    <div className="spinner" style={{
                        width: '50px', height: '50px', border: '5px solid rgba(255, 215, 0, 0.1)',
                        borderTopColor: 'var(--accent)', borderRadius: '50%', margin: '0 auto 1.5rem',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                    <p style={{ fontSize: '1.2rem', color: 'var(--accent)' }}>Calling Google Imagen...</p>
                    <p style={{ color: 'var(--text-secondary)' }}>Synthesizing pixels asynchronously</p>
                </div>
            )}

            {status === 'success' && (
                <div className="glass-panel animation-fade-in" style={{ padding: '1rem', overflow: 'hidden' }}>
                    <img
                        src={imgUrl}
                        alt="Generated Result"
                        style={{ width: '100%', borderRadius: '8px', display: 'block' }}
                    />
                    <div style={{ padding: '1rem 0 0', display: 'flex', justifyContent: 'space-between' }}>
                        <button className="btn-primary" onClick={handleGenerate} style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)' }}>
                            Regenerate
                        </button>
                        <button className="btn-primary" onClick={() => setStatus('idle')}>
                            New Prompt
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
