
// Terrain generator
class Terrain {
    constructor(player) {
        this.backgroundImage = undefined;
        this.obstacles = [];
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
        this.backgroundImage = undefined;
        this.obstacles.map(o => o.remove());
    }

    generateObstacles(serverData) {
        this.removeObstacles();
        this.mapLabel = serverData.label;
        const filepath = serverData.filepath; // the background
        if (filepath) {
            this.backgroundImage = loadImage(filepath);
        }
        for (const obstacle of serverData.obstacles) {
            const {
                filepath,
                position,
                isStatic,
                restitution,
                angle,
            } = obstacle;
            
            this.obstacles.push(new Obstacle(filepath, position, isStatic, restitution, angle));
        }
        this.isLoading = false;
    }
    
    draw() {
        push();
        // draw bg
        if (this.backgroundImage) image(this.backgroundImage, 0, 0);
        // then draw platforms
        this.obstacles.map(o => o.draw());
        pop();
    }
}
