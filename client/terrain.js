// Terrain generator
class Terrain {
    constructor(player) {
        this.bodies = [];
        this.ground = new Ground();
        this.generateObstacles();
        // setup collisions between ground and player for jump authorization
        Matter.Events.on(engine, 'collisionStart', function(event) {
            var pairs = event.pairs;
            if (pairs[0]) {
                const { bodyA, bodyB } = pairs[0];
                if (bodyA.label == "ground" && bodyB.label == "player"
                    || bodyA.label == "player" && bodyB.label == "ground") {
                    player.isSteppingGround = true;
                }
            }
       });      
    }

    generateObstacles() {
        const options = {
            isStatic: true,
            label: 'ground',
            // friction: 0
        };

        for (let i = 0; i < 10; i++) {
            const height = 30;
            const width = gWidth / 3;
            const x = random(0, gWidth);
            const y = random(gHeight / 2, gHeight);
            const bodyColor = random(200, 255);
            const body = Bodies.rectangle(x, y, width, height, options);
            World.add(world, body);
            this.bodies.push({ ...body, height, width, bodyColor });
        }
    }

    draw() {
        this.ground.draw();

        push();
        rectMode(CENTER);
        for (const body of this.bodies) {
            fill(body.bodyColor);
            rect(body.position.x, body.position.y, body.width, body.height);
        }
        pop();
    }
}
