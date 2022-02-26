class Obstacle {
    constructor({ filepath, position, isStatic, restitution, angle }) {
        console.log('Obstacle generated', filepath, position, isStatic, restitution, angle);
        this.width = 0;
        this.height = 0;
        this.initialPosition = position;
        this.options = {
            label: 'ground',
            isStatic,
            density: 0.5,
        }

        this.image = loadImage(filepath, img => this.createObjectFromImage(img, restitution, angle));
    }
    
    // Create Matter object
    createObjectFromImage(img, restitution, angle) {
        const position = this.initialPosition;
        this.width = img.width;
        this.height = img.height;
        this.body = Bodies.rectangle(position.x, position.y, this.width, this.height, this.options);
        if (angle) Body.setAngle(this.body, angle);
        if (restitution) this.body.restitution = restitution;
        World.add(world, this.body);
    }
    
    remove() {
        if (this.body) World.remove(world, this.body);
    }

    draw() {
        const pos = this.body ? this.body.position : this.initialPosition;
        const angle = this.body ? this.body.angle : 0;
        push();
        rectMode(CENTER);
        imageMode(CENTER);
        translate(pos.x, pos.y);
        rotate(angle);
        if (this.image) image(this.image, 0, 0)
        pop();
    }
}