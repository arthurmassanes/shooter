const gWidth = 1280;
const gHeight = 720;
const FPS = 30;
const YGRAVITY = 3;

var mgr;

function setup() {
    frameRate(FPS);
    angleMode(RADIANS);  
    createCanvas(gWidth, gHeight);

    mgr = new SceneManager();
    mgr.showScene(Menu);
}

function mousePressed() {
}

function draw() {
    mgr.draw();
}
