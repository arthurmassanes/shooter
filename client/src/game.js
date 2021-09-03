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
        this.otherPlayers = {} // map with id as key
        this.otherPlayersBodies = {} // same but containing matterjs objects

        // Socket:
        // create obstacles based on current map
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
        this.otherPlayers = data;
        delete this.otherPlayers[socket.id]; // dont keep own data
        Object.keys(this.otherPlayers).map((playerId) => {
            const playerData = this.otherPlayers[playerId];
            const { position, velocity } = playerData;
            if (this.otherPlayersBodies[playerId]) {
                const body = this.otherPlayersBodies[playerId];
                Body.setPosition(body, position);
                Body.setVelocity(body, velocity);
            } else {
                const options = { ...this.player.options, label: 'player ' + playerId }
                const body = Bodies.rectangle(position.x, position.y, this.player.width, this.player.height, options);
                this.otherPlayersBodies[playerId] = body;
                World.add(world, body);
            }
        });
    }

    deletePlayer(data) {
        const { id } = data;

        delete this.otherPlayers[id];

        const playerBody = this.otherPlayersBodies[id];
        if (playerBody) Matter.Composite.remove(world, playerBody)
    }

    drawOtherPlayers() {
        Object.keys(this.otherPlayersBodies).map((playerId) => {
            const player = this.otherPlayers[playerId];
            if (player) {
                const pos = player.position;
                fill(player.color);
                rectMode(CENTER);
                rect(pos.x, pos.y, this.player.width, this.player.height);
            }
        });
    }

    draw() {

        this.update();

        background(51);
        this.player.draw();
        this.terrain.draw();
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