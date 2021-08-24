
// Terrain generator
class Terrain {
    constructor(player) {
        this.bodies = [];
        this.isLoading = true;
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
                this.bodies = this.bodies.filter(b => b.body.id != body.id);
                World.remove(world, body);
                console.log('deleted body');
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
                restitution,
                width,
                angle,
                color 
            } = obstacle;

            const options = {
                label: 'ground',
                isStatic,
            };
            const body = Bodies.rectangle(position.x, position.y, width, height, options);
            // optional parameters
            if (restitution) body.restitution = restitution;
            if (angle) body.angle = angle;

            World.add(world, body);
            this.bodies.push({ body, height, width, color });
        }
        this.isLoading = false;
    }

    draw() {
        for (const b of this.bodies) {
            const pos = b.body.position;
            const angle = b.body.angle;
            push();
            translate(pos.x, pos.y);
            rotate(angle);
            rectMode(CENTER);
            fill(b.color);
            rect(0, 0, b.width, b.height);
            pop();
        }
    }
}
