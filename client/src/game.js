// module aliases
var engine, world;
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;
  
const playerRefreshInterval = 1000 / 20; // 20 time every 1000 milliseconds
class Game {
    setup() {
        // physics engine
        engine = Engine.create();
        world = engine.world;
        world.gravity.y = YGRAVITY;
          
        this.player = new Player();
        this.terrain = new Terrain(this.player);
        this.otherPlayers = {} // map of OtherPlayers, using id as key

        this.setupSocket();
    }

    setupSocket() {
        socket.on("map", (terrainData) => this.terrain.generateObstacles(terrainData));
        socket.emit("map"); // request map info
        socket.on("players", (data) => this.updatePlayerPositions(data));
        socket.on("deletePlayer", (data) => this.deletePlayer(data));
        
        setInterval(() => this.player.heartbeat(), playerRefreshInterval);
    }

    update() {
        Engine.update(engine);
        this.player.update();
    }

    updatePlayerPositions(data) {
        const otherPlayersMap = data;
        delete otherPlayersMap[socket.id]; // dont keep own data
        Object.keys(otherPlayersMap).map((playerId) => {
            // server data
            const playerData = otherPlayersMap[playerId];
            const {
                position,
                velocity,
                health,
                animationState,
                isFacingLeft,
            } = playerData;
            // local object
            const otherPlayer = this.otherPlayers[playerId];
            if (otherPlayer && playerData) {
                otherPlayer.update(position, velocity, health, isFacingLeft, animationState);
            } else {
                const newPlayer = new OtherPlayer(playerId, position, velocity, health);
                this.otherPlayers[playerId] = newPlayer;
            }
        });
    }

    deletePlayer(data) {
        const { id } = data;

        const otherPlayer = this.otherPlayers[id];

        if (otherPlayer) otherPlayer.delete();
        delete this.otherPlayers[id];

    }

    drawOtherPlayers() {
        Object.keys(this.otherPlayers).map((k) => this.otherPlayers[k].draw());
    }

    draw() {

        this.update();

        background(41);
        this.terrain.draw();
        this.player.draw();
        this.drawOtherPlayers();

        noStroke();
        textSize(24);
        fill("white");
        if (this.terrain.isLoading) {
            text(`Loading obstacles...`, 20, 50);
            world.gravity.y = 0;
        } else {
            world.gravity.y = YGRAVITY;
            stroke(50);
            strokeWeight(3);
            text(`connected players: ${Object.keys(this.otherPlayers).length + 1}`, 20, 20);
            text(`Map: ${this.terrain.mapLabel}`, 20, 50);
            text(`FPS: ${floor(frameRate())}`, 20, 80);
        }
    }
}