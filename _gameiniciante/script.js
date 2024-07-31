const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileSize = canvas.width / gridSize;
let snake = [{x: 10, y: 10}];
let direction = {x: 0, y: 0};
let food = {x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize)};
let score = 0;
let playing = true;

function gameLoop() {
    if (playing) {
        moveSnake();
        if (checkCollision()) {
            resetGame();
        }
        if (checkFoodCollision()) {
            score++;
            growSnake();
            placeFood();
        }
        clearCanvas();
        drawSnake();
        drawFood();
        aiMove();  // Move a cobra com a IA
    }
}

function moveSnake() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(head);
    snake.pop();
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function checkFoodCollision() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function growSnake() {
    const tail = snake[snake.length - 1];
    snake.push(tail);
}

function placeFood() {
    food = {x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize)};
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function resetGame() {
    snake = [{x: 10, y: 10}];
    direction = {x: 0, y: 0};
    score = 0;
    placeFood();
    playing = false;
    alert('Game Over! Press OK to restart.');
    playing = true;
}

function aiMove() {
    const head = snake[0];

    if (head.x < food.x && direction.x !== -1) {
        direction = {x: 1, y: 0};
    } else if (head.x > food.x && direction.x !== 1) {
        direction = {x: -1, y: 0};
    } else if (head.y < food.y && direction.y !== -1) {
        direction = {x: 0, y: 1};
    } else if (head.y > food.y && direction.y !== 1) {
        direction = {x: 0, y: -1};
    }
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = {x: 0, y: 1};
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = {x: 1, y: 0};
            break;
    }
});

setInterval(gameLoop, 100);