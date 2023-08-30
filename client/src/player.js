const PLAYER_HEIGHT = 96;
const matterPlayerOptions = {
    inertia: Infinity, // so it dont rotate
    label: 'player',
    frictionAir: 0.05,
    friction: 0.5,
    density: 0.002,
};

class Player {
    constructor(x = 200, y = 0, id = undefined) {
        this.id = id;
        this.animation = new Animation();
        this.health = 100;
        this.healthBar = new HealthBar();
        this.options = matterPlayerOptions;
        this.height = PLAYER_HEIGHT;
        this.width = PLAYER_HEIGHT;
        this.speed = 0.25;
        this.jumpHeight = 1.1;
        this.maxSpeed = 10;
        this.canPunch = true;
        this.PUNCH_TIMEOUT = 500;
        this.body = Bodies.rectangle(x, y, this.width, this.height, this.options);
        World.add(world, this.body);
    }

    // generateRandomColor() {
    //     const r = random(255); // r is a random number between 0 - 255
    //     const g = random(100,200); // g is a random number betwen 100 - 200
    //     const b = random(100); // b is a random number between 0 - 100
    //     return "#" + hex(r, 2) + hex(g, 2) + hex(b, 2);
    // }

    updateFromServer({ position, velocity, health }) {
        Body.setPosition(this.body, position);
        Body.setVelocity(this.body, velocity);
        this.health = health;
    }

    update() {
        if (isPressingLeft()) {
            socket.emit("input", CONTROLS.LEFT);
            this.animation.isFacingLeft = true;
            Body.applyForce(this.body, this.body.position, { x: -this.speed, y: 0 });
        }
        if (isPressingRight()) {
            socket.emit("input", CONTROLS.RIGHT);
            this.animation.isFacingLeft = false;
            Body.applyForce(this.body, this.body.position, { x: this.speed, y: 0 });
        }
        if (isPressingJump()) {
            socket.emit("input", CONTROLS.UP);
            if (this.body.isSteppingGround) {
                Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: -this.jumpHeight });
                this.body.isSteppingGround = false;
            }    
        }
        if (isPressingPunch() && this.canPunch) {
            this.canPunch = false;
            this.animation.play(ANIMATION_STATE.PUNCH);
            socket.emit("input", CONTROLS.PUNCH);
            setTimeout(() => { this.canPunch = true; }, this.PUNCH_TIMEOUT);
        }
        this.animation.update(this.body.isSteppingGround);
        this.limitMaxSpeed();
    }

    limitMaxSpeed() {
        const vel = this.body.velocity;

        vel.x = vel.x >= this.maxSpeed ? this.maxSpeed : vel.x;
        vel.x = vel.x <= -this.maxSpeed ? -this.maxSpeed : vel.x;
        Matter.Body.setVelocity(this.body, vel);
    }

    draw() {
        this.animation.draw(this.body.position, this.body.angle, this.body.velocity);
        this.healthBar.draw(this.body.position, this.health);
    }
}
