import React from 'react';
import { Sparkles, Sliders, RotateCw, ZoomIn, Palette, Users } from 'lucide-react';
import { getRandomTitle, generateTitleFromStack } from '../utils/titleGenerator';
export default function ControlPanel({
  graphicType = 'builder_id',
  activeMemberIndex,
  setActiveMemberIndex,
  onResetPhoto,
  name,
  setName,
  stack,
  setStack,
  title,
  setTitle,
  teamName,
  setTeamName,
  scale,
  setScale,
  rotation,
  setRotation,
  filter,
  setFilter,
  member2Name,
  setMember2Name,
  member2Role,
  setMember2Role,
  member3Name,
  setMember3Name,
  member3Role,
  setMember3Role,
  onUploadMember1,
  onUploadMember2,
  onUploadMember3,
  onOpenSelfieCamera
}) {
  const handleRandomizeTitle = () => {
    if (setTitle) setTitle(getRandomTitle(name + stack + Date.now()));
  };

  const handleStackChange = (e) => {
    const val = e.target.value;
    if (setStack) setStack(val);
    if (setTitle) setTitle(generateTitleFromStack(val));
  };

  return (
    <div className="hh-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* SECTION 1: BADGE / TEAM DETAILS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--hh-glass-border)', paddingBottom: '0.5rem' }}>
          {graphicType === 'team' ? <Users size={18} color="#ffe500" /> : <Sliders size={18} color="#ffe500" />}
          <h3 style={{ fontFamily: 'Prata, serif', fontWeight: 700, fontSize: '0.9rem', color: '#ffe500', letterSpacing: '1px' }}>
            {graphicType === 'team' ? 'TEAM SQUAD FIELDS' : 'BUILDER BADGE FIELDS'}
          </h3>
        </div>

        {graphicType === 'team' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Squad Project Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.7rem', color: '#a3c4b2', display: 'block', marginBottom: '4px' }}>
                  SQUAD NAME
                </label>
                <input
                  type="text"
                  value={teamName || ''}
                  onChange={(e) => setTeamName && setTeamName(e.target.value)}
                  placeholder="Enter team name"
                  className="hh-input"
                />
              </div>
            </div>

            {/* Member 1 (Captain) */}
            <div style={{ background: '#002110', border: '1.5px solid #ffe500', borderRadius: '10px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '0.75rem', color: '#ffe500' }}>
                ⚡ MEMBER 1
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={onUploadMember1}
                  style={{ background: '#00361d', border: '1px solid #ffe500', color: '#ffe500', fontFamily: 'Outfit, sans-serif', fontSize: '0.7rem', fontWeight: 700, padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}
                >
                  📁 UPLOAD PHOTO
                </button>
                <button
                  type="button"
                  onClick={() => onOpenSelfieCamera && onOpenSelfieCamera(1)}
                  style={{ background: '#ffffff', border: '1px solid #ffe500', color: '#000000', fontFamily: 'Outfit, sans-serif', fontSize: '0.7rem', fontWeight: 700, padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}
                >
                  📸 TAKE SELFIE
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={name || ''}
                  onChange={(e) => setName && setName(e.target.value)}
                  placeholder="ENTER NAME"
                  className="hh-input"
                  style={{ fontSize: '0.75rem' }}
                />
                <input
                  type="text"
                  value={stack || ''}
                  onChange={(e) => setStack && setStack(e.target.value)}
                  placeholder="ENTER ROLE"
                  className="hh-input"
                  style={{ fontSize: '0.75rem' }}
                />
              </div>
            </div>

            {/* Member 2 (Frontend) */}
            <div style={{ background: '#002110', border: '1.5px solid #ffffff', borderRadius: '10px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '0.75rem', color: '#ffffff' }}>
                ⚡ MEMBER 2
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={onUploadMember2}
                  style={{ background: '#00361d', border: '1px solid #ffffff', color: '#000000', fontFamily: 'Outfit, sans-serif', fontSize: '0.7rem', fontWeight: 700, padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}
                >
                  📁 UPLOAD PHOTO
                </button>
                <button
                  type="button"
                  onClick={() => onOpenSelfieCamera && onOpenSelfieCamera(2)}
                  style={{ background: '#ffffff', border: '1px solid #ffe500', color: '#000000', fontFamily: 'Outfit, sans-serif', fontSize: '0.7rem', fontWeight: 700, padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}
                >
                  📸 TAKE SELFIE
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={member2Name || ''}
                  onChange={(e) => setMember2Name && setMember2Name(e.target.value)}
                  placeholder="ENTER NAME"
                  className="hh-input"
                  style={{ fontSize: '0.75rem' }}
                />
                <input
                  type="text"
                  value={member2Role || ''}
                  onChange={(e) => setMember2Role && setMember2Role(e.target.value)}
                  placeholder="ENTER ROLE"
                  className="hh-input"
                  style={{ fontSize: '0.75rem' }}
                />
              </div>
            </div>

            {/* Member 3 (Backend) */}
            <div style={{ background: '#002110', border: '1.5px solid #00c753', borderRadius: '10px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '0.75rem', color: '#00c753' }}>
                ⚡ MEMBER 3
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={onUploadMember3}
                  style={{ background: '#00361d', border: '1px solid #00c753', color: '#00c753', fontFamily: 'Outfit, sans-serif', fontSize: '0.7rem', fontWeight: 700, padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}
                >
                  📁 UPLOAD PHOTO
                </button>
                <button
                  type="button"
                  onClick={() => onOpenSelfieCamera && onOpenSelfieCamera(3)}
                  style={{ background: '#ffffff', border: '1px solid #ffe500', color: '#000000', fontFamily: 'Outfit, sans-serif', fontSize: '0.7rem', fontWeight: 700, padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}
                >
                  📸 TAKE SELFIE
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={member3Name || ''}
                  onChange={(e) => setMember3Name && setMember3Name(e.target.value)}
                  placeholder="ENTER NAME"
                  className="hh-input"
                  style={{ fontSize: '0.75rem' }}
                />
                <input
                  type="text"
                  value={member3Role || ''}
                  onChange={(e) => setMember3Role && setMember3Role(e.target.value)}
                  placeholder="ENTER ROLE"
                  className="hh-input"
                  style={{ fontSize: '0.75rem' }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.7rem', color: '#a3c4b2', display: 'block', marginBottom: '4px' }}>
                  NAME
                </label>
                <input
                  type="text"
                  value={name || ''}
                  onChange={(e) => setName && setName(e.target.value)}
                  placeholder="YOUR NAME"
                  className="hh-input"
                />
              </div>

              <div>
                <label style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.7rem', color: '#a3c4b2', display: 'block', marginBottom: '4px' }}>
                  ROLE
                </label>
                <input
                  type="text"
                  value={stack || ''}
                  onChange={handleStackChange}
                  placeholder="ENTER YOUR ROLE"
                  className="hh-input"
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <label style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.7rem', color: '#a3c4b2' }}>
                  BUILDER CLASS
                </label>
                <button
                  type="button"
                  onClick={handleRandomizeTitle}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ffe500',
                    fontSize: '0.75rem',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Sparkles size={12} /> RANDOM CLASS
                </button>
              </div>
              <input
                type="text"
                value={title || ''}
                onChange={(e) => setTitle && setTitle(e.target.value)}
                placeholder="ENTER CLASS OR CLICK RANDOMIZE"
                className="hh-input"
                style={{ color: '#ffe500', fontWeight: 700 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: PHOTO ADJUSTMENT SLIDERS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--hh-glass-border)', paddingBottom: '0.5rem', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sliders size={18} color="#ffffff" />
            <h3 style={{ fontFamily: 'Prata, serif', color: '#ffe500', margin: 0, fontSize: '1rem', letterSpacing: '1px' }}>
              ADJUSTMENTS <span style={{ fontSize: '0.7rem', color: '#a3c4b2' }}>(EDITING MEMBER {activeMemberIndex || 1})</span>
            </h3>
          </div>
          <button
            onClick={() => {
              if (onResetPhoto) {
                onResetPhoto(activeMemberIndex || 1);
              }
            }}
            id="reset-photo-btn"
            style={{ 
              background: 'transparent', border: '1px solid #ffffff', color: '#ffffff', 
              borderRadius: '6px', padding: '0.2rem 0.5rem', fontSize: '0.7rem', cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            RESET
          </button>
        </div>

        {/* Zoom Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem', color: '#a3c4b2', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ZoomIn size={14} /> ZOOM SCALE: {Math.round((scale || 1) * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setScale && setScale(1)}
              style={{ background: 'none', border: 'none', fontSize: '0.65rem', fontFamily: 'Outfit, sans-serif', color: '#a3c4b2', cursor: 'pointer' }}
            >
              RESET
            </button>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.05"
            value={scale || 1}
            onChange={(e) => setScale && setScale(parseFloat(e.target.value))}
          />
        </div>

        {/* Rotation Controls */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem', color: '#a3c4b2', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <RotateCw size={14} /> ROTATION: {rotation || 0}°
            </span>
            <button
              type="button"
              onClick={() => setRotation && setRotation((prev) => ((prev || 0) + 90) % 360)}
              style={{ background: 'none', border: 'none', fontSize: '0.65rem', fontFamily: 'Outfit, sans-serif', color: '#ffe500', cursor: 'pointer', textDecoration: 'underline' }}
            >
              +90° FLIP
            </button>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            step="1"
            value={rotation || 0}
            onChange={(e) => setRotation && setRotation(parseInt(e.target.value))}
          />
        </div>

        {/* Filter Palette */}
        <div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem', color: '#a3c4b2', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
            <Palette size={14} /> PHOTO THEME 
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {[
              { id: 'none', label: 'NORMAL' },
              { id: 'contrast', label: 'SIGNAL' },
              { id: 'cyber', label: 'CYBER' },
              { id: 'bw', label: 'B&W' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter && setFilter(f.id)}
                style={{
                  padding: '0.4rem 0.6rem',
                  borderRadius: '6px',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '0.75rem',
                  border: filter === f.id ? '1px solid #ffffff' : '1px solid var(--hh-border-green)',
                  background: filter === f.id ? '#ffe500' : '#002d18',
                  color: filter === f.id ? '#000000' : '#ffffff',
                  fontWeight: filter === f.id ? 700 : 400,
                  cursor: 'pointer'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}