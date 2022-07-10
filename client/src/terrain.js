
// Terrain generator
class Terrain {
    constructor() {
        this.backgroundImage = undefined;
        this.obstacles = [];
        this.mapLabel = ""; // Every map has a label but its more for debug
        this.isLoading = true;
    }

    // deletes game objects (useful to rebuild the map)
    removeObstacles() {
        this.backgroundImage = undefined;
        this.obstacles.map(o => o.remove());
        this.obstacles = [];
    }

    generateObstacles(serverData) {
        // if empty object do nothing
        if (!Object.entries(serverData).length) return;

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
            
            this.obstacles.push(new Obstacle({ filepath, position, isStatic, restitution, angle }));
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
