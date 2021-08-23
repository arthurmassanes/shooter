class Game {
    constructor() {
        this.player = new Player();
        this.terrain = new Terrain(this.player); // passes player to check jump

        // create obstacles based on current map
        socket.on("map", (terrainData) => this.terrain.generateObstacles(terrainData));
    }

    update() {
        this.player.update();
    }

    draw() {
        this.player.draw();
        this.terrain.draw();
    }
}