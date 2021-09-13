class JoinGame {
    setup() {
        this.rooms = [];
        this.join = createButton('Join');
        this.join.position(gWidth / 2, gHeight / 2);
        this.join.mousePressed(() => this.joinGame(this.sel.value()));
        this.sel = createSelect();
        this.sel.position(10, 10);

        socket.on("listRooms", (data) => {
            this.rooms = data.filter(r => r.startsWith('room'));
            this.rooms.map(r => this.sel.option(r))
            if (!this.rooms.length) this.join.remove();
        });
        socket.emit("listRooms");
    }

    joinGame(gameId) {
        this.join.remove();
        this.sel.remove();
        // add game id in url
        window.history.pushState({}, '', `?room=${gameId}`);
        socket.emit("joinRoom", gameId);
        mgr.showScene(Game)
    }

    draw() {
        background(42);
        noStroke();
        textSize(24);
        fill("white");
        if (this.rooms.length <= 0) text('No rooms found. Create your own!', 100, 100);
    }
}