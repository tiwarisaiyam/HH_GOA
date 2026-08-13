import React, { useRef } from 'react';
import { Camera, Upload } from 'lucide-react';
import { convertHeicToJpeg } from '../utils/heicHandler';

export default function PhotoUploader({ onPhotoSelected, onOpenSelfieCamera, hasPhoto }) {
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const processedFile = await convertHeicToJpeg(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onPhotoSelected(event.target.result); // Pass data URL string directly
      }
    };
    reader.readAsDataURL(processedFile);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const processedFile = await convertHeicToJpeg(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onPhotoSelected(event.target.result); // Pass data URL string directly
      }
    };
    reader.readAsDataURL(processedFile);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
        style={{ display: 'none' }}
      />

      <div className="uploader-grid">
        {/* Upload File Card */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="upload-card"
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#00361d',
            border: '1px solid #ffe500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Upload size={20} color="#ffe500" />
          </div>
          <div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: '#ffe500', display: 'block' }}>
              UPLOAD PHOTO
            </span>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.65rem', color: '#a3c4b2', display: 'block', marginTop: '2px' }}>
              JPG, PNG, HEIC (Drag & Drop)
            </span>
          </div>
        </div>

        {/* TAKE A SELFIE CARD */}
        <div
          onClick={onOpenSelfieCamera}
          className="selfie-card"
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#00c753',
            border: '1px solid #ffe500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(255,0,122,0.6)'
          }}>
            <Camera size={20} color="#ffffff" />
          </div>
          <div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: '#ffffff', display: 'block' }}>
              📸 TAKE A QUICK SELFIE
            </span>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.65rem', color: '#ffe500', display: 'block', marginTop: '2px' }}>
              Use Device Photo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}