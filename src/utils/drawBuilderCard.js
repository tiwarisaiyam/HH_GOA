

export function renderBuilderCard(ctx, width, height, options) {
  const {
    graphicType = 'builder_id',
    userImg,
    panX = 0,
    panY = 0,
    scale = 1,
    rotation = 0,
    filter = 'none',
    name = 'NAME',
    stack = 'YOUR STACK',
    title = 'BUILDER CLASS',
    transforms
  } = options;

  if (graphicType === 'banner') {
    renderBannerGraphic(ctx, width, height, options);
    return;
  }

  if (graphicType === 'team') {
    renderTeamGraphic(ctx, width, height, options);
    return;
  }

  renderPrimaryBuilderPass(ctx, width, height, options);
}

function drawRoundedRect(ctx, x, y, w, h, r = 10, fillStyle = null, strokeStyle = null, strokeWidth = 1) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();

  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }
  ctx.restore();
}

function renderPrimaryBuilderPass(ctx, width, height, options) {
  const { userImg, panX, panY, scale, rotation, filter, name, stack, title } = options;
  const s = width / 1080;

  ctx.clearRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. DARK MINIMALIST HACKER BACKGROUND
  ctx.fillStyle = '#323243'; // Very dark grey/black
  ctx.fillRect(0, 0, width, height);

  // Technical Grid Background
  ctx.strokeStyle = '#3a3a53';
  ctx.lineWidth = 1 * s;
  const gridSize = 40 * s;
  for (let x = 0; x <= width; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y <= height; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }

  // Accent Border
  const m = 30 * s; // margin
  ctx.strokeStyle = '#2d2d35';
  ctx.lineWidth = 2 * s;
  ctx.strokeRect(m, m, width - m * 2, height - m * 2);

  // Corner Crosshairs
  ctx.strokeStyle = '#d5185d';
  ctx.lineWidth = 2 * s;
  const cSize = 15 * s;
  const drawCrosshair = (cx, cy) => {
    ctx.beginPath();
    ctx.moveTo(cx - cSize, cy); ctx.lineTo(cx + cSize, cy);
    ctx.moveTo(cx, cy - cSize); ctx.lineTo(cx, cy + cSize);
    ctx.stroke();
  };
  drawCrosshair(m, m);
  drawCrosshair(width - m, m);
  drawCrosshair(m, height - m);
  drawCrosshair(width - m, height - m);

  // 2. TOP SECTION: HH GOA 2026 & BUILD MODE
  ctx.fillStyle = '#ffffff';
  ctx.font = `900 ${Math.round(44 * s)}px "Outfit", "Space Mono", sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText('HACKER HOUSE GOA 2026', m + 20 * s, m + 50 * s);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#00c753';
  ctx.font = `800 ${Math.round(22 * s)}px "Outfit", sans-serif`;
  ctx.fillText('BUILDER_ID', width - m - 20 * s, m + 40 * s);

  // 3. CENTER: LARGE PARTICIPANT PHOTO
  const photoW = width - m * 2 - 40 * s;
  const photoH = height - (m + 90 * s) - 340 * s; // Explicitly leave 340px for the bottom section
  const photoX = m + 20 * s;
  const photoY = m + 90 * s;

  // Photo Frame Shadow & Border
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 20 * s;
  drawRoundedRect(ctx, photoX, photoY, photoW, photoH, 10 * s, '#111115', '#444450', 2 * s);
  ctx.shadowBlur = 0; // reset shadow

  // Render Image inside clip
  ctx.save();
  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect(photoX, photoY, photoW, photoH, 10 * s) : rect(ctx, photoX, photoY, photoW, photoH);
  ctx.clip();
  if (userImg) {
    drawObjectFitCover(ctx, userImg, photoX, photoY, photoW, photoH, panX, panY, scale, rotation, filter, s);
  } else {
    drawPhotoPlaceholder(ctx, photoX + photoW / 2, photoY + photoH / 2, s);
  }
  ctx.restore();

  // Neon corner accents on photo frame
  ctx.strokeStyle = '#0bd760';
  ctx.lineWidth = 4 * s;
  ctx.beginPath(); ctx.moveTo(photoX, photoY + 30 * s); ctx.lineTo(photoX, photoY); ctx.lineTo(photoX + 30 * s, photoY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(photoX + photoW, photoY + photoH - 30 * s); ctx.lineTo(photoX + photoW, photoY + photoH); ctx.lineTo(photoX + photoW - 30 * s, photoY + photoH); ctx.stroke();

  // 4. BELOW PHOTO: NAME
  const contentY = photoY + photoH + 70 * s;
  
  ctx.fillStyle = '#ffffff';
  ctx.font = `900 ${Math.round(48 * s)}px "Outfit", sans-serif`;
  ctx.textAlign = 'left';
  const displayVal = (val, fallback) => (val && val.trim() ? val : fallback).toUpperCase();
  ctx.fillText(displayVal(name, 'PARTICIPANT NAME'), photoX, contentY);

  // 5. ROLE / STACK
  ctx.fillStyle = '#a3a3a8';
  ctx.font = `700 ${Math.round(36 * s)}px "Outfit", sans-serif`;
  ctx.fillText(`ROLE: ${displayVal(stack, 'YOUR STACK')}`, photoX, contentY + 50 * s);

  // 6. BUILDER CLASS (Highlighted)
  ctx.fillStyle = '#ffe500';
  ctx.font = `800 ${Math.round(44 * s)}px "Outfit", sans-serif`;
  ctx.fillText(`> CLASS: ${displayVal(title, 'BUILDER')}`, photoX, contentY + 110 * s);

  // 7. EVENT DETAILS (Right Aligned next to content)
  ctx.textAlign = 'right';
  ctx.fillStyle = '#8a8a9a';
  ctx.font = `600 ${Math.round(22 * s)}px "Outfit", sans-serif`;
  const rightX = photoX + photoW;
  ctx.fillText('LOC : GOA, INDIA', rightX, contentY - 20 * s);
  ctx.fillText('SYS : HACKER HOUSE GOA 2026', rightX, contentY + 15 * s);
  ctx.fillStyle = '#00c753';
  ctx.fillText('MODE: DUSTED', rightX, contentY + 50 * s);

  // Terminal Decor (Barcode-like)
  ctx.fillStyle = '#2d2d35';
  for(let i=0; i<15; i++) {
    const barW = (Math.random() * 10 + 3) * s;
    ctx.fillRect(rightX - 130 * s + (i * 9 * s), contentY + 90 * s, barW, 25 * s);
  }

  // 8. BOTTOM RIBBON (LESS NOISE. MORE SIGNAL.)
  const ribbonH = 70 * s;
  const ribbonY = height - m - ribbonH;
  ctx.fillStyle = '#ff4400';
  ctx.fillRect(m + 2 * s, ribbonY, width - m * 2 - 4 * s, ribbonH);

  ctx.fillStyle = '#000000';
  ctx.font = `900 ${Math.round(34 * s)}px "Outfit", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('JUST DO IT.', width / 2, ribbonY + 50 * s);

  // 9. #FrameInGoa Hashtag
  ctx.fillStyle = '#000000';
  ctx.fillRect(width / 2 - 140 * s, ribbonY - 20 * s, 280 * s, 40 * s);
  ctx.fillStyle = '#9d00ff';
  ctx.font = `800 ${Math.round(22 * s)}px "Outfit", sans-serif`;
  ctx.fillText('#FrameInGoa', width / 2, ribbonY + 7 * s);
}

