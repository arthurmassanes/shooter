class CreateGame {
    setup() {
        this.start = createButton('Create');
        this.start.position(gWidth / 2, gHeight / 2);
        this.start.mousePressed(() => this.startGame());

    }

    startGame() {
        this.start.remove();
        mgr.showScene(Game)
        // lil random id;
        const roomId = `_${(Math.random() + 1).toString(36).substring(7)}`;
        socket.emit("createRoom", roomId);
        window.history.pushState({}, '', `?room=${roomId}`);
    }

    draw() {
        background(42);
    }
}