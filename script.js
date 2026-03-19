const canvas = document.getElementById('skyCanvas');
const ctx = canvas.getContext('2d');
const winMessage = document.getElementById('win-message');
const toggleBtn = document.getElementById('toggleLayerBtn');
const resetBtn = document.getElementById('resetBtn');
const loadingScreen = document.getElementById('loadingScreen');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// REDUCED: Telescope radius is now 60 (was 100)
const telescopeRadius = 60;
let mouseX = width / 2;
let mouseY = height / 2;
let hasWon = false;
let isSkyHidden = false;

// --- BUTTON LISTENERS ---
toggleBtn.addEventListener('click', () => {
  isSkyHidden = !isSkyHidden;
  toggleBtn.innerText = isSkyHidden ? "Show Night Sky" : "Hide Night Sky";
});

resetBtn.addEventListener('click', () => {
  stars.length = 0;
  objects.length = 0;
  
  hasWon = false;
  winMessage.classList.remove('show');
  
  generateUniverse();
});

// --- ASSET PATH MAP ---
const imagePaths = {
  sun: 'images/sun.png',
  mercury: 'images/mercury.png',
  venus: 'images/venus.png',
  earth: 'images/earth.png',
  mars: 'images/mars.png',
  jupiter: 'images/jupiter.png',
  saturn: 'images/saturn.png',
  uranus: 'images/uranus.png',
  neptune: 'images/neptune.png',
  pluto: 'images/pluto.png',
  crescent: 'images/crescent.png',
  asteroid: 'images/asteroid.png',
  spaceship: 'images/spaceship.png',
  satellite: 'images/satellite.png',
  astronaut: 'images/astronaut.png'
};

const assets = {}; 

function loadAllAssets() {
  const promises = [];
  
  for (let key in imagePaths) {
    promises.push(new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imagePaths[key];
      img.onload = () => {
        assets[key] = img; 
        resolve();
      };
      img.onerror = () => reject(`Failed to load: ${imagePaths[key]}`);
    }));
  }
  return Promise.all(promises);
}

// --- UNIVERSE DATA ---
const stars = [];
// REDUCED: Moon size is now 45 (was 90)
let moon = { x: 0, y: 0, size: 45, key: 'crescent' }; 
let objects = []; 

function generateUniverse() {
  for (let i = 0; i < 300; i++) { 
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2,
      color: Math.random() > 0.8 ? '#aaccff' : '#ffffff'
    });
  }

  const planetDefs = [
    { key: 'sun', size: 200 },
    { key: 'jupiter', size: 110 },
    { key: 'saturn', size: 160 }, 
    { key: 'uranus', size: 60 },
    { key: 'neptune', size: 55 },
    { key: 'earth', size: 50 },
    { key: 'venus', size: 48 },
    { key: 'mars', size: 35 },
    { key: 'mercury', size: 30 },
    { key: 'pluto', size: 20 },
  ];

  const uniqueDebris = [
    { key: 'spaceship', size: 80 }, 
    { key: 'satellite', size: 75 }, 
    { key: 'astronaut', size: 70 }, 
  ];

  const occupiedSpots = [];

  function findClearSpot(targetSize) {
    let maxAttempts = 300; 
    let edgePadding = (targetSize / 2) + 10; 

    for (let i = 0; i < maxAttempts; i++) {
      let testX = edgePadding + Math.random() * (width - edgePadding * 2);
      let testY = edgePadding + Math.random() * (height - edgePadding * 2);
      let overlap = false;

      for (let spot of occupiedSpots) {
        let dx = testX - spot.x;
        let dy = testY - spot.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let minRequiredDistance = (targetSize / 2) + (spot.size / 2) + 20;

        if (distance < minRequiredDistance) {
          overlap = true;
          break; 
        }
      }

      if (!overlap) {
        return { x: testX, y: testY }; 
      }
    }
    
    return {
      x: edgePadding + Math.random() * (width - edgePadding * 2),
      y: edgePadding + Math.random() * (height - edgePadding * 2)
    };
  }

  let moonPos = findClearSpot(moon.size);
  moon.x = moonPos.x;
  moon.y = moonPos.y;
  occupiedSpots.push({ x: moon.x, y: moon.y, size: moon.size });

  planetDefs.forEach(p => {
    let pos = findClearSpot(p.size);
    objects.push({
      ...p,
      x: pos.x,
      y: pos.y,
      rotation: Math.random() * Math.PI * 2 
    });
    occupiedSpots.push({ x: pos.x, y: pos.y, size: p.size });
  });

  uniqueDebris.forEach(d => {
    for (let i = 0; i < 3; i++) {
      let pos = findClearSpot(d.size);
      objects.push({
        ...d,
        x: pos.x,
        y: pos.y,
        rotation: Math.random() * Math.PI * 2
      });
      occupiedSpots.push({ x: pos.x, y: pos.y, size: d.size });
    }
  });

  for (let i = 0; i < 12; i++) { 
    let size = 25 + Math.random() * 30;
    let pos = findClearSpot(size);
    objects.push({
      key: 'asteroid',
      x: pos.x,
      y: pos.y,
      size: size,
      rotation: Math.random() * Math.PI * 2 
    });
    occupiedSpots.push({ x: pos.x, y: pos.y, size: size });
  }
}

function drawCenteredImage(ctx, img, x, y, size, rotation) {
  if (!img) return;
  ctx.save();
  ctx.translate(x, y); 
  ctx.rotate(rotation); 
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
}

function drawUniverse() {
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.fill();
  });

  objects.forEach(obj => {
    drawCenteredImage(ctx, assets[obj.key], obj.x, obj.y, obj.size, obj.rotation);
  });

  ctx.save();
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#fff';
  drawCenteredImage(ctx, assets[moon.key], moon.x, moon.y, moon.size, 0);
  ctx.restore();
}

function render() {
  if (!isSkyHidden) {
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, telescopeRadius, 0, Math.PI * 2);
    ctx.clip(); 
  }

  ctx.fillStyle = '#0a0a20'; 
  ctx.fillRect(0, 0, width, height);
  drawUniverse();

  if (!isSkyHidden) {
    ctx.restore();
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, telescopeRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  requestAnimationFrame(render);
}

function checkWinCondition() {
  if (hasWon || isSkyHidden) return; 

  const dx = mouseX - moon.x;
  const dy = mouseY - moon.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < telescopeRadius - (moon.size / 2)) {
    hasWon = true;
    winMessage.classList.add('show');
    mouseX = moon.x;
    mouseY = moon.y;
  }
}

function updateMousePos(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  mouseX = (clientX - rect.left) * scaleX;
  mouseY = (clientY - rect.top) * scaleY;
}

window.addEventListener('mousemove', (e) => {
  if (!hasWon) {
    updateMousePos(e.clientX, e.clientY);
    checkWinCondition();
  }
});

window.addEventListener('touchmove', (e) => {
  if (!hasWon) {
    updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
    checkWinCondition();
  }
});

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  
  if (objects.length > 0) {
    stars.length = 0;
    objects.length = 0;
    hasWon = false;
    winMessage.classList.remove('show');
    generateUniverse();
  }
});

loadAllAssets()
  .then(() => {
    loadingScreen.classList.add('hidden');
    generateUniverse();
    render();
  })
  .catch(err => {
    loadingScreen.innerHTML = `<h1>Error</h1><p style='color:red;'>${err}</p><p>Check your /images/ folder.</p>`;
    console.error(err);
  });