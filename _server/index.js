// create the http and socket server
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: { origins: ["*"], methods: ["GET", "POST"] }
})

const maps = require("./maps/maps");

// players with id as key
const players = {};
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

const onPlayerInfo = (playerInfo, socket, roomId) => {
    const id = socket.id;
    const { position, velocity, color } = playerInfo;
    if (rooms[roomId]) {
        console.log('receiving player pos', id, roomId);
        rooms[roomId].players[id] = { position, velocity, color };
    }
    // socket.emit('players', players);
}

io.on("connection", (socket) => {
    let roomId;
    const address = socket.request.connection.remoteAddress;
    
    console.log(`New connection from address ${address}`, socket.id);

        
    socket.on("createRoom", (id) => {
        id = id + socket.id
        socket.join(id);
        rooms[id] = {
            map: maps.random(),
            players: {}
        }
        roomId = id;
        console.log(`socket ${socket.id} created room ${rooms[id].map.label}`);
    });

    socket.on("joinRoom", (id) => {
        socket.join(id);
        roomId = id;
        console.log(`socket ${socket.id} joined room ${roomId}`);
    });

    socket.on("listRooms", () => {
        const roomList = getActiveRooms();
        console.log('List rooms for socket ', socket.id, roomList);
        socket.emit("listRooms", roomList);
    });

    socket.on("map", () => socket.emit("map", rooms[roomId].map));

    // update player about other clients
    setInterval(() => {
        if (roomId && rooms[roomId]) { // emit player pos only if in game
            socket.emit('players', rooms[roomId].players);
        }
    }, refreshInterval);

    socket.on("playerInfo", (d) => onPlayerInfo(d, socket, roomId));
    socket.on("disconnect", () => {
        delete players[socket.id];
        console.log(`Client disconnected: ${address}`);
        io.sockets.emit('deletePlayer',{ id: socket.id });
    });
})

httpServer.listen(process.env.PORT || 3000)
console.log('Server started')