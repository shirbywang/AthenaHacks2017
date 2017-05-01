var myGamePiece;
var myObstacles = [];
var myPlatform;
var startInterval;
var intervalCount;
var jumping = false;
var ducking = false;
var jumpHeight = 50;
var duckHeight = 30;
var startY = 310;
var startHeight = 60;
var sentiment;

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        div = document.getElementById("game");
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        div.appendChild(this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, startInterval);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}


function startGame() {
    myGamePiece = new component(30, 60, "red", 10, 310);
    myObstacle = new component(10, 200, "green", 300, 100);
    myPlatform = new component(600, 25, "yellow", 0, 375);
    startInterval = 10;
    intervalCount = 0; // after every 5 intervalCount, decrease interval
    characterMinY = 310;
    characterMaxY = 350;
    myGameArea.start();


}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () { //calling update recreates game piece
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        if (ducking && this.height == startHeight) {
            this.height -= duckHeight;
            this.y += duckHeight;

        } else if (!ducking && this.height != startHeight && !jumping) {
            this.height += duckHeight;
            this.y -= duckHeight;

        } else if (jumping && this.y == startY) {
            this.y -= jumpHeight;
        } else if (!jumping && this.y != startY && !ducking) {
            this.y += jumpHeight;
        }
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}



function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}


function updateGameArea() {
    var x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(500)) {
        x = myGameArea.canvas.width;
     
        whichObstacle = Math.random();
        //Randomly determine which obstacle pops up
        if (whichObstacle > 0.5) { //Happiness
            myObstacles.push(new component(30, 60, "green", x, 350));
        } else { //Sadness
            myObstacles.push(new component(30, 30, "blue", x, 300));
        }
        
    }
    if (myGameArea.frameNo == 1 || everyinterval(50)){
        sentiment = takeAndAnalyzePicture();
        
        if (sentiment > 0){
            jump();
        }
        else if (sentiment < 0){
            duck();
        }
        
    }
    
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myGamePiece.newPos();
    myPlatform.update();
    myGamePiece.update();
}

function moveup() {
    myGamePiece.speedY -= 1;
}

function movedown() {
    myGamePiece.speedY += 1;
}

function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

function jump() {
    if (!jumping) {
        jumping = true;
        setTimeout(land, 1700); // calls land function after 500 ms
    }
}

function land() {
    jumping = false;
}

function duck() {
    if (!ducking) {
        ducking = true;
        setTimeout(stand, 2000)
    }
}

function stand() {
    ducking = false;
}

function refreshGame() {
    window.location.reload(true);
}
