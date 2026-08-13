import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import PhotoUploader from './components/PhotoUploader';
import CameraModal from './components/CameraModal';
import ControlPanel from './components/ControlPanel';
import CanvasEditor from './components/CanvasEditor';
import ExportModal from './components/ExportModal';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [graphicType, setGraphicType] = useState('builder_id'); // 'builder_id', 'banner', 'team'
  const [userImg, setUserImg] = useState(null);
  const [transforms, setTransforms] = useState({
    1: { panX: 0, panY: 0, scale: 1, rotation: 0, filter: 'none' },
    2: { panX: 0, panY: 0, scale: 1, rotation: 0, filter: 'none' },
    3: { panX: 0, panY: 0, scale: 1, rotation: 0, filter: 'none' }
  });

  // Form Fields (Empty Defaults for Custom Input & Randomize Button)
  const [name, setName] = useState('');
  const [stack, setStack] = useState('');
  const [title, setTitle] = useState('');
  const [teamName, setTeamName] = useState('');

  // Team Squad Members State
  const [member1Img, setMember1Img] = useState(null);
  const [member2Img, setMember2Img] = useState(null);
  const [member3Img, setMember3Img] = useState(null);
  const [member2Name, setMember2Name] = useState('');
  const [member2Role, setMember2Role] = useState('');
  const [member3Name, setMember3Name] = useState('');
  const [member3Role, setMember3Role] = useState('');
  const [targetMemberIndex, setTargetMemberIndex] = useState(1);

  // Modals
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Helper to load HTMLImageElement from Data URL or File
  const handleMemberImageSelected = (input, memberIndex = 1) => {
    setTargetMemberIndex(memberIndex);
    setTransforms(prev => ({
      ...prev,
      [memberIndex]: { panX: 0, panY: 0, scale: 1, rotation: 0, filter: 'none' }
    }));
    if (!input) return;

    if (input instanceof HTMLImageElement) {
      if (memberIndex === 1) {
        setMember1Img(input);
        setUserImg(input);
      } else if (memberIndex === 2) {
        setMember2Img(input);
      } else if (memberIndex === 3) {
        setMember3Img(input);
      }
      return;
    }

    const dataUrl = typeof input === 'string' ? input : URL.createObjectURL(input);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (memberIndex === 1) {
        setMember1Img(img);
        setUserImg(img);
      } else if (memberIndex === 2) {
        setMember2Img(img);
      } else if (memberIndex === 3) {
        setMember3Img(img);
      }
    };
    img.src = dataUrl;
  };

  const triggerFileUploadForMember = (memberIndex) => {
    setTargetMemberIndex(memberIndex);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            handleMemberImageSelected(event.target.result, memberIndex);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Initialize sample avatar image for instant demo preview
  useEffect(() => {
    const avatar = new Image();
    avatar.crossOrigin = 'Anonymous';
    avatar.onload = () => {
      setUserImg(avatar);
      setMember1Img(avatar);
    };
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23111115"/><path d="M 150 150 L 250 150 L 250 250 L 150 250 Z" fill="none" stroke="%232d2d35" stroke-width="4"/><circle cx="200" cy="180" r="40" fill="none" stroke="%23ffe500" stroke-width="4"/><path d="M 120 320 Q 200 240 280 320" fill="none" stroke="%23ffe500" stroke-width="4"/><text x="200" y="375" font-size="22" font-family="monospace" font-weight="bold" fill="%23ffffff" text-anchor="middle">HH GOA BUILDER</text></svg>`;
    avatar.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
  }, []);

  const activeT = transforms[targetMemberIndex] || transforms[1];
  const setPanX = (val) => setTransforms(p => ({ ...p, [targetMemberIndex]: { ...p[targetMemberIndex], panX: typeof val === 'function' ? val(p[targetMemberIndex].panX) : val } }));
  const setPanY = (val) => setTransforms(p => ({ ...p, [targetMemberIndex]: { ...p[targetMemberIndex], panY: typeof val === 'function' ? val(p[targetMemberIndex].panY) : val } }));
  const setScale = (val) => setTransforms(p => ({ ...p, [targetMemberIndex]: { ...p[targetMemberIndex], scale: typeof val === 'function' ? val(p[targetMemberIndex].scale) : val } }));
  const setRotation = (val) => setTransforms(p => ({ ...p, [targetMemberIndex]: { ...p[targetMemberIndex], rotation: typeof val === 'function' ? val(p[targetMemberIndex].rotation) : val } }));
  const setFilter = (val) => setTransforms(p => ({ ...p, [targetMemberIndex]: { ...p[targetMemberIndex], filter: typeof val === 'function' ? val(p[targetMemberIndex].filter) : val } }));

  const panX = activeT.panX;
  const panY = activeT.panY;
  const scale = activeT.scale;
  const rotation = activeT.rotation;
  const filter = activeT.filter;

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Main Studio */}
      <main className="app-main">
        
        {/* Official Hero Banner Section */}
        <div className="banner-section" style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className="banner-title-text" style={{ color: '#ffffff', fontFamily: 'Outfit, sans-serif', fontWeight: 900, letterSpacing: '1px', lineHeight: '1' }}>
              HACKER HOUSE GOA 2026
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem', width: '100%' }}>
            <div className="banner-title-goa" style={{ background: '#00c753', color: '#000000', padding: '0.3rem 1rem', borderRadius: '4px', border: '2px solid #000000', lineHeight: '1', fontWeight: 900, textAlign: 'center', display: 'inline-block' }}>
              YOUR BUILDER ID
            </div>
          </div>

          {/* Official Tagline */}
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', color: '#00c753', letterSpacing: '1px', fontWeight: 800, marginTop: '0.8rem' }}>
            GET IT OUT.
          </p>

          <p className="banner-subtitle" style={{ marginTop: '0.5rem' }}>
            Upload your photo, choose stack, and generate your <span style={{ color: '#ffe500', fontWeight: 700 }}>HH Goa 2026 ID</span>.
          </p>

        </div>

        {/* 3-Tab Format Selector */}
        <ModeSelector
          graphicType={graphicType}
          setGraphicType={(type) => {
            setGraphicType(type);
            setTransforms({
              1: { panX: 0, panY: 0, scale: 1, rotation: 0, filter: 'none' },
              2: { panX: 0, panY: 0, scale: 1, rotation: 0, filter: 'none' },
              3: { panX: 0, panY: 0, scale: 1, rotation: 0, filter: 'none' }
            });
          }}
        />

        {/* Studio Grid */}
        <div className="studio-grid">
          
          {/* Left Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {graphicType !== 'team' && (
              <PhotoUploader
                onPhotoSelected={(img) => {
                  handleMemberImageSelected(img, 1);
                  setPanX(0);
                  setPanY(0);
                }}
                onOpenSelfieCamera={() => {
                  setTargetMemberIndex(1);
                  setIsCameraOpen(true);
                }}
                hasPhoto={!!userImg}
              />
            )}

            <ControlPanel
              graphicType={graphicType}
              activeMemberIndex={targetMemberIndex}
              setActiveMemberIndex={setTargetMemberIndex}
              onResetPhoto={(idx) => {
                setTransforms(prev => ({
                  ...prev,
                  [idx]: { panX: 0, panY: 0, scale: 1, rotation: 0, filter: 'none' }
                }));
              }}
              name={name}
              setName={setName}
              stack={stack}
              setStack={setStack}
              title={title}
              setTitle={setTitle}
              teamName={teamName}
              setTeamName={setTeamName}
              scale={scale}
              setScale={setScale}
              rotation={rotation}
              setRotation={setRotation}
              filter={filter}
              setFilter={setFilter}
              member2Name={member2Name}
              setMember2Name={setMember2Name}
              member2Role={member2Role}
              setMember2Role={setMember2Role}
              member3Name={member3Name}
              setMember3Name={setMember3Name}
              member3Role={member3Role}
              setMember3Role={setMember3Role}
              onUploadMember1={() => triggerFileUploadForMember(1)}
              onUploadMember2={() => triggerFileUploadForMember(2)}
              onUploadMember3={() => triggerFileUploadForMember(3)}
              onOpenSelfieCamera={(memberIdx) => {
                setTargetMemberIndex(memberIdx);
                setIsCameraOpen(true);
              }}
            />

            <button
              onClick={() => setIsExportOpen(true)}
              className="btn-hh-primary"
              style={{ padding: '1rem', fontSize: '1rem', width: '100%' }}
            >
              <Sparkles size={20} /> GENERATE BUILDER ID
            </button>

          </div>

          {/* Right Live Canvas */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CanvasEditor
              graphicType={graphicType}
              userImg={userImg}
              panX={panX}
              setPanX={setPanX}
              panY={panY}
              setPanY={setPanY}
              scale={scale}
              rotation={rotation}
              filter={filter}
              transforms={transforms}
              setTransforms={setTransforms}
              activeMemberIndex={targetMemberIndex}
              setActiveMemberIndex={setTargetMemberIndex}
              name={name}
              stack={stack}
              title={title}
              teamName={teamName}
              member1Img={member1Img}
              member2Img={member2Img}
              member3Img={member3Img}
              member1Name={name}
              member1Role={stack}
              member2Name={member2Name}
              member2Role={member2Role}
              member3Name={member3Name}
              member3Role={member3Role}
            />
          </div>

        </div>

      </main>


      {/* Modals */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onPhotoCaptured={(img) => {
          handleMemberImageSelected(img, targetMemberIndex);
          setPanX(0);
          setPanY(0);
        }}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        graphicType={graphicType}
        userImg={userImg}
        panX={panX}
        panY={panY}
        scale={scale}
        rotation={rotation}
        filter={filter}
        transforms={transforms}
        name={name}
        stack={stack}
        title={title}
        teamName={teamName}
        member1Img={member1Img}
        member2Img={member2Img}
        member3Img={member3Img}
        member1Name={name}
        member1Role={stack}
        member2Name={member2Name}
        member2Role={member2Role}
        member3Name={member3Name}
        member3Role={member3Role}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}