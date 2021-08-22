// module aliases
var engine, world;
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

const gWidth = 1280;
const gHeight = 720;
const FPS = 30;

var player;
var terrain;

function setup() {
    frameRate(FPS);
    angleMode(RADIANS);  
    createCanvas(gWidth, gHeight);
    engine = Engine.create();
    world = engine.world;
    player = new Player();
    terrain = new Terrain(this.player); // passes player to check jump
    world.gravity.y = 3;
}

function draw() {
    Engine.update(engine);
    background(51);
    player.update();
    player.draw();
    terrain.draw();
}
