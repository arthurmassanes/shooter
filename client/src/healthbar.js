class HealthBar {
    constructor() {
        this.height = 5;
    }

    draw(position, health) {
        var { x, y } = position;
        y -= 65; 
        push();
        fill("red");
        noStroke();
        rectMode(CENTER);
        rect(x, y, 100, this.height);
        // rectMode(CORNER);
        fill("green");
        rect(x - 100 + health, y, health, this.height);
        pop();
    }
}