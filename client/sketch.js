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
var ground;

function setup() {
    frameRate(FPS);
    angleMode(RADIANS);  
    createCanvas(gWidth, gHeight);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground();
    player = new Player();
    world.gravity.y = 2;
    Matter.Events.on(engine, 'collisionStart', function(event) {
      console.log(event.pairs)
      var pairs = event.pairs;
      if (pairs.length) console.log("colision betwen " + pairs[0].bodyA.label + " - " + pairs[0].bodyB.label);
 }); 
}

function draw() {
    Engine.update(engine);
    background(51);
    player.update();
    player.draw();
    ground.draw();
}
