class Player {
    constructor(x = 500, y = 500) {
        const options = {
            label: 'player',
            // restitution: 0.1,
            inertia: Infinity,
            // frictionAir: 0.1,
            // friction: 0.1,
            // density: 0.0015
        };
        this.speed = 0.02;
        this.height = 80;
        this.width = 50;
        this.xMaxVelocity = 30; // the fastest the player can accelerate
        this.jumpHeight = -0.15;
        this.body = Bodies.rectangle(x, y, this.width, this.height, options);
        World.add(world, this.body);
    }

    capAcceleration(body, maxVelocity) {
        const velocity = body.velocity;
        const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
        if (speed > maxVelocity) {
            const ratio = maxVelocity / speed;
            velocity.x *= ratio;
            velocity.y *= ratio;
        }
    }

    update() {
        if (isPressingLeft())
            Body.applyForce(this.body, this.body.position, { x: -this.speed, y: 0 });
        if (isPressingRight())
            Body.applyForce(this.body, this.body.position, { x: this.speed, y: 0 });

        const isCollidingWithGround = Matter.SAT.collides(this.body, ground.body).collided;
        if (isPressingJump() && isCollidingWithGround)
            Body.applyForce(this.body, this.body.position, { x: 0, y: this.jumpHeight });
        else if (!isCollidingWithGround)
            this.body.weight = 0.1;
        else this.body.weight = 1;
        // this.capAcceleration(this.body, this.xMaxVelocity);
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
