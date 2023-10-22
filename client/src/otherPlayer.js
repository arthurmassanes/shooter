class OtherPlayer {
    constructor(id, position, velocity, health = 100) {
        this.id = id;
        this.animation = new Animation();
        this.health = health;
        this.healthBar = new HealthBar();
        this.width = PLAYER_HEIGHT;
        this.height = PLAYER_HEIGHT;
        const options = { ...matterPlayerOptions, label: 'player' }
        this.body = Bodies.rectangle(position.x, position.y, this.width, this.height, options);
        if (velocity) Body.setVelocity(this.body, velocity);
        World.add(world, this.body);
        this.body.isSteppingGround = false;
    }

    update(position, velocity, health, isPunching) {
        this.health = health;

        Body.setVelocity(this.body, velocity);
        Body.setPosition(this.body, position);        
        if (velocity.y <= -1) this.body.isSteppingGround = false;
        if (velocity.x <= -1) this.animation.isFacingLeft = true;
        else if (velocity.x >= 1) this.animation.isFacingLeft = false;
        if (isPunching === true) this.animation.play(ANIMATION_STATE.PUNCH);
    }

    draw() {
        this.animation.update(this.body.isSteppingGround);
        const pos = this.body.position;

        this.animation.draw(pos, this.body.angle, this.body.velocity, this.health);
        this.healthBar.draw(pos, this.health);
    }

    delete() {
        Matter.Composite.remove(world, this.body);
    }
}