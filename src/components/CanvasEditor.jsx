import React, { useRef, useEffect, useState } from 'react';
import { renderBuilderCard } from '../utils/drawBuilderCard';
import { Move } from 'lucide-react';

export default function CanvasEditor({
  graphicType = 'builder_id',
  userImg,
  panX,
  setPanX,
  panY,
  setPanY,
  scale,
  rotation,
  filter,
  transforms,
  setTransforms,
  activeMemberIndex,
  setActiveMemberIndex,
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
  const canvasRef = useRef(null);
  const [loadedImageObj, setLoadedImageObj] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const getDimensions = () => {
    if (graphicType === 'banner') return { width: 1200, height: 400, aspectRatio: '3 / 1', maxWidth: '100%' };
    if (graphicType === 'team') return { width: 1080, height: 1350, aspectRatio: '4 / 5', maxWidth: '480px' }; // Updated to match social portrait
    return { width: 1080, height: 1350, aspectRatio: '4 / 5', maxWidth: '480px' };
  };

  const { width: canvasW, height: canvasH, aspectRatio, maxWidth } = getDimensions();

  // Load Image Object
  useEffect(() => {
    if (!userImg) {
      setLoadedImageObj(null);
      return;
    }

    if (userImg instanceof HTMLImageElement) {
      if (userImg.complete && userImg.naturalWidth > 0) {
        setLoadedImageObj(userImg);
      } else {
        userImg.onload = () => setLoadedImageObj(userImg);
      }
      return;
    }

    if (typeof userImg === 'string') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setLoadedImageObj(img);
      };
      img.src = userImg;
    }
  }, [userImg]);

  // Instant 60 FPS Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId;
    const ctx = canvas.getContext('2d');

    const render = () => {
      renderBuilderCard(ctx, canvasW, canvasH, {
        graphicType,
        userImg: loadedImageObj,
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
        member1Img: member1Img || loadedImageObj,
        member2Img,
        member3Img,
        member1Name,
        member1Role,
        member2Name,
        member2Role,
        member3Name,
        member3Role
      });
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [
    canvasW,
    canvasH,
    graphicType,
    loadedImageObj,
    panX,
    panY,
    scale,
    rotation,
    filter,
    transforms,
    activeMemberIndex,
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
  ]);

  const activeIndexRef = useRef(activeMemberIndex || 1);
  useEffect(() => {
    activeIndexRef.current = activeMemberIndex || 1;
  }, [activeMemberIndex]);

  const handlePointerDown = (e) => {
    let currentIndex = activeMemberIndex || 1;
    let currentPanX = panX;
    let currentPanY = panY;

    if (graphicType === 'team' && setActiveMemberIndex) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      
      if (x < rect.width / 3) currentIndex = 1;
      else if (x < (2 * rect.width) / 3) currentIndex = 2;
      else currentIndex = 3;

      if (currentIndex !== activeMemberIndex) {
        setActiveMemberIndex(currentIndex);
      }
      if (transforms && transforms[currentIndex]) {
        currentPanX = transforms[currentIndex].panX;
        currentPanY = transforms[currentIndex].panY;
      }
    }
    
    activeIndexRef.current = currentIndex;
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX, 
      y: e.clientY,
      initialPanX: currentPanX,
      initialPanY: currentPanY
    });
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasW / rect.width;
    const scaleY = canvasH / rect.height;

    const deltaX = (e.clientX - dragStart.x) * scaleX;
    const deltaY = (e.clientY - dragStart.y) * scaleY;

    const newPanX = dragStart.initialPanX + deltaX;
    const newPanY = dragStart.initialPanY + deltaY;

    if (setTransforms) {
      setTransforms(prev => ({
        ...prev,
        [activeIndexRef.current]: {
          ...prev[activeIndexRef.current],
          panX: newPanX,
          panY: newPanY
        }
      }));
    } else {
      setPanX(newPanX);
      setPanY(newPanY);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100%', position: 'relative', height: '100%' }}>
      <div
        className="canvas-wrapper"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab', 
          maxWidth,
          height: 'auto',
          alignSelf: 'flex-start',
          flexShrink: 0
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasW}
          height={canvasH}
          className="canvas-element"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Drag Hint Pill (Outside of Canvas Box) */}
      <div
        className="drag-hint"
        style={{
          position: 'relative',
          bottom: 'auto',
          left: 'auto',
          transform: 'none',
          marginTop: '0.25rem',
          background: 'rgba(0, 33, 16, 0.9)',
          border: '1.5px solid #ffe500',
          color: '#ffe500',
          padding: '0.4rem 1rem',
          borderRadius: '20px',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)'
        }}
      >
        <Move size={14} color="#ffe500" />
        <span>DRAG PHOTO TO REPOSITION</span>
      </div>
    </div>
  );
}