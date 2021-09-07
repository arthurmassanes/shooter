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
        this.terrain = new Terrain(this.player); // passes player to check jump
        this.otherPlayers = [] // array of OtherPlayer s

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
            // local object
            const otherPlayer = this.otherPlayers.find((p) => p.id === playerId);
            // server data
            const playerData = otherPlayersMap[playerId];
            const { position, velocity, color } = playerData;
            if (otherPlayer) {
                otherPlayer.update(position, velocity);
            } else {
                const newPlayer = new OtherPlayer(playerId, position, velocity, color);
                this.otherPlayers.push(newPlayer);
            }
        });
    }

    deletePlayer(data) {
        const { id } = data;

        const otherPlayer = this.otherPlayers.find((p) => p.id === id)

        if (otherPlayer) otherPlayer.delete();
        this.otherPlayers = this.otherPlayers.filter((p) => p.id !== id)

    }

    drawOtherPlayers() {
        this.otherPlayers.map((p) => p.draw());
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
        text(`connected players: ${Object.keys(this.otherPlayers).length + 1}`, 20, 20);
        if (this.terrain.isLoading) {
            text(`Loading obstacles...`, 20, 50);
            world.gravity.y = 0;
        } else world.gravity.y = YGRAVITY;
    }
}