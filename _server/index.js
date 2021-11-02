// create the http and socket server
const httpServer = require("http").createServer();
const Game = require('./src/game');
const io = require("socket.io")(httpServer, {
    cors: { origins: ["*"], methods: ["GET", "POST"] }
})

const maps = require("./maps/maps");

const refreshInterval = 1000 / 60; // 60 time every 1000 milliseconds

// object with room id as keys
// and game objects as values
const rooms = {
    // 'some-room': new Game()
}

function getActiveRooms() {
    return [ ...io.sockets.adapter.rooms.keys() ]
}

const createRoom = (socket, id) => {
    socket.join(id);
    const game = new Game(id);
    const interval = setInterval(() => game.update(), 1000 / 60);
    rooms[id] = game;
    return id;
}

const onPlayerInfo = (playerInfo, socket, roomId) => {
    const id = socket.id;
    if (rooms[roomId]) {
        rooms[roomId].players[id] = playerInfo;
    }
    // socket.emit('players', players);
}

io.on("connection", (socket) => {
    let roomId;
    const address = socket.request.connection.remoteAddress;
    
    console.log(`New connection from address ${address}`, socket.id);
    
    
    socket.on("createRoom", (id) => {
        const createdRoomId = createRoom(socket, id);
        roomId = createdRoomId;
    });

    socket.on("joinRoom", (id) => {
        if (rooms[id]) {
            roomId = id;
            socket.join(id);
            rooms[id].addPlayer(socket.id);
            console.log(`socket ${socket.id} joined room ${id}`);
        } else {
            const createdRoomId = createRoom(socket, id);
            socket.emit("map", rooms[createdRoomId].map);
            roomId = createdRoomId;
        }
    });

    socket.on("listRooms", () => {
        const roomList = getActiveRooms();
        console.log('List rooms for socket ', socket.id, roomList);
        socket.emit("listRooms", roomList);
    });

    socket.on("map", () => {
        const room = rooms[roomId];
        if (room) socket.emit("map", room.map);
    });

    // socket.emit('players', rooms[roomId].players);
    
    socket.on("playerInfo", (d) => onPlayerInfo(d, socket, roomId));
    socket.on("disconnect", () => {
        const room = rooms[roomId];
        if (room) delete room.players[socket.id];
        console.log(`Client disconnected: ${address}`);
        io.sockets.emit('deletePlayer', { id: socket.id });
    });
})

httpServer.listen(process.env.PORT || 3000)
console.log('Server started')