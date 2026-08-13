import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        
        {/* Brand Left: 2:47 PM STUDIO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ background: 'var(--hh-bg-light)', border: '1px solid var(--hh-border-green)', padding: '0.4rem 0.8rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: '#a3a3a8', fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.5px' }}>
              2:47 PM STUDIO
            </span>
          </div>
        </div>

        {/* Center Logo: HH GOA 2026 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ color: '#ffffff', fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '1px' }}>
              HH GOA
            </span>
            <span style={{ color: '#00c753', fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '1px' }}>
              2026
            </span>
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.65rem', color: '#ffe500', letterSpacing: '1px', fontWeight: 700, marginTop: '2px' }}>
            BUILDER TERMINAL
          </span>
        </div>

        {/* Action Buttons Right: CHECK HYPE & APPLY */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href="https://hhgoa.com/#check-hype"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ffffff', fontFamily: 'Outfit, sans-serif', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.5px' }}
          >
            CHECK HYPE
          </a>
          <a
            href="https://hhgoa.com/radar"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: '#ffe500', color: '#000000', fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', fontWeight: 900, padding: '0.45rem 1.2rem', border: '2px dashed #000000', borderRadius: '4px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 0 15px rgba(255, 229, 0, 0.4)' }}
          >
            <Sparkles size={14} /> APPLY
          </a>
        </div>

      </div>
    </header>
  );
}