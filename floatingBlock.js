const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

let x = 100;
let y = 100;
let radius = 50;
let speed = 10;

let downPressed = false;
let upPressed = false;
let leftPressed = false;
let rightPressed = false;

//Game Loop
function drawGame() {
    requestAnimationFrame(drawGame);
    clearScrean();
    inputs();
    boundryCheck();
    drawBlob();
}

function boundryCheck() {
    //ceiling
    if (y < radius) {
        y = radius;
    }

    //floor
    if (y > canvas.height - radius) {
        y = canvas.height - radius;
    }

    //left wall
    if (x < radius) {
        x = radius;
    }

    //right wall
    if (x > canvas.width - radius) {
        x = canvas.width - radius;
    }
}

function inputs() {
    if (upPressed) {
        y -= speed;
    }

    if (downPressed) {
        y += speed;
    }

    if (leftPressed) {
        x -= speed;
    }

    if (rightPressed) {
        x += speed;
    }
}

function drawBlob() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    //ctx.arc(x,y, radius,0, Math.PI * 2); //various options, this makes it a circle
    ctx.rect(x,y,radius,radius);
    ctx.fill();
}

function clearScrean() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.clientWidth, canvas.height);
}

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

function keyDown(event) {
    //up
    if(event.keyCode == 38) {
        upPressed = true;
    }

    //down
    if(event.keyCode == 40) {
        downPressed = true;
    }

    //left
    if(event.keyCode == 37) {
        leftPressed = true;
    }

    //right
    if(event.keyCode == 39) {
        rightPressed = true;
    }
}

function keyUp(event) {
    //up
    if(event.keyCode == 38) {
        upPressed = false;
    }

    //down
    if(event.keyCode == 40) {
        downPressed = false;
    }

    //left
    if(event.keyCode == 37) {
        leftPressed = false;
    }

    //right
    if(event.keyCode == 39) {
        rightPressed = false;
    }
}

drawGame();