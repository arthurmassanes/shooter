// create the http and socket server
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: { origins: ["*"], methods: ["GET", "POST"] }
})

const maps = require("./maps/maps");
const map = maps.random();

// players with id as key
const players = {};

const onPlayerInfo = (playerInfo, socket) => {
    const id = socket.id;
    const { position, velocity } = playerInfo;
    players[id] = { position, velocity };
    console.log(players, socket.id);
    socket.emit('players', players);
}

io.on("connection", (socket) => {
    const address = socket.request.connection.remoteAddress;
    console.log(`New connection from address ${address}`, socket.id);
    
    socket.emit('players', players);
    socket.emit("map", map)
    // socket.on("event", (data) => {
    // });

    socket.on("playerInfo", (d) => onPlayerInfo(d, socket));
    socket.on("disconnect", () => {
        delete players[socket.id];
        console.log(`Client disconnected: ${address}`);
    });
})

httpServer.listen(process.env.PORT || 3000)
console.log('Server started')