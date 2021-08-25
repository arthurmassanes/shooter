class Player {
    constructor(x = 500, y = 300) {
        const options = {
            inertia: Infinity, // so it dont rotate
            label: 'player',
            frictionAir: 0.05,
            friction: 0.5,
            density: 0.002
        };
        this.isSteppingGround = false;
        this.speed = 0.1;
        this.airSpeed = 0.02;
        this.height = 100;
        this.width = 50;
        this.xMaxVelocity = 30; // the fastest the player can accelerate
        this.jumpHeight = 0.42;
        this.body = Bodies.rectangle(x, y, this.width, this.height, options);
        World.add(world, this.body);
    }

    // emit playerInfo data to server
    heartbeat() {
        const body = this.body;
        if (body) {
            socket.emit("playerInfo", {
                position: this.body.position,
                velocity: this.body.velocity,
            })
        }
    }

    update() {
        const speed = this.isSteppingGround ? this.speed : this.airSpeed;
        if (isPressingLeft())
            Body.applyForce(this.body, this.body.position, { x: -speed, y: 0 });
        if (isPressingRight())
            Body.applyForce(this.body, this.body.position, { x: speed, y: 0 });

        // const isCollidingWithGround = Matter.SAT.collides(this.body, terrain.ground.body).collided;
        if (isPressingJump() && this.isSteppingGround) {
            Body.applyForce(this.body, this.body.position, { x: 0, y: -this.jumpHeight });
            this.isSteppingGround = false;
        }
        this.stayInScreen();
    }

    // constrain the player to the screen
    stayInScreen() {
        const halfBody = this.width / 2;
        if (this.body.position.x <= 0 - halfBody) {
            Body.setPosition(this.body, { x: gWidth, y: this.body.position.y });
        } else if (this.body.position.x >= gWidth + halfBody) {
            Body.setPosition(this.body, { x: 0, y: this.body.position.y });
        }
    }

    draw() {
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        rectMode(CENTER);
        fill("blue");
        rect(0, 0, this.width, this.height);
        pop();
    }
}
