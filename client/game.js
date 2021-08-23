class Game {
    constructor() {
        this.player = new Player();
        this.terrain = new Terrain(this.player); // passes player to check jump    
    }

    draw() {
        this.player.draw();
        this.terrain.draw();
    }

    update() {
        this.player.update();
    }
}