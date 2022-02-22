const Matter = require('matter-js');

const Player = require('./player')

const TerrainManager = require('./terrainManager');

const YGRAVITY = 3;
class Game {
    constructor(id) {
        this.id = id;
        this.FPS = 60;
        this.tick = 0;
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
        this.initCollisions();
        this.world.gravity.y = YGRAVITY;
        this.loop = undefined; // node-gameloop object

        // TODO: Make user choose a map
        this.terrainManager = new TerrainManager(this.world);
        this.players = {}; // map with player id as key        
    }
    
    initCollisions() {
        console.log("\x1b[35m", `- Init collisions for game: ${this.id}`, "\x1b[0m");
        Matter.Events.on(this.engine, 'collisionStart', function(event) {
            var pairs = event.pairs || [];
            pairs.forEach(({ bodyA, bodyB }) => {
                if (bodyA.label == "ground" && bodyB.label == "player"
                    || bodyA.label == "player" && bodyB.label == "ground"
                    // || bodyA.label == "player" && bodyB.label == "player"
                ) {
                    console.log('collision between player and ground')
                    // player.isSteppingGround = true;
                }
            });
       });
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
        // TODO add all info here about non static objects

        // Convert map of class instance to JSON
        const players = {};
        Object.entries(this.players).forEach(([key, value]) => players[key] = value.getData());
        return ({ players });
    }

    getMap() {
        return ({

        });
    }

    delete() {}
}

module.exports = Game;