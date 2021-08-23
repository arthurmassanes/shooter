// create the http and socket server
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: { origins: ["*"], methods: ["GET", "POST"] }
})

const maps = require("./maps");
const map = maps.random();
console.log(maps);

io.on("connection", (socket) => {
    const address = socket.request.connection.remoteAddress;
    console.log(`New connection from address ${address}`);
    socket.emit("map", map)
    // socket.on("event", (data) => {
    // });
    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${address}`)
    });
})

httpServer.listen(process.env.PORT || 3000)
console.log('Server started')