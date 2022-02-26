class OtherPlayer {
    constructor(id, position, velocity, health = 100) {
        this.id = id;
        this.animation = new Animation();
        this.health = health;
        this.healthBar = new HealthBar();
        this.width = PLAYER_HEIGHT;
        this.height = PLAYER_HEIGHT;
        const options = { ...matterPlayerOptions, label: 'player ' + id }
        this.body = Bodies.rectangle(position.x, position.y, this.width, this.height, options);
        if (velocity) Body.setVelocity(this.body, velocity);
        World.add(world, this.body);
    }

    update(position, velocity, health, isFacingLeft, animationState) {
        this.animation.state = animationState;
        this.animation.isFacingLeft = isFacingLeft;
        this.health = health;

        Body.setVelocity(this.body, velocity);
        Body.setPosition(this.body, position);
    }

    draw() {
        const pos = this.body.position;
        this.animation.draw(pos, this.body.angle, this.body.velocity);
        this.healthBar.draw(pos, this.health);
    }

    delete() {
        Matter.Composite.remove(world, this.body);
    }
}