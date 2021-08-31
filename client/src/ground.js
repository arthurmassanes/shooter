class Ground {
    constructor() {
        const options = {
            isStatic: true,
            label: 'ground',
            // friction: 0
        };
        this.height = 100;
        this.width = gWidth * 2;
        this.body = Bodies.rectangle(gWidth / 2, gHeight, this.width, this.height, options);
        World.add(world, this.body);
    }

    draw() {
        push();
        fill(100);
        rectMode(CENTER);
        rect(this.body.position.x, this.body.position.y, this.width, this.height);
        pop();
    }
}
