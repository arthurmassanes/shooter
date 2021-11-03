const http = require("http");
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
        return [ ...this.io.sockets.adapter.rooms.keys() ]
    }

    createRoom(socket, roomId) {
        socket.join(roomId);
        const game = new Game(roomId);
        const interval = setInterval(() => game.update(), 1000 / 60);
        game.addPlayer(socket.roomId);
        this.rooms[roomId] = game;
        socket.roomId = roomId;
        return roomId;
    }
    
    joinRoom(socket, roomId) {
        if (this.rooms[roomId]) {
            socket.join(roomId);
            this.rooms[roomId].addPlayer(socket.id);
            console.log(`socket ${socket.id} joined room ${roomId}`);
            socket.roomId = roomId;
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
