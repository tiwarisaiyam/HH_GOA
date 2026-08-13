import React from 'react';

export default function ModeSelector({ graphicType, setGraphicType }) {
  const tabs = [
    { id: 'builder_id', label: 'Builder ID' },
    { id: 'banner', label: 'Banner' },
    { id: 'team', label: 'Team ID' }
  ];

  return (
    <div style={{ width: '100%', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
      {/* 3 Floating Rounded Tab Buttons (No Outer Border) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '560px',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        {tabs.map((tab) => {
          const isActive = graphicType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setGraphicType(tab.id)}
              style={{
                flex: 1,
                height: '48px',
                borderRadius: '12px',
                border: isActive ? '2px solid #ffe500' : '1px solid #026638',
                background: isActive ? '#ffe500' : '#002916',
                color: isActive ? '#000000' : '#a3c4b2',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.9rem',
                fontWeight: 900,
                letterSpacing: '0.5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 16px rgba(255, 229, 0, 0.4)' : 'none'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}