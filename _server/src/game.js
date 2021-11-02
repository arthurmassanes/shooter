const Matter = require('matter-js');

const Player = require('./player')

class Game {
    constructor(id) {
        this.id = id;
        this.FPS = 60;
        this.tick = 0;
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
        this.players = {}; // map with player id as key
        console.log('New game');
    }
    
    addPlayer(playerId) {
        this.players[playerId] = new Player(this.world, playerId);
    }

    update() {
        Matter.Engine.update(this.engine, 1000 / this.FPS);
        console.log('Game update', this.tick++);
    }
}

module.exports = Game;