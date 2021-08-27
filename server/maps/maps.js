// export a set of maps and ability to chose a random one

module.exports = {
    // maps are an array of objects
    maps: [

        // MAP ONE
        [
            {
                position: { x: 100, y: 300 },
                isStatic: true,
                height: 30,
                width: 300,
                color: "#993636"
            },
            {
                position: { x: 300, y: 600 },
                isStatic: true,
                height: 30,
                width: 500,
                color: "#993436"
            },
            {
                position: { x: 500, y: 550 },
                isStatic: true,
                height: 30,
                width: 200,
                color: "#993636"
            },
            {
                position: { x: 800, y: 450 },
                isStatic: true,
                height: 30,
                width: 200,
                color: "#993636"
            },
            {
                position: { x: 500, y: 450 },
                isStatic: true,
                height: 30,
                width: 50,
                restitution: 0.6,
                color: "lightblue"
            },
            {
                position: { x: 800, y: 250 },
                isStatic: true,
                height: 30,
                width: 200,
                color: "grey"
            },
            {
                position: { x: 800, y: 75 },
                isStatic: true,
                height: 20,
                width: 20,
                color: "black"
            },
            {
                position: { x: 860, y: 50 },
                isStatic: true,
                height: 20,
                width: 20,
                color: "black"
            },
            {
                position: { x: 900, y: 50 },
                isStatic: true,
                height: 20,
                width: 20,
                color: "black"
            },

        ]
    ],
    random: () => module.exports.maps[Math.floor(Math.random() * module.exports.maps.length)],
}