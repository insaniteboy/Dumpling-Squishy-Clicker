// ==========================================
// OPTIMIZED 3D ROSE GARDEN BACKGROUND
// ==========================================

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.prepend(canvas);

Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '0',
    pointerEvents: 'none'
});

const rightPanel = document.querySelector('.right-panel');
if (rightPanel) rightPanel.style.zIndex = '10';

const statsHeader = document.querySelector('.stats-header');
if (statsHeader) statsHeader.style.zIndex = '10';

document.body.style.background = 'radial-gradient(circle at 50% 50%, #ff758c 0%, #ff7eb3 40%, #7b1fa2 100%)';

let width, height;

// Create an offscreen canvas to cache the static roses
const staticCanvas = document.createElement('canvas');
const staticCtx = staticCanvas.getContext('2d');

function resize() {
    width = canvas.width = staticCanvas.width = window.innerWidth;
    height = canvas.height = staticCanvas.height = window.innerHeight;
    initElements();
}
window.addEventListener('resize', resize);

function drawRose(context, x, y, radius, primaryColor, secondaryColor) {
    context.save();
    context.translate(x, y);

    for (let i = 0; i < 7; i++) {
        const angle = (i * Math.PI * 2) / 7;
        context.beginPath();
        context.fillStyle = primaryColor;
        context.arc(Math.cos(angle) * (radius * 0.4), Math.sin(angle) * (radius * 0.4), radius * 0.55, 0, Math.PI * 2);
        context.fill();
    }

    for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5 + 0.3;
        context.beginPath();
        context.fillStyle = secondaryColor;
        context.arc(Math.cos(angle) * (radius * 0.25), Math.sin(angle) * (radius * 0.25), radius * 0.4, 0, Math.PI * 2);
        context.fill();
    }

    context.beginPath();
    context.fillStyle = '#fff0f3';
    context.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
    context.fill();
    context.restore();
}

let petals = [];
class Petal {
    constructor() { this.reset(true); }
    reset(randomY = false) {
        this.x = Math.random() * width;
        this.y = randomY ? Math.random() * height : -30;
        this.z = Math.random() * 100; 
        this.size = (100 - this.z) / 3 + 12; 
        this.speedY = (100 - this.z) / 45 + 0.8;
        this.speedX = Math.sin(Math.random() * Math.PI) * 1.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.03;
        this.opacity = (100 - this.z) / 100 * 0.8 + 0.2;
    }
    update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y / 30) * 0.8 + this.speedX;
        this.rotation += this.rotSpeed;
        if (this.y > height + 40) this.reset(false);
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.fillStyle = '#ff1744';
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size, -this.size / 2, -this.size / 2, -this.size * 1.5, 0, -this.size * 1.8);
        ctx.bezierCurveTo(this.size / 2, -this.size * 1.5, this.size, -this.size / 2, 0, 0);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = '#ff80ab';
        ctx.arc(0, -this.size * 0.8, this.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

let sparkles = [];
class Sparkle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.alpha = Math.random();
        this.speed = Math.random() * 0.02 + 0.005;
    }
    update() {
        this.alpha += this.speed;
        if (this.alpha > 1 || this.alpha < 0) this.speed = -this.speed;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function initElements() {
    petals = [];
    sparkles = [];
    
    // Clear the offscreen canvas before drawing
    staticCtx.clearRect(0, 0, width, height);

    const roseColors = [
        { p: '#d50000', s: '#ff1744' },
        { p: '#c2185b', s: '#e91e63' },
        { p: '#880e4f', s: '#ad1457' }
    ];

    // Draw roses ONCE to the offscreen canvas
    for (let i = 0; i < 12; i++) {
        const col = roseColors[i % roseColors.length];
        drawRose(staticCtx, Math.random() * 180 - 40, (height / 10) * i + (Math.random() * 40 - 20), Math.random() * 35 + 40, col.p, col.s);
    }
    for (let i = 0; i < 8; i++) {
        const col = roseColors[i % roseColors.length];
        drawRose(staticCtx, Math.random() * (width * 0.6), Math.random() * 120 - 40, Math.random() * 30 + 35, col.p, col.s);
        drawRose(staticCtx, Math.random() * (width * 0.6), height - (Math.random() * 100 - 30), Math.random() * 30 + 35, col.p, col.s);
    }

    // Lowered particle count for better performance
    for (let i = 0; i < 20; i++) petals.push(new Petal());
    for (let i = 0; i < 20; i++) sparkles.push(new Sparkle());
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw the cached static background image 
    ctx.drawImage(staticCanvas, 0, 0);

    // Only update and draw the moving particles
    sparkles.forEach(sparkle => {
        sparkle.update();
        sparkle.draw();
    });

    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });

    requestAnimationFrame(animate);
}

resize();
animate();