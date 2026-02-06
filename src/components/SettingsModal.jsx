import { useState, useEffect } from 'react';

export default function SettingsModal({ isOpen, onClose, onSave }) {
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const savedKey = localStorage.getItem('google_api_key');
        if (savedKey) setApiKey(savedKey);
    }, [isOpen]);

    const handleSave = () => {
        localStorage.setItem('google_api_key', apiKey);
        onSave(apiKey);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div className="glass-panel" style={{ padding: '2rem', width: '90%', maxWidth: '500px' }}>
                <h2 style={{ marginTop: 0, color: 'var(--accent)' }}>Settings</h2>

                <label className="label">Google AI Studio API Key</label>
                <input
                    type="password"
                    className="input-field"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API Key..."
                    style={{ marginBottom: '1.5rem' }}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button
                        className="btn-primary"
                        style={{ background: 'transparent', border: '1px solid var(--text-secondary)', color: 'var(--text-primary)' }}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn-primary"
                        onClick={handleSave}
                    >
                        Save & Close
                    </button>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
                    Your key is stored locally in your browser and used only for requests to Google.
                </p>
            </div>
        </div>
    );
}