// Draw rectangle helper for older browsers without ctx.roundRect
function rect(ctx, x, y, w, h) {
  ctx.rect(x, y, w, h);
}

/**
 * Robust Object-Fit Cover Rendering for Image
 */
function drawObjectFitCover(ctx, img, dx, dy, dw, dh, panX, panY, scale, rotation, filter, s = 1) {
  if (!img || !img.width || !img.height) return;

  ctx.save();
  // Set filters
  if (filter === 'contrast') {
    ctx.filter = 'contrast(130%) brightness(105%)';
  } else if (filter === 'cyber') {
    ctx.filter = 'hue-rotate(180deg) contrast(120%)';
  } else if (filter === 'bw') {
    ctx.filter = 'grayscale(100%) contrast(140%)';
  } else {
    ctx.filter = 'none';
  }

  // Move to the center of the target frame
  ctx.translate(dx + dw / 2 + panX, dy + dh / 2 + panY);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.scale(scale, scale);

  const imgRatio = img.width / img.height;
  const targetRatio = dw / dh;
  
  let renderW = dw;
  let renderH = dh;

  // Object-fit: cover logic
  if (imgRatio > targetRatio) {
    // Image is wider than target frame, scale height to match frame height, width scales proportionally
    renderH = dh;
    renderW = dh * imgRatio;
  } else {
    // Image is taller than target frame, scale width to match frame width, height scales proportionally
    renderW = dw;
    renderH = dw / imgRatio;
  }

  // Draw image centered in the translated/scaled context
  ctx.drawImage(img, -renderW / 2, -renderH / 2, renderW, renderH);
  ctx.restore();
}

