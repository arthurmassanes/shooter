const Matter = require('matter-js');

const Player = require('./player')

const YGRAVITY = 3;
class Game {
    constructor(id) {
        this.id = id;
        this.FPS = 60;
        this.tick = 0;
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
        this.world.gravity.y = YGRAVITY;
        this.players = {}; // map with player id as key
        console.log('New game');
    }
    
    addPlayer(playerId) {
        this.players[playerId] = new Player(this.world, playerId);
    }

    update() {
        // Object.keys(this.players).map(k => console.log('player' +k, this.players[k].body));
        Matter.Engine.update(this.engine, 1000 / this.FPS);
        console.log('Game update', this.tick++);
    }

    delete() {}
}

module.exports = Game;