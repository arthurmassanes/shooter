class CreateGame {
    setup() {
        this.isLoading = false;
        this.spinner = new Spinner();
        socket.on("newGame", () => this.onNewGame());

        this.start = createButton('Create');
        this.start.position(gWidth / 2, gHeight / 2);
        this.start.mousePressed(() => this.onClickCreate());

        this.roomId = undefined;
    }
    
    onClickCreate() {
        this.isLoading = true;
        this.start.remove();
        // lil random id;
        this.roomId = `_${(Math.random() + 1).toString(36).substring(7)}`;
        socket.emit("createRoom", this.roomId);
    }
    
    onNewGame() {        
        mgr.showScene(Game);
        window.history.pushState({}, '', `?room=${this.roomId}`);
    }

    draw() {
        background(42);
        if (this.isLoading) this.spinner.draw();
    }
}