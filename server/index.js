// create the http and socket server
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: { origins: ["*"], methods: ["GET", "POST"] }
})

const maps = require("./maps/maps");
const map = maps.random();

// players with id as key
const players = {};
const refreshInterval = 1000 / 20; // 20 time every 1000 milliseconds


const onPlayerInfo = (playerInfo, socket) => {
    const id = socket.id;
    const { position, velocity, color } = playerInfo;
    players[id] = { position, velocity, color };
    socket.emit('players', players);
}

io.on("connection", (socket) => {
    const address = socket.request.connection.remoteAddress;
    console.log(`New connection from address ${address}`, socket.id);
    socket.emit("map", map);
    
    // update player about other clients
    setInterval(() => socket.emit('players', players), refreshInterval);
    // socket.on("event", (data) => {
    // });

    socket.on("playerInfo", (d) => onPlayerInfo(d, socket));
    socket.on("disconnect", () => {
        delete players[socket.id];
        console.log(`Client disconnected: ${address}`);
        io.sockets.emit('deletePlayer',{ id: socket.id });
    });
})

httpServer.listen(process.env.PORT || 3000)
console.log('Server started')