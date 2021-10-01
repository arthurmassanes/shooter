const gWidth = 1280;
const gHeight = 720;
const FPS = 30;
const YGRAVITY = 3;

const url = "https://a-shooter.herokuapp.com/"
// const url = "http://localhost:3000";
var socket = io(url);

var mgr;

function setup() {
    frameRate(FPS);
    angleMode(RADIANS);  
    const canvas = createCanvas(gWidth, gHeight);
    canvas.parent('p5-canvas');

    // check if joining game
    let params = getURLParams();
    mgr = new SceneManager();
    if (params.room) {
        console.log('joining', params.room);
        socket.emit("joinRoom", params.room);
        mgr.showScene(Game)
    } else mgr.showScene(Menu);
}

function mousePressed() {
}

function draw() {
    mgr.draw();
}
