const gWidth = 1280;
const gHeight = 720;
const FPS = 30;
const YGRAVITY = 3;

var game;

function setup() {
    frameRate(FPS);
    angleMode(RADIANS);  
    createCanvas(gWidth, gHeight);

    game = new Game();
}

function draw() {
    game.update();
    game.draw();
}
