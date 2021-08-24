class Game {
    constructor() {
        this.player = new Player();
        this.terrain = new Terrain(this.player); // passes player to check jump
        this.otherPlayers = {} // map with id as key

        // create obstacles based on current map
        socket.on("map", (terrainData) => this.terrain.generateObstacles(terrainData));
        socket.on("players", (data) => this.updatePlayerPositions(data));

        setInterval(() => this.player.heartbeat(), 200);
    }

    update() {
        this.player.update();
    }

    updatePlayerPositions(data) {
        this.otherPlayers = data;
        delete this.otherPlayers[socket.id]; // dont keep own data
    }

    draw() {
        this.player.draw();
        this.terrain.draw();

        Object.keys(this.otherPlayers).map((playerId) => {
            const player = this.otherPlayers[playerId];
            const pos = player.position;
            fill("red");
            rectMode(CENTER);
            rect(pos.x, pos.y, this.player.width, this.player.height);
        });
        fill("white");
        text(`connected players: ${Object.keys(this.otherPlayers).length + 1}`, 20, 20);
    }
}