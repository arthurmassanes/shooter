const Matter = require('matter-js');

const Player = require('./player')

const TerrainManager = require('./terrainManager');

const CONTROLS = require('./controls');
const { YGRAVITY } = require('./constants/game');

class Game {
    constructor(id) {
        this.id = id;
        this.FPS = 30;
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
                if (bodyB.label == "player" && bodyA.label == "ground")
                    bodyB.isSteppingGround = true;
                else if (bodyA.label == "player" && bodyB.label == "ground")
                    bodyA.isSteppingGround = true;
            });
        });
        Matter.Events.on(this.engine, 'collisionActive', function(event) {
            var pairs = event.pairs || [];
            pairs.forEach(({ bodyA, bodyB, collision }) => {
                if (bodyA.label == "player" && bodyB.label == "player") {
                    if (bodyA.isPunching && bodyA.canPunch) {
                        bodyA.canPunch = false;
                        bodyB.health -= 10;
                    }
                    if (bodyB.isPunching && bodyB.canPunch) {
                        bodyA.health -= 10;
                        bodyB.canPunch = false;
                    }
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
        // Object.keys(this.players).map(id => console.log(this.players[id].getData()));
        Matter.Engine.update(this.engine);
    }

    handleClientInput(socketId, keyCode) {
        const player = this.players[socketId];
        // Should not happen
        if (!player) return;

        if (keyCode == CONTROLS.RIGHT) Matter.Body.applyForce(player.body, player.body.position, { x: player.speed, y: 0 });
        if (keyCode == CONTROLS.LEFT) Matter.Body.applyForce(player.body, player.body.position, { x: -player.speed, y: 0 });
        if (keyCode == CONTROLS.UP) player.jump();
        if (keyCode == CONTROLS.PUNCH) player.punch();
        player.limitMaxSpeed();
    }

    setLoop(loop) {
        this.loop = loop;
    }

    getSnapshot() {
        // TODO add all info here about non static objects (EX: bullets, moving obstacles)
        // TODO dont send data if no movement was processed

        // Convert map of class instance to JSON
        const players = {};
        Object.entries(this.players).forEach(([key, value]) => players[key] = value.getData());
        return ({ players });
    }

    getMap() {
        return this.terrainManager.getMap();
    }

    delete() {
        this.terrainManager.removeObstacles();
        Matter.World.clear(this.world);
        Matter.Engine.clear(this.engine);
    }
}

module.exports = Game;