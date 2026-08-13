import React, { useState, useEffect } from 'react';
import { Download, Share2, Copy, X, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { renderBuilderCard } from '../utils/drawBuilderCard';

export default function ExportModal({
  isOpen,
  onClose,
  graphicType = 'builder_id',
  userImg,
  panX,
  panY,
  scale,
  rotation,
  filter,
  transforms,
  name,
  stack,
  title,
  teamName,
  member1Img,
  member2Img,
  member3Img,
  member1Name,
  member1Role,
  member2Name,
  member2Role,
  member3Name,
  member3Role
}) {
  const [dataUrl, setDataUrl] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const getExportDimensions = () => {
    if (graphicType === 'banner') return { width: 2400, height: 800, aspectRatio: '3 / 1' };
    if (graphicType === 'team') return { width: 1080, height: 1350, aspectRatio: '4 / 5' };
    return { width: 1080, height: 1350, aspectRatio: '4 / 5' };
  };

  const { width: exportW, height: exportH, aspectRatio } = getExportDimensions();

  useEffect(() => {
    if (!isOpen) return;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffe500', '#00c753', '#014d2a', '#ffffff']
    });

    const generateExport = (imgObj) => {
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = exportW;
      offscreenCanvas.height = exportH;

      const ctx = offscreenCanvas.getContext('2d');
      const originalW = graphicType === 'banner' ? 1200 : 1080;
      const scaleMultiplier = exportW / originalW;

      const scaledTransforms = transforms ? {
        1: transforms[1] ? { ...transforms[1], panX: transforms[1].panX * scaleMultiplier, panY: transforms[1].panY * scaleMultiplier } : { panX: 0, panY: 0, scale: 1, rotation: 0, filter: 'none' },
        2: transforms[2] ? { ...transforms[2], panX: transforms[2].panX * scaleMultiplier, panY: transforms[2].panY * scaleMultiplier } : { panX: 0, panY: 0, scale: 1, rotation: 0, filter: 'none' },
        3: transforms[3] ? { ...transforms[3], panX: transforms[3].panX * scaleMultiplier, panY: transforms[3].panY * scaleMultiplier } : { panX: 0, panY: 0, scale: 1, rotation: 0, filter: 'none' },
      } : undefined;

      renderBuilderCard(ctx, exportW, exportH, {
        graphicType,
        userImg: imgObj,
        panX: panX * scaleMultiplier,
        panY: panY * scaleMultiplier,
        scale,
        rotation,
        filter,
        transforms: scaledTransforms,
        name,
        stack,
        title,
        teamName,
        member1Img: member1Img || imgObj,
        member2Img,
        member3Img,
        member1Name,
        member1Role,
        member2Name,
        member2Role,
        member3Name,
        member3Role
      });

      const url = offscreenCanvas.toDataURL('image/png');
      setDataUrl(url);
    };

    if (typeof userImg === 'string') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => generateExport(img);
      img.src = userImg;
    } else {
      generateExport(userImg);
    }
  }, [isOpen, graphicType, userImg, panX, panY, scale, rotation, filter, name, stack, title, teamName, exportW, exportH]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `HHGoa_2026_${graphicType.toUpperCase()}_${(name || 'Builder').replace(/\s+/g, '_')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShareToX = () => {
    const text = encodeURIComponent(
      `Just claimed my HH Goa 2026 Builder ID ⚡\nSee you in Goa.`
    );
    const hashtags = encodeURIComponent('FrameInGoa');
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyToClipboard = async () => {
    if (!dataUrl) return;
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
      handleDownload();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '560px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--hh-glass-border)', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles color="#ffe500" size={22} />
            <h3 style={{ fontFamily: 'Prata, serif', fontSize: '1.2rem', fontWeight: 700, color: '#ffe500' }}>
              YOUR BUILDER ID IS READY!
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#a3c4b2', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* High-Res Preview Image */}
        <div style={{ aspectRatio, width: '100%', background: '#002b17', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,229,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {dataUrl ? (
            <img src={dataUrl} alt="HH Goa 2026 Graphic" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', color: '#ffe500' }}>Generating High-Res Output...</span>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
          
          <button
            onClick={handleDownload}
            className="btn-hh-primary"
            style={{ fontSize: '0.75rem', padding: '0.75rem' }}
          >
            <Download size={16} /> DOWNLOAD BUILDER ID
          </button>

          <button
            onClick={handleShareToX}
            className="btn-hh-primary"
            style={{ fontSize: '0.75rem', padding: '0.75rem', background: '#00c753', color: '#ffffff', borderColor: '#ffe500' }}
          >
            <Share2 size={16} /> SHARE TO X
          </button>

          <button
            onClick={handleCopyToClipboard}
            className="btn-hh-secondary"
            style={{ fontSize: '0.75rem', padding: '0.75rem', justifyContent: 'center' }}
          >
            {isCopied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
            {isCopied ? 'COPIED!' : 'COPY'}
          </button>

        </div>

        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.7rem', textAlign: 'center', color: '#a3c4b2', marginTop: '0.25rem' }}>
          Tag <span style={{ color: '#ffe500' }}>#FrameInGoa</span> when posting on X!
        </p>

      </div>
    </div>
  );
}