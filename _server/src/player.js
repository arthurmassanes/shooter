const Matter = require('matter-js');
const PLAYER_HEIGHT = 96;
const matterPlayerOptions = {
    inertia: Infinity, // so it dont rotate
    label: 'player',
    frictionAir: 0.05,
    friction: 0.5,
    density: 0.002
};

class Player {
    constructor(world, id, pos = { x: 200, y:  0 }) {
        this.id = id;
        this.health = 100;
        this.height = PLAYER_HEIGHT;
        this.width = PLAYER_HEIGHT;
        this.body = Matter.Bodies.rectangle(pos.x, pos.y, this.width, this.height, matterPlayerOptions);
        Matter.World.add(world, this.body);
        console.log('Created player');
    }
}

module.exports = Player;