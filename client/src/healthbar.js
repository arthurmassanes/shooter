class HealthBar {
    constructor() {
        this.height = 5;
    }

    draw(position, health) {
        var { x, y } = position;
        y -= 65; // above head
        push();
        fill("red");
        noStroke();
        rectMode(CENTER);
        rect(x, y, 100, this.height);
        if (health > 0) {
            rectMode(CORNER);
            fill("green");
            rect(x - 50, y - this.height / 2, health, this.height);
        }
        pop();
    }
}