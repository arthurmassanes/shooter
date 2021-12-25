const NetworkManager = require('./src/networkManager');
const maps = require("./maps/maps");

const networkManager = new NetworkManager();

const refreshInterval = 1000 / 60; // 60 time every 1000 milliseconds


const onPlayerInfo = (playerInfo, socket, roomId) => {
    const id = socket.id;
    if (networkManager.rooms[roomId]) {
        networkManager.rooms[roomId].players[id] = playerInfo;
    }
    // socket.emit('players', players);
}

networkManager.io.on("connection", (socket) => {
    const address = socket.request.connection.remoteAddress;
    console.log(`New connection from address ${address}`, socket.id);


    socket.on("createRoom", (id) => socket.roomId = networkManager.createRoom(socket, id));

    socket.on("joinRoom", (id) => socket.roomId = networkManager.joinRoom(socket, id));

    socket.on("listRooms", () => {
        const roomList = networkManager.getActiveRooms();
        console.log('List rooms for socket ', socket.id, roomList);
        socket.emit("listRooms", roomList);
    });

    socket.on("map", () => networkManager.sendMap(socket));

    // interval
    // socket.emit('players', networkManager.rooms[roomId].players);

    // socket.on("playerInfo", (d) => onPlayerInfo(d, socket, roomId));
    socket.on("disconnect", () => networkManager.disconnect(socket));
})
