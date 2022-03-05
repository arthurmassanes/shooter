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
        this.jumpCoolDown = 0;
        this.speed = 0.25;
        this.airSpeed = 0.04;
        this.height = PLAYER_HEIGHT;
        this.width = PLAYER_HEIGHT;
        this.jumpHeight = 1;
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
        }
        if (isPressingRight()) {
            socket.emit("input", CONTROLS.RIGHT);
            this.animation.isFacingLeft = false;
        }
        if (isPressingJump()) {
            socket.emit("input", CONTROLS.UP);
            this.body.isSteppingGround = false;
        }
        this.animation.update(this.body.isSteppingGround);
    }

    // WIP - remove to send only key inputs to server
    updateLegacy() {
        this.animation.update(this.isSteppingGround);
        this.jumpCoolDown++;
        const speed = this.isSteppingGround ? this.speed : this.airSpeed;
        if (isPressingLeft()) {
            Body.applyForce(this.body, this.body.position, { x: -speed, y: 0 });
            this.animation.isFacingLeft = true;
        }
        if (isPressingRight()) {
            this.animation.isFacingLeft = false;
            Body.applyForce(this.body, this.body.position, { x: speed, y: 0 });
        }

        // const isCollidingWithGround = Matter.SAT.collides(this.body, terrain.ground.body).collided;
        if (isPressingJump() && this.isSteppingGround
            // limit jump to twice per second
            && this.jumpCoolDown >= FPS / 2
        ) {
            this.isSteppingGround = false;
            Body.applyForce(this.body, this.body.position, { x: 0, y: -this.jumpHeight });
            this.jumpCoolDown = 0;
        }
        if (isPressingPunch()) {
            this.animation.play(ANIMATION_STATE.PUNCH, 1); // play punch animation once
        }
        // this.stayInScreen();
    }

    // constrain the player to the screen
    stayInScreen() {
        const halfBody = this.width / 2;

        // left and right
        if (this.body.position.x <= 0 + halfBody) {
            Body.setPosition(this.body, { x: 0 + halfBody, y: this.body.position.y });
        } else if (this.body.position.x >= gWidth - halfBody) {
            Body.setPosition(this.body, { x: gWidth - halfBody, y: this.body.position.y });
        }
        // bottom of screen -> respawn
        if (this.body.position.y >= gHeight * 2) this.respawn();
    }

    respawn() {
        const pos = { x: 200, y: 100 };
        this.health -= 10;
        Body.setPosition(this.body, pos);
    }

    draw() {
        this.animation.draw(this.body.position, this.body.angle, this.body.velocity);
        this.healthBar.draw(this.body.position, this.health);
    }
}
