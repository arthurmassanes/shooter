class OtherPlayer {
    constructor(id, position, velocity, color, width = PLAYER_HEIGHT, height = PLAYER_HEIGHT) {
        this.id = id;
        this.width = width;
        this.color = color;
        this.height = height;
        this.position = position;
        const options = { ...matterPlayerOptions, label: 'player ' + id }
        this.body = Bodies.rectangle(position.x, position.y, this.width, this.height, options);
        Body.setVelocity(this.body, velocity);
        World.add(world, this.body);
    }

    update(position, velocity) {
        this.position = position;
        // console.log('applying pos and vel', position, velocity);
        // console.log(this.body.position, this.body.velocity);
        Body.setVelocity(this.body, velocity);
        Body.setPosition(this.body, position);
    }

    draw() {
        // for now drawing only the received pos
        // (not the matter-computed estimation)
        const pos = this.position;
        fill(this.color);
        rectMode(CENTER);
        rect(pos.x, pos.y, this.width, this.height);
    }

    delete() {
        Matter.Composite.remove(world, this.body);
    }
}