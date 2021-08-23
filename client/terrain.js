// Terrain generator
class Terrain {
    constructor(player) {
        this.bodies = [];
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

    // deletes game objects (useful to rebuild the map)
    removeObstacles() {
        const worldBodies = [...world.bodies]
        worldBodies.map((body) => {
            if (body.label == "ground") {
                this.bodies = this.bodies.filter(b => b.id != body.id);
                World.remove(world, body);
            }
        });
    }

    generateObstacles(serverData) {
        this.removeObstacles();
        for (const obstacle of serverData) {
            const {
                position,
                isStatic,
                height,
                width,
                color 
            } = obstacle;

            const options = {
                label: 'ground',
                isStatic,
            };
            const body = Bodies.rectangle(position.x, position.y, width, height, options);
            World.add(world, body);
            this.bodies.push({ ...body, height, width, color });
        }
    }

    draw() {
        push();
        rectMode(CENTER);
        for (const b of this.bodies) {
            fill(b.color);
            rect(b.position.x, b.position.y, b.width, b.height);
        }
        pop();
    }
}
