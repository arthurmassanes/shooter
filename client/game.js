class Game {
    constructor() {
        this.playerRefreshInterval = 1000 / 5; // five time every 1000 milliseconds
        this.player = new Player();
        this.terrain = new Terrain(this.player); // passes player to check jump
        this.otherPlayers = {} // map with id as key

        // create obstacles based on current map
        socket.on("map", (terrainData) => this.terrain.generateObstacles(terrainData));
        socket.on("players", (data) => this.updatePlayerPositions(data));

        setInterval(() => this.player.heartbeat(), this.playerRefreshInterval);
    }

    update() {
        this.player.update();
    }

    updatePlayerPositions(data) {
        this.otherPlayers = data;
        delete this.otherPlayers[socket.id]; // dont keep own data
    }

    drawOtherPlayers() {
        Object.keys(this.otherPlayers).map((playerId) => {
            const player = this.otherPlayers[playerId];
            const pos = player.position;
            fill("red");
            rectMode(CENTER);
            rect(pos.x, pos.y, this.player.width, this.player.height);
        });
    }

    draw() {
        this.player.draw();
        this.terrain.draw();
        this.drawOtherPlayers();

        textSize(24);
        fill("white");
        text(`connected players: ${Object.keys(this.otherPlayers).length + 1}`, 20, 20);
        text(`sleeping: ${!this.player.isMoving()}`, 20, 200);
        if (this.terrain.isLoading) {
            text(`Loading obstacles...`, 20, 50);
            world.gravity.y = 0;
        } else world.gravity.y = YGRAVITY;
    }
}