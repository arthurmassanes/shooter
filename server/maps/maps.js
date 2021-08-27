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
                width: 300,
                color: "#993636"
            },
            {
                position: { x: 800, y: 600 },
                isStatic: true,
                height: 30,
                width: 300,
                color: "#993636"
            },
            {
                position: { x: 1000, y: 450 },
                isStatic: true,
                height: 30,
                width: 200,
                color: "#993636"
            },
            {
                position: { x: 600, y: 450 },
                isStatic: true,
                height: 30,
                width: 50,
                restitution: 0.6,
                color: "lightblue"
            },
            {
                position: { x: 1200, y: 300 },
                isStatic: true,
                height: 30,
                width: 400,
                color: "#993636"
            },

        ]
    ],
    random: () => module.exports.maps[Math.floor(Math.random() * module.exports.maps.length)],
}