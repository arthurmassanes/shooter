const Matter = require('matter-js');

const PLAYER_HEIGHT = 96;
const matterPlayerOptions = {
    inertia: Infinity, // so it dont rotate
    label: 'player',
    frictionAir: 0.05,
    friction: 0.5,
    density: 0.002
};

class Player {
    constructor(world, id, pos = { x: 200, y:  0 }) {
        this.id = id;
        this.height = PLAYER_HEIGHT;
        this.width = PLAYER_HEIGHT;
        this.speed = 0.25;
        this.jumpHeight = 1.1;
        this.maxSpeed = 10;
        this.body = Matter.Bodies.rectangle(pos.x, pos.y, this.width, this.height, matterPlayerOptions);
        this.body.isSteppingGround = null;
        this.body.isPunching = false;
        this.body.canPunch = true;
        this.body.health = 100;
        this.PUNCH_TIMEOUT = 500;
        Matter.World.add(world, this.body);
        console.log('+ Created player ' + this.id);
    }

    limitMaxSpeed() {
        const vel = this.body.velocity;

        vel.x = vel.x >= this.maxSpeed ? this.maxSpeed : vel.x;
        vel.x = vel.x <= -this.maxSpeed ? -this.maxSpeed : vel.x;
        Matter.Body.setVelocity(this.body, vel);
    }

    getData() {
        return ({
            id: this.id,
            width: this.width, height: this.height,
            velocity: this.body.velocity,
            position: this.body.position,
            health: this.body.health,
            isPunching: this.body.isPunching
        })
    }

    punch() {
        if (!this.body.isPunching && this.body.canPunch) {
            this.body.isPunching = true;
            setTimeout(() => {
                this.body.isPunching = false;
                this.body.canPunch = true;
            }, this.PUNCH_TIMEOUT);
        }
    }


    jump() {
        if (this.body.isSteppingGround) {
            Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: -this.jumpHeight });
            this.body.isSteppingGround = false;
        }
    }

    delete(world) {
        console.log('\x1b[31m- Player deleted\x1b[0m', this.id)
        Matter.World.remove(world, this.body);
    }
}

module.exports = Player;