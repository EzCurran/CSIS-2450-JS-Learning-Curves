console.log('Snake has started');
const canvas = document.getElementById('gameArea');
const ctx = canvas.getContext('2d');
const snakeParts = [];

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7; //changes the refresh rate of the screen
let tileCount = 20;
let tileSize = canvas.width / tileCount;
let tileDrawSize = canvas.width / tileCount - 2;
let textSize = tileSize / 2;
let headX = 10;
let headY = 10;
let foodX = 5;
let foodY = 5;
let xDir = 0;
let yDir = 0;
let score = 2;

//const nameofsound = new Audio("someaudio.mp3"); //put someaudio.mp3 in the same directory as this file

function drawGame(){
    snakeMovement();
    let result = isGameOver();
    if(result)
        return;
    clearScreen();
    drawSnake();
    
    
    checkFoodCollision();
    drawFood();
    drawScore();

    setTimeout(drawGame, 1000/ speed - 2 + score); //the higher the speed the faster refresh rate
    
    console.log("TileSize: " + tileSize);
}

function snakeMovement(){
    headX += xDir;
    headY += yDir;
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.clientWidth,canvas.height);
}

function drawSnake(){
    ctx.fillStyle = 'cyan';
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileSize, part.y * tileSize, tileDrawSize, tileDrawSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > score){
        snakeParts.shift();
    }

    ctx.fillStyle = 'blue';
    ctx.fillRect(headX * tileSize, headY * tileSize, tileDrawSize, tileDrawSize);
}

function drawFood(){
    ctx.fillStyle = "red";
    ctx.fillRect(foodX * tileSize, foodY * tileSize, tileDrawSize, tileDrawSize);
}

function drawScore(){
    ctx.fillStyle='white';
    ctx.font = textSize + "px Verdana"
    ctx.fillText("Score " + score, canvas.width-(6 * textSize), textSize)
}

function checkFoodCollision(){
    if(foodX == headX && foodY == headY) {
        foodX = Math.floor(Math.random() * tileCount)
        foodY = Math.floor(Math.random() * tileCount)
        score++;
    }
}

function isGameOver(){
    let gameOver = false;

    if(xDir === 0 && yDir === 0) {
        return false;
    }

    if(headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount){
        gameOver = true;
    } else {
        for(let i = 0; i < snakeParts.length; i++){
            let snakePart = snakeParts[i];
            if(headX === snakePart.x && headY === snakePart.y){
                gameOver = true;
                break;
            }
        }
    }

    if(gameOver) {
        ctx.fillStyle = "white";
        ctx.font = 5*textSize+"px Verdana";

        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver;
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
    if(event.keyCode == 38) { // Up
        if(yDir == 1)
            return 1;
        xDir = 0;
        yDir = -1;
    } else if(event.keyCode == 40) { // Down
        if(yDir == -1)
            return 1;
        xDir = 0;
        yDir = 1;
    } else if(event.keyCode == 37) { // Left
        if(xDir == 1)
            return 1;
        xDir = -1;
        yDir = 0;
    } else if(event.keyCode == 39) { // Right
        if(xDir == -1)
            return 1;
        xDir = 1;
        yDir = 0;
    }
}

drawGame();