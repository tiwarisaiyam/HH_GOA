import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, Sparkles } from 'lucide-react';

export default function CameraModal({ isOpen, onClose, onPhotoCaptured }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    startCamera('user');

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async (mode) => {
    stopCamera();
    setErrorMsg(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 1280 }
        },
        audio: false
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Webcam access error:', err);
      setErrorMsg('Camera access denied or device unavailable. Please allow camera permissions in browser settings.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startCountdownAndSnap = () => {
    if (countdown !== null) return;
    setCountdown(3);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          takeSnapshot();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;

    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 300);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 640;

    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    onPhotoCaptured(dataUrl);
    stopCamera();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--hh-glass-border)', paddingBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Camera color="#00c753" size={22} />
            <h3 style={{ fontFamily: 'Prata, serif', fontSize: '1.1rem', fontWeight: 700, color: '#ffe500' }}>
              TAKE A SELFIE
            </h3>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            style={{ background: 'none', border: 'none', color: '#a3c4b2', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Camera Viewport */}
        <div style={{ position: 'relative', aspectRatio: '1/1', width: '100%', background: '#000000', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,229,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {isFlashing && (
            <div style={{ position: 'absolute', inset: 0, background: '#ffffff', zIndex: 30 }} />
          )}

          {countdown !== null && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Prata, serif', fontWeight: 900, fontSize: '5rem', color: '#ffe500', textShadow: '0 0 20px #00c753' }}>
                {countdown}
              </span>
            </div>
          )}

          {errorMsg ? (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: '#f87171', fontFamily: 'Outfit, sans-serif', fontSize: '0.8rem' }}>
              <p>{errorMsg}</p>
              <button
                onClick={() => startCamera('user')}
                className="btn-hh-secondary"
                style={{ marginTop: '1rem' }}
              >
                Retry Camera
              </button>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scaleX(-1)'
              }}
            />
          )}

        </div>

        {/* Clean Full-Width Single Trigger Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid var(--hh-glass-border)', paddingTop: '0.75rem' }}>
          <button
            onClick={startCountdownAndSnap}
            disabled={!!errorMsg || countdown !== null}
            className="btn-hh-primary"
            style={{ padding: '0.85rem 2rem', fontSize: '1rem', width: '100%', background: '#00c753', color: '#ffffff', borderColor: '#ffe500', justifyContent: 'center' }}
          >
            <Sparkles size={20} /> SNAP SELFIE
          </button>
        </div>

      </div>
    </div>
  );
}