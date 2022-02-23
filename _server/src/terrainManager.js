const Maps = require('../maps/maps');
const Obstacle = require('./obstacle');

class TerrainManager {
    constructor(world, mapData = Maps.random()) {
        const { label, filepath, obstacles } = mapData;
        console.log('New map ' + label);
        this.label = label;
        this.backgroundImage = filepath;
        this.obstacles = [];
        this.isLoading = true;
        this.generateObstacles(obstacles, world);
    }

    // deletes game objects (useful to rebuild the map)
    removeObstacles() {
        this.obstacles.map(o => o.remove());
        this.obstacles = [];
    }

    generateObstacles(obstacles, world) {
        this.removeObstacles();
        for (const obstacle of obstacles) {
            const {
                filepath,
                position,
                isStatic,
                restitution,
                angle,
            } = obstacle;
            
            this.obstacles.push(new Obstacle({ world, filepath, position, isStatic, restitution, angle }));
        }
        this.isLoading = false;
    }

    getMap() {
        return ({
            obstacles: this.obstacles.map(o => o.getData()),
            label: this.label,
            filepath: this.backgroundImage,
        });
    }
}

module.exports = TerrainManager;