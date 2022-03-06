const { Bodies, World } = require('matter-js');

const Maps = require('../maps/maps');
const Obstacle = require('./obstacle');

const { HEIGHT, WIDTH } = require('./constants/game');

class TerrainManager {
    constructor(world, mapData = Maps.random()) {
        const { label, filepath, obstacles } = mapData;
        console.log('New map ' + label);
        this.label = label;
        this.world = world;
        this.backgroundImage = filepath;
        this.obstacles = [];
        this.boundaries = []; // left and right walls
        this.isLoading = true;
        this.generateObstacles(obstacles, world);
        this.generateBoundaries(world);
    }

    
    generateBoundaries(world) {
        const obstacleWidth = 100;
        const options = { label: 'ground', isStatic: true };
        const leftWall = Bodies.rectangle(0 - obstacleWidth / 2, HEIGHT / 2, obstacleWidth, HEIGHT, options);
        const rightWall = Bodies.rectangle(WIDTH + obstacleWidth / 2, HEIGHT / 2, obstacleWidth, HEIGHT, options);
        World.add(world, leftWall);
        World.add(world, rightWall);
        this.boundaries.push(leftWall, rightWall);
    }

    // deletes game objects (useful to rebuild the map)
    removeObstacles() {
        this.obstacles.map(o => o.remove());
        this.boundaries.map(b => World.remove(this.world, b));
        this.obstacles = [];
        this.boundaries = [];
    }

    generateObstacles(obstacles, world) {
        this.removeObstacles();
        for (const obstacle of obstacles) {
            const {
                width, height, position,
                filepath,
                isStatic,
                restitution,
                angle,
            } = obstacle;

            this.obstacles.push(new Obstacle({ world, filepath, width, height, position, isStatic, restitution, angle }));
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