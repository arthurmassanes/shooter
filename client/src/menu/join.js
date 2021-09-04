class JoinGame {
    setup() {

        this.rooms = [];
        socket.on("listRooms", (data) => this.rooms = data);
        socket.emit("listRooms");
        this.join = createButton('Join');
        this.join.position(gWidth / 2, gHeight / 2);
        this.join.mousePressed(() => this.joinGame('hey'));

    }

    joinGame(gameId) {
        this.join.remove();
        socket.emit("joinRoom", gameId);
        mgr.showScene(Game)
    }

    draw() {
        background(42);
        noStroke();
        textSize(24);
        fill("white");
        if (this.rooms.length <= 0) text('No rooms found. Create your own!', 100, 100);
        else this.rooms.map((room, index) => {
            text(room, 100, 100 + (index * 100));
        });
    }
}