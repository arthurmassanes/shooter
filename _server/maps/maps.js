// export a set of maps and ability to chose a random one

module.exports = {
    // maps are an array of objects
    maps: [

        // MAP ONE
        {
            label: 'La map de Léa',
            obstacles: [
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
                {
                    position: { x: 300, y: 500 },
                    isStatic: true,
                    height: 30,
                    width: 200,
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
                {
                    position: { x: 200, y: 150 },
                    isStatic: true,
                    height: 5,
                    width: 50,
                    color: "black"
                },
                {
                    position: { x: 250, y: 155 },
                    isStatic: true,
                    height: 5,
                    width: 50,
                    color: "black"
                },
                {
                    position: { x: 1000, y: 150 },
                    isStatic: true,
                    height: 5,
                    width: 50,
                    color: "black"
                },
                {
                    position: { x: 1050, y: 155 },
                    isStatic: true,
                    height: 5,
                    width: 50,
                    color: "black"
                },                
            ]
        },

        // Map 2 (gaby)
        {
            label: 'la map de Gabi',
            obstacles: [
                {
                    position: { x: 200, y: 150 },
                    isStatic: true,
                    height: 20,
                    width: 250,
                    angle: 0.45,
                    color: "red"
                },
                {
                    position: { x: 300, y: 600 },
                    isStatic: true,
                    height: 20,
                    width: 200,
                    color: "red"
                },
                {
                    position: { x: 400, y: 350 },
                    isStatic: true,
                    height: 15,
                    restitution: 0.8,
                    width: 75,
                    color: "yellow"
                },
                {
                    position: { x: 500, y: 150 },
                    isStatic: true,
                    height: 5,
                    width: 75,
                    color: "black"
                },
                {
                    position: { x: 1000, y: 200 },
                    isStatic: true,
                    height: 10,
                    width: 150,
                    color: "black"
                },
                {
                    position: { x: 1000, y: 500},
                    isStatic: true,
                    height: 5,
                    width: 250,
                    color: "black"
                },
                {
                    position: { x: 800, y: 600 },
                    isStatic: true,
                    height: 5,
                    width: 150,
                    color: "black"
                },
                {
                    position: { x: 700, y: 400 },
                    isStatic: true,
                    height: 10,
                    width: 200,
                    color: "red"
                },

            ],
        }
    ],
    random: () => module.exports.maps[Math.floor(Math.random() * module.exports.maps.length)],
}