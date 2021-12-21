const http = require("http");
const gameloop = require('node-gameloop');

const Game = require('./game');

class NetworkManager {
    constructor() {
        // create the http and socket server
        const httpServer = http.createServer();
        this.io = require("socket.io")(httpServer, {
            cors: { origins: ["*"], methods: ["GET", "POST"] }
        })
        httpServer.listen(process.env.PORT || 3000);
        console.log('Server started')

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

        const game = new Game(roomId);
        this.rooms[roomId] = game;
        game.addPlayer(socket.roomId);

        const loop = gameloop.setGameLoop(delta => this.updateGame(game, delta));
        game.setLoop(loop);

        socket.emit("newGame");
        return roomId;
    }

    joinRoom(socket, roomId) {
        if (this.rooms[roomId]) {
            socket.join(roomId);
            this.rooms[roomId].addPlayer(socket.id);
            console.log(`socket ${socket.id} joined room ${roomId}`);
            socket.roomId = roomId;
            socket.emit("newGame");
            // socket.emit("map", this.rooms[roomId]);
        } else {
            socket.roomId = this.createRoom(socket, roomId);
        }
    }

    sendMap(socket) {
        const game = this.rooms[socket.roomId];
        if (game) socket.emit("map", game.getMap());
    }

    disconnect(socket, roomId) {
        const game = this.rooms[roomId];
        if (game && roomId) {
            console.log('Leaving room ' + roomId);
            game.removePlayer[socket.id];
            this.io.sockets.emit('deletePlayer', { id: socket.id });
        }
        console.log(`Client disconnected: ${socket.id}`);
    }
}


module.exports = NetworkManager;
