class Spinner {
    constructor(color = "green") {
        this.color = color;
        this.rotation = 0;
    }

    draw() {
        background(42);
        strokeWeight(10);
        noFill();
        stroke(this.color)
        arc(width / 2, height / 2, 100, 100, this.rotation, this.rotation * HALF_PI);
        this.rotation += 0.1;
    }
}