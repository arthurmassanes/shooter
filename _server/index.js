// create the http and socket server
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: { origins: ["*"], methods: ["GET", "POST"] }
})

const maps = require("./maps/maps");

const refreshInterval = 1000 / 20; // 20 time every 1000 milliseconds

// object with room id as keys
// contains players and map
const rooms = {
    // 'some-room': {
    //    players{}
    //    map{}
    //}
}

function getActiveRooms() {
    return [ ...io.sockets.adapter.rooms.keys() ]
}

const createRoom = (socket, id) => {
    socket.join(id);
    rooms[id] = {
        map: maps.random(),
        players: {}
    }
    console.log(`socket ${socket.id} created ${id} on map ${rooms[id].map.label}`);
    return id;
}

const onPlayerInfo = (playerInfo, socket, roomId) => {
    const id = socket.id;
    const {
        position,
        velocity,
        health
    } = playerInfo;
    if (rooms[roomId]) {
        rooms[roomId].players[id] = { position, velocity, health };
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

    // update player about other clients
    setInterval(() => {
        if (roomId && rooms[roomId]) { // emit player pos only if in game
            socket.emit('players', rooms[roomId].players);
        }
    }, refreshInterval);

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