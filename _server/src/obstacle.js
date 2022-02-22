const { Bodies, Body, World } = require('matter-js');

class Obstacle {
    constructor({
        world,
        width, height, position,
        filepath,
        isStatic,
        restitution,
        angle 
    }) {
        this.width = width;
        this.height = height;
        this.filepath = filepath;
        this.position = position;
        this.angle = angle;
        this.options = {
            label: 'ground',
            isStatic,
            restitution: restitution || 0,
            density: 0.5,
        }
        
        // Create Matter object
        this.body = Bodies.rectangle(position.x, position.y, this.width, this.height, this.options);
        if (angle) Body.setAngle(this.body, angle);
        if (restitution) this.body.restitution = restitution;
        World.add(world, this.body);
    }
    
    remove() {
        if (this.body) World.remove(world, this.body);
    }
}

module.exports = Obstacle;
