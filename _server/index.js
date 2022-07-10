const NetworkManager = require('./src/networkManager');

const networkManager = new NetworkManager();

networkManager.io.on("connection", (socket) => {
    const address = socket.request.connection.remoteAddress;
    console.log("\x1b[32m", `+ New connection from address ${address}`, socket.id, "\x1b[0m");


    socket.on("createRoom", (id) => socket.roomId = networkManager.createRoom(socket, id));

    socket.on("joinRoom", (id) => socket.roomId = networkManager.joinRoom(socket, id));

    socket.on("listRooms", () => {
        const roomList = networkManager.getActiveRooms();
        console.log('List rooms for socket ', socket.id, roomList);
        socket.emit("listRooms", roomList);
    });

    // game logic
    socket.on("map", () => networkManager.sendMap(socket));
    socket.on("input", keyCode => networkManager.handleClientInput(socket, keyCode));

    socket.on("disconnect", () => networkManager.disconnect(socket));
})
