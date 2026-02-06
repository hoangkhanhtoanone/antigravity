import { useState } from 'react';

export default function PromptDisplay({ enhancedPrompt }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(enhancedPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!enhancedPrompt) return null;

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255, 215, 0, 0.05)', border: '1px solid rgba(255, 215, 0, 0.2)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label className="label" style={{ color: 'var(--accent)', marginBottom: 0 }}>Nano Banana Optimized Prompt</label>
                <button
                    onClick={handleCopy}
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--glass-border)',
                        color: copied ? 'var(--success)' : 'var(--text-secondary)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                    }}
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <p style={{ lineHeight: '1.6', fontSize: '1.05rem', marginTop: 0 }}>
                {enhancedPrompt}
            </p>
        </div>
    );
}
