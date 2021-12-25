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
        this.loop = undefined; // node-gameloop object

        this.map = undefined;
        this.players = {}; // map with player id as key        
    }
    
    addPlayer(playerId) {
        this.players[playerId] = new Player(this.world, playerId);
    }

    removePlayer(playerId) {
        const p = this.players[playerId];
        if (p) {
            p.delete(this.world);
            delete this.players[playerId];
        }
    }

    print() {
        console.log(`Game room with id: ${this.id}, with players:`);
        Object.keys(this.players).map(id => {
            const p = this.players[id];
            console.log('Player: ' + p.id);
        });
    }

    update(delta) {
        // Object.keys(this.players).map(k => console.log('player' +k, this.players[k].body));
        Matter.Engine.update(this.engine, delta);
    }

    setLoop(loop) {
        this.loop = loop
    }

    getSnapshot() {
        const objectsArray = Object.keys(this.players).map((key) => {
            const player = this.players[key];
            return player.getData();
        });
        return objectsArray;
    }

    getMap() {
        return this.map
    }

    delete() {}
}

module.exports = Game;