import { useState } from 'react';

export default function PromptInput({ value, onChange, onEnhance }) {
    return (
        <div className="input-group" style={{ marginBottom: '2rem' }}>
            <label className="label">Base Prompt</label>
            <textarea
                className="input-field"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="e.g. A cat sitting on a spaceship window..."
                rows={3}
                style={{ marginBottom: '1rem' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    className="btn-primary"
                    onClick={onEnhance}
                    disabled={!value.trim()}
                >
                    ✨ Enhance Prompt
                </button>
            </div>
        </div>
    );
}
