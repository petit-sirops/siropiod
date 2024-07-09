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
    velocityX: 0,
    jumpPower: 15,
    grounded: false
};

const gravity = 0.5;
const platforms = [
    // Ground platforms
    { x: 0, y: 750, width: 300, height: 20 },
    { x: 350, y: 850, width: 250, height: 20 },
    { x: 650, y: 950, width: 300, height: 20 },
    { x: 1000, y: 1050, width: 300, height: 20 },
    
    // Floating platforms
    { x: 50, y: 650, width: 150, height: 20 },
    { x: 250, y: 550, width: 100, height: 20 },
    { x: 400, y: 450, width: 200, height: 20 },
    { x: 650, y: 350, width: 150, height: 20 },
    { x: 850, y: 450, width: 200, height: 20 },
    { x: 1100, y: 350, width: 150, height: 20 },
    { x: 1350, y: 250, width: 200, height: 20 },
    { x: 1600, y: 400, width: 150, height: 20 },
    { x: 1850, y: 500, width: 100, height: 20 },
    { x: 2000, y: 600, width: 200, height: 20 },
    { x: 2250, y: 550, width: 150, height: 20 },
    { x: 2450, y: 450, width: 200, height: 20 },
    { x: 2700, y: 400, width: 150, height: 20 },
    { x: 2950, y: 350, width: 200, height: 20 },
    { x: 3200, y: 300, width: 150, height: 20 },
    { x: 3400, y: 250, width: 200, height: 20 },
    { x: 3650, y: 200, width: 150, height: 20 },
    { x: 3850, y: 150, width: 200, height: 20 },
    { x: 4100, y: 100, width: 150, height: 20 },
    { x: 4300, y: 50, width: 200, height: 20 },
];
const camera = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height
};

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x - camera.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = 'green';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x - camera.x, platform.y, platform.width, platform.height);
    });
}

function checkCollisions() {
    player.grounded = false;

    platforms.forEach(platform => {
        // Check for collision from above
       if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height - player.velocityY <= platform.y) {
            player.grounded = true;
            player.velocityY = 0;
            player.y = platform.y - player.height;
        }

        // Check for collision from below
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y >= platform.y + platform.height &&
            player.y + player.velocityY <= platform.y + platform.height) {
            player.velocityY = 0;
            player.y = platform.y + platform.height;
        }

        // Check for collision from the left
        if (player.x + player.width + player.velocityX > platform.x &&
            player.x + player.velocityX < platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y) {
            player.velocityX = 0;
            player.x = platform.x - player.width;
        }

        // Check for collision from the right
        if (player.x + player.velocityX < platform.x + platform.width &&
            player.x + player.width + player.velocityX > platform.x + platform.width &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y) {
            player.velocityX = 0;
            player.x = platform.x + platform.width;
        }
    });

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.grounded = true;
        player.velocityY = 0;
    }
}

function handlePlayerMovement() {
    player.velocityX = 0;
    if (keys['ArrowRight']) {
        player.velocityX = player.speed;
    }
    if (keys['ArrowLeft']) {
        player.velocityX = -player.speed;
    }
    if (keys['Space'] && player.grounded) {
        player.velocityY = -player.jumpPower;
        player.grounded = false;
    }

    player.velocityY += gravity;

    player.x += player.velocityX;
    player.y += player.velocityY;

    checkCollisions();

    // Update camera position
    camera.x = player.x - canvas.width / 2 + player.width / 2;
    if (camera.x < 0) {
        camera.x = 0;
    }
    if (camera.x + camera.width > 4500) { // Assuming world width is 4500
        camera.x = 4500 - camera.width;
    }
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
