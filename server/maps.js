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
                color: "#993636"
            },
            {
                position: { x: 200, y: 500 },
                isStatic: false,
                height: 30,
                width: 30,
                color: "#993636"
            },
            {
                position: { x: 200, y: 500 },
                isStatic: false,
                height: 30,
                width: 30,
                color: "#993636"
            }
        ]
    ],
    random: () => module.exports.maps[Math.floor(Math.random() * module.exports.maps.length)],
}