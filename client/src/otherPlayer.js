class OtherPlayer {
    constructor(id, position, velocity, health = 100) {
        this.id = id;
        this.health = health;
        this.healthBar = new HealthBar();
        this.width = PLAYER_HEIGHT;
        this.height = PLAYER_HEIGHT;
        this.position = position;
        const options = { ...matterPlayerOptions, label: 'player ' + id }
        this.body = Bodies.rectangle(position.x, position.y, this.width, this.height, options);
        Body.setVelocity(this.body, velocity);
        World.add(world, this.body);
    }

    update(position, velocity, health) {
        this.position = position;
        this.health = health;
        // console.log('applying pos and vel', position, velocity);
        // console.log(this.body.position, this.body.velocity);
        Body.setVelocity(this.body, velocity);
        Body.setPosition(this.body, position);
    }

    draw() {
        // for now drawing only the received pos
        // (not the matter-computed estimation)
        const pos = this.position;
        rectMode(CENTER);
        rect(pos.x, pos.y, this.width, this.height);
        this.healthBar.draw(pos, this.health);
    }

    delete() {
        Matter.Composite.remove(world, this.body);
    }
}