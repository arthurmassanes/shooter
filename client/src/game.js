// module aliases
var engine, world;
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

class Game {
    setup() {
        // physics engine
        engine = Engine.create();
        world = engine.world;
        world.gravity.y = YGRAVITY;

        this.connectionError = false;
        this.player = new Player();
        this.terrain = new Terrain(this.player);
        this.otherPlayers = {} // map of OtherPlayers, using id as key
        console.log(this.terrain.obstacles.length, world.gravity);

        this.setupSocket();
    }

    setupSocket() {
        this.player.id = socket.id;
        socket.on("map", (terrainData) => this.terrain.generateObstacles(terrainData));
        socket.on("connect_failure", () => this.connectionError = true);
        socket.emit("map"); // request map info from serv
        socket.on("snapshot", (data) => this.updateGameObjects(data));
        socket.on("deletePlayer", (data) => this.deletePlayer(data));

        // setInterval(() => this.player.heartbeat(), playerRefreshInterval);
    }

    update() {
        Engine.update(engine);
        // this.player.update();
    }

    updateGameObjects(data) {
        console.log('snapshot received', data)
        const { players } = data;
        this.updatePlayers(players);
    }

    updatePlayers(players) {
        Object.keys(players).forEach(key => {
            // server data
            const {
                id,
                position,
                velocity,
                health,
                animationState,
                isFacingLeft,
            } = players[key];
            // local object
            const otherPlayer = this.otherPlayers[id];
            if (id === this.player.id) {
                this.player.updateFromServer({ position, velocity, health, animationState });
            } else if (otherPlayer) {
                otherPlayer.update(position, velocity, health, isFacingLeft, animationState);
            } else {
                const newPlayer = new OtherPlayer(id, position, velocity, health);
                this.otherPlayers[id] = newPlayer;
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

    drawHUD() {
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
        text(`Socket id: ${this.player.id}`, 20, 110);
        if (this.connectionError) {
            stroke("red");
            strokeWeight(5);
            text("Connection problems...");
        }
    }

    draw() {

        this.update();

        background(41);
        this.terrain.draw();
        this.player.draw();
        this.drawOtherPlayers();

    }
}
