const gWidth = 1280;
const gHeight = 720;
const FPS = 30;
const YGRAVITY = 3;

var game;
var mgr;

function setup() {
    frameRate(FPS);
    angleMode(RADIANS);  
    createCanvas(gWidth, gHeight);

    mgr = new SceneManager();
    // mgr.addScene(Menu);
    mgr.addScene(Game);
    mgr.showScene(Game);
}

function mousePressed() {
    console.log("mousePressed");
}

function draw() {
    mgr.draw();
}
