class OtherPlayer {
    constructor(id, position, velocity, health = 100) {
        this.id = id;
        this.animation = new Animation();
        this.health = health;
        this.healthBar = new HealthBar();
        this.width = PLAYER_HEIGHT;
        this.height = PLAYER_HEIGHT;
        this.position = position;
        console.log({position})
        const options = { ...matterPlayerOptions, label: 'player ' + id }
        this.body = Bodies.rectangle(position.x, position.y, this.width, this.height, options);
        if (velocity) Body.setVelocity(this.body, velocity);
        World.add(world, this.body);
    }

    update(position, velocity, health, isFacingLeft, animationState) {
        this.position = position;
        this.animation.state = animationState;
        this.animation.isFacingLeft = isFacingLeft;
        this.health = health;

        Body.setVelocity(this.body, velocity);
        Body.setPosition(this.body, position);
    }

    draw() {
        // for now drawing only the received pos
        // (not the matter-computed estimation)
        const pos = this.position;
        this.animation.draw(pos, this.body.angle, this.body.velocity);
        this.healthBar.draw(pos, this.health);
    }

    delete() {
        Matter.Composite.remove(world, this.body);
    }
}