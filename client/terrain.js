
// Terrain generator
class Terrain {
    constructor(player) {
        this.bodies = [];
        this.mapLabel = ""; // Every map has a label but its more for debug
        this.isLoading = true;
        // setup collisions between ground and player for jump authorization
        Matter.Events.on(engine, 'collisionStart', function(event) {
            var pairs = event.pairs;
            if (pairs[0]) {
                const { bodyA, bodyB } = pairs[0];
                if (bodyA.label == "ground" && bodyB.label == "player"
                    || bodyA.label == "player" && bodyB.label == "ground"
                    // || bodyA.label == "player" && bodyB.label == "player"
                ) {
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
            }
        });
    }

    generateObstacles(serverData) {
        this.removeObstacles();
        this.mapLabel = serverData.label;
        for (const obstacle of serverData.obstacles) {
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
                density: 0.5,
            };
            const body = Bodies.rectangle(position.x, position.y, width, height, options);
            // optional parameters
            if (angle) Body.setAngle(body, angle);
            if (restitution) body.restitution = restitution;

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
            rectMode(CENTER);
            rotate(angle);
            fill(b.color);
            rect(0, 0, b.width, b.height);
            pop();
        }
        text(`Map: ${this.mapLabel}`, 20, 50);
    }
}
