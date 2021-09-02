class Player {
    constructor(x = 240, y = 240) {
        this.options = {
            inertia: Infinity, // so it dont rotate
            label: 'player',
            frictionAir: 0.05,
            friction: 0.5,
            density: 0.003
        };
        this.color = this.generateRandomColor();
        this.jumpCoolDown = 0;
        this.isSteppingGround = false;
        this.speed = 0.2;
        this.airSpeed = 0.04;
        this.height = 100;
        this.width = 50;
        this.jumpHeight = 1;
        this.maxSpeed = 10;
        this.emitedPackages = 0;
        this.body = Bodies.rectangle(x, y, this.width, this.height, this.options);
        World.add(world, this.body);
    }

    generateRandomColor() {
        const r = random(255); // r is a random number between 0 - 255
        const g = random(100,200); // g is a random number betwen 100 - 200
        const b = random(100); // b is a random number between 0 - 100
        return "#" + hex(r,2) + hex(g,2) + hex(b,2);
    }

    isMoving() {
        const vel = this.body.velocity;
        return (vel.x !== 0 || vel.y !== 0)
    }

    // emit playerInfo data to server
    heartbeat() {
        const body = this.body;
        if (body) {
            socket.emit("playerInfo", {
                position: this.body.position,
                velocity: this.body.velocity,
                color: this.color
            });
            this.emitedPackages += 1;
        }
    }

    limitMaxSpeed() {
        const vel = this.body.velocity;

        vel.x = vel.x >= this.maxSpeed ? this.maxSpeed : vel.x;
        vel.x = vel.x <= -this.maxSpeed ? -this.maxSpeed : vel.x;
        Body.setVelocity(this.body, vel);
    }

    update() {
        this.limitMaxSpeed();
        this.jumpCoolDown++;
        const speed = this.isSteppingGround ? this.speed : this.airSpeed;
        if (isPressingLeft())
            Body.applyForce(this.body, this.body.position, { x: -speed, y: 0 });
        if (isPressingRight())
            Body.applyForce(this.body, this.body.position, { x: speed, y: 0 });

        // const isCollidingWithGround = Matter.SAT.collides(this.body, terrain.ground.body).collided;
        if (isPressingJump() && this.isSteppingGround
            // limit jump to twice per second
        && this.jumpCoolDown >= FPS / 2) {
            this.isSteppingGround = false;
            Body.applyForce(this.body, this.body.position, { x: 0, y: -this.jumpHeight });
            this.jumpCoolDown = 0;
        }
        this.stayInScreen();
    }

    // constrain the player to the screen
    stayInScreen() {
        const halfBody = this.width / 2;

        // left and right
        if (this.body.position.x <= 0 - halfBody) {
            Body.setPosition(this.body, { x: gWidth, y: this.body.position.y });
        } else if (this.body.position.x >= gWidth + halfBody) {
            Body.setPosition(this.body, { x: 0, y: this.body.position.y });
        }
        // bottom of screen -> respawn
        if (this.body.position.y >= gHeight * 2) this.respawn();
    }

    respawn() {
        const pos = { x: 200, y: 100 };
        Body.setPosition(this.body, pos);
    }

    draw() {
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        rectMode(CENTER);
        fill(this.color);
        rect(0, 0, this.width, this.height);
        pop();
    }
}
