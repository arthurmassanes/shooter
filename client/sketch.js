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
const YGRAVITY = 3;

var game;

function setup() {
    frameRate(FPS);
    angleMode(RADIANS);  
    createCanvas(gWidth, gHeight);

    // physics engine
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = YGRAVITY;

    game = new Game();
    noStroke();
}

function draw() {
    Engine.update(engine);
    game.update();

    background(51);
    game.draw();
}
