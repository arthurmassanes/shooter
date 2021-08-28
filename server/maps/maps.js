// export a set of maps and ability to chose a random one

module.exports = {
    // maps are an array of objects
    maps: [

        // MAP ONE
        [
            {
                position: { x: 300, y: 350 },
                isStatic: true,
                height: 30,
                width: 300,
                color: "#993636"
            },
            {
                position: { x: 1000, y: 350 },
                isStatic: true,
                height: 30,
                width: 300,
                color: "#993636"
            },

            // trampolines
            {
                position: { x: 600, y: 650 },
                isStatic: true,
                height: 10,
                width: 50,
                restitution: 0.7,
                color: "purple"
            },
            {
                position: { x: 720, y: 650 },
                isStatic: true,
                height: 10,
                width: 50,
                restitution: 0.7,
                color: "lightblue"
            },
            {
                position: { x: 600, y: 450 },
                isStatic: true,
                height: 10,
                width: 50,
                restitution: 0.7,
                color: "blue"
            },
            {
                position: { x: 500, y: 400 },
                isStatic: true,
                height: 10,
                width: 50,
                restitution: 0.7,
                color: "teal"
            },
            {
                position: { x: 700, y: 500 },
                isStatic: true,
                height: 10,
                width: 50,
                restitution: 0.7,
                color: "green"
            },
            {
                position: { x: 800, y: 400 },
                isStatic: true,
                height: 10,
                width: 50,
                restitution: 0.7,
                color: "orange"
            },
            {
                position: { x: 1000, y: 560 },
                isStatic: true,
                height: 10,
                width: 50,
                restitution: 0.7,
                color: "yellow"
            },
            {
                position: { x: 650, y: 250 },
                isStatic: true,
                height: 10,
                width: 50,
                restitution: 0.7,
                color: "lightgreen"
            },
            {
                position: { x: 350, y: 550 },
                isStatic: true,
                height: 10,
                width: 50,
                restitution: 0.7,
                color: "pink"
            },
            {
                position: { x: 950, y: 650 },
                isStatic: true,
                height: 10,
                width: 50,
                restitution: 0.7,
                color: "red"
            },
        ]
    ],
    random: () => module.exports.maps[Math.floor(Math.random() * module.exports.maps.length)],
}