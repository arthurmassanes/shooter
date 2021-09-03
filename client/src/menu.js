class Menu {
    setup() {

        this.startButton = createButton('Start game');
        this.startButton.position(gWidth / 2, gHeight / 2);
        this.startButton.mousePressed(() => this.startGame());

        this.joinButton = createButton('Join Game');
        this.joinButton.position(gWidth / 2, gHeight / 2 + 100);
        this.joinButton.mousePressed(() => this.joinGame());

    }

    joinGame() {
        
    }

    startGame() {
        this.startButton.remove();
        this.joinButton.remove();
        mgr.showScene(Game)
    }

    draw() {
        background(42);
    }
}