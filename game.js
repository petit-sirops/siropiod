const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: 100,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    speed: 5,
    velocityY: 0,
    jumpPower: 15,
    grounded: false
};

const gravity = 0.5;
const platforms = [];
const platformWidth = 100;
const platformHeight = 20;
const maxPlatforms = 10;

// Create initial platforms
for (let i = 0; i < maxPlatforms; i++) {
    let platform = {
        x: Math.random() * (canvas.width - platformWidth),
        y: Math.random() * (canvas.height - platformHeight),
        width: platformWidth,
        height: platformHeight
    };
    platforms.push(platform);
}

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = 'green';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function handlePlayerMovement() {
    if (keys['ArrowRight']) {
        player.x += player.speed;
    }
    if (keys['ArrowLeft']) {
        player.x -= player.speed;
    }
    if (keys['Space'] && player.grounded) {
        player.velocityY = -player.jumpPower;
        player.grounded = false;
    }

    player.velocityY += gravity;
    player.y += player.velocityY;

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.grounded = true;
        player.velocityY = 0;
    }

    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height - player.velocityY < platform.y) {
            player.grounded = true;
            player.velocityY = 0;
            player.y = platform.y - player.height;
        }
    });
}

const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatforms();
    drawPlayer();
    handlePlayerMovement();
    requestAnimationFrame(gameLoop);
}

gameLoop();
