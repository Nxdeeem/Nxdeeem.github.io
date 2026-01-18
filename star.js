const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

const stars = [];
const numStars = 150;
const maxVelocity = 0.05;
const maxRadius = 2.5;

// Mouse interaction
const mouse = { x: w / 2, y: h / 2 };

// Shooting stars
const shootingStars = [];
const shootingStarFrequency = 0.002; // chance per frame

// Generate stars
for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * maxRadius,
    vx: (Math.random() - 0.5) * maxVelocity,
    vy: (Math.random() - 0.5) * maxVelocity
  });
}

// Event listener for mouse movement
window.addEventListener("mousemove", function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Window resize
window.addEventListener("resize", function(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

// Draw line between stars if close
function connectStars() {
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      let dx = stars[i].x - stars[j].x;
      let dy = stars[i].y - stars[j].y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.strokeStyle = 'rgba(255,255,255,' + (1 - dist/120) + ')';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }
  }
}

// Draw shooting stars
function createShootingStar() {
  shootingStars.push({
    x: Math.random() * w,
    y: Math.random() * h/2,
    length: Math.random() * 100 + 50,
    speed: Math.random() * 10 + 6,
    angle: Math.random() * Math.PI/3 + Math.PI/4
  });
}

// Animate shooting stars
function drawShootingStars() {
  for (let i = 0; i < shootingStars.length; i++) {
    const s = shootingStars[i];
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - Math.cos(s.angle) * s.length, s.y - Math.sin(s.angle) * s.length);
    ctx.stroke();

    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;

    if (s.x > w || s.y > h) shootingStars.splice(i, 1);
  }
}

// Animate stars
function animate() {
  ctx.clearRect(0,0,w,h);

  // Draw stars
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];

    // Parallax effect based on mouse
    const dx = (mouse.x - w/2) * 0.0005;
    const dy = (mouse.y - h/2) * 0.0005;

    s.x += s.vx + dx;
    s.y += s.vy + dy;

    if (s.x < 0) s.x = w;
    if (s.x > w) s.x = 0;
    if (s.y < 0) s.y = h;
    if (s.y > h) s.y = 0;

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI*2);
    ctx.fill();
  }

  // Connect nearby stars
  connectStars();

  // Shooting stars
  if (Math.random() < shootingStarFrequency) {
    createShootingStar();
  }
  drawShootingStars();

  requestAnimationFrame(animate);
}

animate();
