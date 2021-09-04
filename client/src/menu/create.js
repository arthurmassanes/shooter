class CreateGame {
    setup() {
        this.start = createButton('Create');
        this.start.position(gWidth / 2, gHeight / 2);
        this.start.mousePressed(() => this.startGame());

    }

    startGame() {
        this.start.remove();
        socket.emit("createRoom", 'room');
        mgr.showScene(Game)
    }

    draw() {
        background(42);
    }
}