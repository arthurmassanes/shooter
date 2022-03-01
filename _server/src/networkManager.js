const http = require("http");
const { clearGameLoop } = require("node-gameloop");
const gameloop = require('node-gameloop');

const Game = require('./game');

class NetworkManager {
    constructor() {
        // create the http and socket server
        const httpServer = http.createServer();
        this.io = require("socket.io")(httpServer, {
            cors: { origins: ["*"], methods: ["GET", "POST"] }
        });
        const port = process.env.PORT || 3000;
        httpServer.listen(port);
        console.log('Server started on port ' + port);

        // object with room id as keys
        // and game objects as values
        this.rooms = {
            // 'some-room': new Game()
        }
    }

    getActiveRooms() {
        return [...this.io.sockets.adapter.rooms.keys()]
    }

    updateGame(game, delta) {
        game.update(delta);

        this.io.to(game.id).emit("snapshot", game.getSnapshot());
    }

    createRoom(socket, roomId) {
        socket.join(roomId);
        socket.roomId = roomId;
        console.log("+ Created room", socket.roomId)

        const game = new Game(roomId);
        this.rooms[roomId] = game;
        game.addPlayer(socket.id);

        const loop = gameloop.setGameLoop(delta => this.updateGame(game, delta));
        game.setLoop(loop);

        socket.emit("newGame", roomId);
        socket.emit("map", game.getMap());
        return roomId;
    }

    joinRoom(socket, roomId) {
        if (this.rooms[roomId]) {
            const game = this.rooms[roomId];
            socket.roomId = roomId;
            socket.join(roomId);
            game.addPlayer(socket.id);
            console.log(`- Socket ${socket.id} joined room ${roomId}`);
            game.print();
            socket.emit("newGame", roomId);
            socket.emit("map", game.getMap());
        } else {
            socket.roomId = this.createRoom(socket, roomId);
        }
        return roomId;
    }

    sendMap(socket) {
        const game = this.rooms[socket.roomId];
        if (game) socket.emit("map", game.getMap());
    }

    handleClientInput(socket, keyCode) {
        const game = this.rooms[socket.roomId];

        if (game) game.handleClientInput(socket.id, keyCode);
    }

    disconnect(socket) {
        const roomId = socket.roomId;
        const game = this.rooms[roomId];
        if (game && roomId) {
            game.removePlayer(socket.id);
            this.io.sockets.emit('deletePlayer', { id: socket.id });
            console.log("\x1b[34m", `- Client disconnected: ${socket.id}`, "\x1b[0m");
            this.removeAllEmptyRooms(game);
        }
    }

    removeAllEmptyRooms(game) {
        if (Object.keys(game.players).length === 0) {
            gameloop.clearGameLoop(game.loop);
            game.delete();
            delete this.rooms[game.id];
            console.log(`\x1b[31m- Game ${game.id} deleted\x1b[0m`);
        } else console.log('Players remaining:', Object.keys(game.players))
    }
}


module.exports = NetworkManager;
