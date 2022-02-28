const gWidth = 1280;
const gHeight = 720;
const FPS = 30;
const YGRAVITY = 3;

// const url = "https://a-shooter.herokuapp.com/"
const url = "http://localhost:3000";
var socket = io(url);

var mgr;

function setup() {
    frameRate(FPS);
    angleMode(RADIANS);
    const canvas = createCanvas(gWidth, gHeight);
    canvas.parent('p5-canvas');
    mgr = new SceneManager();
    mgr.wire();

    // check if joining game
    const params = getURLParams();
    if (params.room) {
        socket.on("newGame", () => mgr.showScene(Game));
        socket.emit("joinRoom", params.room);
    } else mgr.showScene(Menu);
}

function draw() {
    mgr.draw();
}