function drawPhotoPlaceholder(ctx, centerX, centerY, s = 1) {
  ctx.save();
  ctx.fillStyle = '#e9076d';
  ctx.font = `bold ${Math.round(20 * s)}px "Outfit", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('[ NO SIGNAL ]', centerX, centerY - 15 * s);
  ctx.fillStyle = '#a3c4b2';
  ctx.font = `bold ${Math.round(14 * s)}px "Outfit", sans-serif`;
  ctx.fillText('UPLOAD PHOTO', centerX, centerY + 15 * s);
  ctx.restore();
}

/**
 * BANNER MODE (TWITTER / X HEADER BANNER - 3:1 RATIO)
 * Simplified Technical Theme
 */
function renderBannerGraphic(ctx, width, height, options) {
  const { userImg, panX, panY, scale, rotation, filter, name, stack, title } = options;
  const s = width / 1200;

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#323243';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#3a3a53';
  ctx.lineWidth = 2 * s;
  const gridSize = 40 * s;
  for (let x = 0; x <= width; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
  for (let y = 0; y <= height; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }

  ctx.strokeStyle = '#ff00fb';
  ctx.lineWidth = 4 * s;
  ctx.strokeRect(10 * s, 10 * s, width - 20 * s, height - 20 * s);

  const frameW = height * 0.72;
  const frameH = height * 0.72;
  const frameX = width * 0.08;
  const frameY = height * 0.14;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect(frameX, frameY, frameW, frameH, 10 * s) : rect(ctx, frameX, frameY, frameW, frameH);
  ctx.clip();
  ctx.fillStyle = '#111115';
  ctx.fillRect(frameX, frameY, frameW, frameH);
  if (userImg) {
    drawObjectFitCover(ctx, userImg, frameX, frameY, frameW, frameH, panX, panY, scale, rotation, filter, s);
  } else {
    drawPhotoPlaceholder(ctx, frameX + frameW / 2, frameY + frameH / 2, s);
  }
  ctx.restore();

  ctx.strokeStyle = '#24fc7e';
  ctx.lineWidth = 4 * s;
  ctx.beginPath(); ctx.roundRect ? ctx.roundRect(frameX, frameY, frameW, frameH, 10 * s) : rect(ctx, frameX, frameY, frameW, frameH); ctx.stroke();

  const textX = frameX + frameW + width * 0.05;

  ctx.fillStyle = '#ffffff';
  ctx.font = `900 ${Math.round(42 * s)}px "Outfit", sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText('HH GOA 2026', textX, height * 0.35);

  ctx.fillStyle = '#ffa10a';
  ctx.font = `900 ${Math.round(32 * s)}px "Outfit", sans-serif`;
  ctx.fillText((name && name.trim() ? name : 'NAME').toUpperCase(), textX, height * 0.55);

  ctx.fillStyle = '#91cfad';
  ctx.font = `bold ${Math.round(20 * s)}px "Outfit", sans-serif`;
  ctx.fillText(`ROLE: ${(stack && stack.trim() ? stack : 'ROLE').toUpperCase()}  |  CLASS: ${(title && title.trim() ? title : 'BIG BUILDER').toUpperCase()}`, textX, height * 0.72);
}

/**
 * TEAM MODE
 */
