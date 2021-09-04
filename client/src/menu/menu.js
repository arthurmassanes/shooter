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
        this.deleteMenu();
        mgr.showScene(JoinGame);
    }

    startGame() {
        this.deleteMenu();
        mgr.showScene(CreateGame)
    }

    deleteMenu() {
        this.startButton.remove();
        this.joinButton.remove();
    }

    draw() {
        background(42);
    }
}