class JoinGame {
    setup() {
        socket.on("newGame", (gameId) => this.onNewGame(gameId));
        this.rooms = [];
        this.isLoading = false;
        this.noRooms = false;
        this.spinner = new Spinner();
        this.join = createButton('Join');
        this.join.position(gWidth / 2, gHeight / 2);
        this.join.mousePressed(() => this.onClickJoin(this.sel.value()));
        this.sel = createSelect();
        this.sel.position(10, 10);

        socket.on("listRooms", data => {
            // Room name will always start with _
            // TODO: Allow to pick a room name
            this.rooms = data.filter(r => r.startsWith('_'));
            this.rooms.map(r => this.sel.option(r));
            if (!this.rooms.length) {
                this.sel.remove();
                this.join.remove();
                this.noRooms = true;
            }
        });
        socket.emit("listRooms");
    }

    onClickJoin(gameId) {
        this.isLoading = true;
        this.join.remove();
        this.sel.remove();

        socket.emit("joinRoom", gameId);
    }

    onNewGame(gameId) {
        // add game id in url
        mgr.showScene(Game);
        window.history.pushState({}, '', `?room=${gameId}`);
    }

    draw() {
        background(42);
        noStroke();
        textSize(24);
        fill("white");
        if (this.noRooms) {
            text('No rooms found. Create your own!', 100, 100);
        }
        if (this.isLoading) this.spinner.draw();
    }
}