function renderTeamGraphic(ctx, width, height, options) {
  // Simplified Technical Theme for Team Graphic (2x1 Pyramid Layout)
  const {
    userImg, panX, panY, scale, rotation, filter, name, stack, teamName,
    member1Img, member2Img, member3Img,
    member1Name, member1Role, member2Name, member2Role, member3Name, member3Role, transforms
  } = options;
  const s = width / 1080;

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#323243';
  ctx.fillRect(0, 0, width, height);
  
  ctx.strokeStyle = '#3a3a53';
  ctx.lineWidth = 2 * s;
  const gridSize = 40 * s;
  for (let x = 0; x <= width; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
  for (let y = 0; y <= height; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }

  ctx.strokeStyle = '#00c753';
  ctx.lineWidth = 4 * s;
  ctx.strokeRect(12 * s, 12 * s, width - 24 * s, height - 24 * s);

  ctx.fillStyle = '#ffffff';
  ctx.font = `900 ${Math.round(72 * s)}px "Outfit", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('HH GOA 2026 SQUAD', width / 2, 120 * s);

  ctx.fillStyle = '#00c753';
  ctx.font = `900 ${Math.round(32 * s)}px "Outfit", sans-serif`;
  ctx.fillText(`SYS: ${(teamName || 'ALPHA SQUAD').toUpperCase()}`, width / 2, 180 * s);

  const boxW = 320 * s;
  const boxH = 400 * s; // 4:5 ratio for team members
  const gapX = 80 * s;

  const positions = [
    { x: width / 2 - gapX / 2 - boxW, y: 260 * s }, // Top Left
    { x: width / 2 + gapX / 2, y: 260 * s },        // Top Right
    { x: width / 2 - boxW / 2, y: 780 * s }         // Bottom Center
  ];

  const t1 = transforms ? transforms[1] : { panX, panY, scale, rotation, filter };
  const t2 = transforms ? transforms[2] : { panX: 0, panY: 0, scale: 1, rotation: 0, filter: 'none' };
  const t3 = transforms ? transforms[3] : { panX: 0, panY: 0, scale: 1, rotation: 0, filter: 'none' };

  const boxes = [
    { label: 'LEAD', color: '#be340e', name: (member1Name || name || 'MEMBER 1').toUpperCase(), role: (member1Role || stack || 'ROLE').toUpperCase(), img: member1Img || userImg, t: t1 },
    { label: 'BUILDER', color: '#d51818', name: (member2Name || 'MEMBER 2').toUpperCase(), role: (member2Role || 'ROLE').toUpperCase(), img: member2Img, t: t2 },
    { label: 'BUILDER', color: '#00c753', name: (member3Name || 'MEMBER 3').toUpperCase(), role: (member3Role || 'ROLE').toUpperCase(), img: member3Img, t: t3 }
  ];

  boxes.forEach((box, idx) => {
    const boxX = positions[idx].x;
    const boxY = positions[idx].y;

    // Frame
    ctx.save();
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(boxX, boxY, boxW, boxH, 8 * s) : rect(ctx, boxX, boxY, boxW, boxH);
    ctx.clip();
    ctx.fillStyle = '#111115';
    ctx.fillRect(boxX, boxY, boxW, boxH);
    if (box.img) {
      drawObjectFitCover(ctx, box.img, boxX, boxY, boxW, boxH, box.t.panX, box.t.panY, box.t.scale, box.t.rotation, box.t.filter, s);
    } else {
      drawPhotoPlaceholder(ctx, boxX + boxW / 2, boxY + boxH / 2, s);
    }
    ctx.restore();

    ctx.strokeStyle = box.color;
    ctx.lineWidth = 4 * s;
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(boxX, boxY, boxW, boxH, 8 * s) : rect(ctx, boxX, boxY, boxW, boxH); ctx.stroke();

    // Name & Role
    ctx.fillStyle = '#bf1313e4';
    ctx.font = `900 ${Math.round(34 * s)}px "Outfit", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(box.name, boxX + boxW / 2, boxY + boxH + 45 * s, 360 * s);

    ctx.fillStyle = box.color;
    ctx.font = `bold ${Math.round(22 * s)}px "Outfit", sans-serif`;
    ctx.fillText(box.role, boxX + boxW / 2, boxY + boxH + 75 * s, 360 * s);
  });

  ctx.fillStyle = '#a3a3a8';
  ctx.font = `bold ${Math.round(20 * s)}px "Outfit", sans-serif`;
  ctx.fillText('GOT IT UP. // #FrameInGoa', width / 2, 1310 * s);
}