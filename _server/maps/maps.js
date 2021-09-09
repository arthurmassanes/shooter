// export a set of maps and ability to chose a random one

module.exports = {
    // maps are an array of objects
    maps: [

        // MAP ONE
        {
            label: 'Rocky',
            obstacles: [
                {
                    position: { x: 200, y: 150 },
                    width: 10, height: 10,
                    isStatic: true,
                    angle: 0.45,
                },
            ]
        },

        // Map 2 (gaby)
        // {
        //     label: 'la map de Gabi',
        //     filepath: 'assets/bg1.png',
        //     obstacles: [
        //         {
        //             position: { x: 200, y: 150 },
        //             isStatic: true,
        //             height: 20,
        //             width: 250,
        //             angle: 0.45,
        //             color: "red"
        //         },
        //         {
        //             position: { x: 300, y: 600 },
        //             isStatic: true,
        //             height: 20,
        //             width: 200,
        //             color: "red"
        //         },
        //         {
        //             position: { x: 400, y: 350 },
        //             isStatic: true,
        //             height: 15,
        //             restitution: 0.8,
        //             width: 75,
        //             color: "yellow"
        //         },
        //         {
        //             position: { x: 500, y: 150 },
        //             isStatic: true,
        //             height: 5,
        //             width: 75,
        //             color: "black"
        //         },
        //         {
        //             position: { x: 1000, y: 200 },
        //             isStatic: true,
        //             height: 10,
        //             width: 150,
        //             color: "black"
        //         },
        //         {
        //             position: { x: 1000, y: 500},
        //             isStatic: true,
        //             height: 5,
        //             width: 250,
        //             color: "black"
        //         },
        //         {
        //             position: { x: 800, y: 600 },
        //             isStatic: true,
        //             height: 5,
        //             width: 150,
        //             color: "black"
        //         },
        //         {
        //             position: { x: 700, y: 400 },
        //             isStatic: true,
        //             height: 10,
        //             width: 200,
        //             color: "red"
        //         },

        //     ],
        // }
    ],
    random: () => module.exports.maps[Math.floor(Math.random() * module.exports.maps.length)],
}