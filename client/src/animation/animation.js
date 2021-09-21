const spritesFolders = {
    COWBOY: "assets/animations/cowboy/"
}

class Animation {
    constructor(spriteFolder = spritesFolders.COWBOY, state = ANIMATION_STATE.WALK) {
        this.json = undefined;
        this.speed = 0.4;
        this.index = 0;
        this.state = state;
        this.frames = [];
        this.loaded = false;
        this.isFacingLeft = false;

        this.loadSprite(spriteFolder);
        console.log(ANIMATION_STATE, this.state);
    }
    
    loadSprite(spriteFolder) {
        // get the frames from spritesheet using json data
        this.json = loadJSON(`${spriteFolder}/data.json`);
        if (this.json) {
            loadImage(`${spriteFolder}/sprite.png`, img => this.generateSpriteSheet(img, this.json));
        }
    }

    generateSpriteSheet(img, json) {
        this.sprite = img;
        json.frames.map(f => {
            const { x, y, w, h } = f.frame;
            const frame = img.get(x, y, w, h);
            this.frames.push(frame);
        });
        this.loaded = true;
    }

    draw(pos, angle, vel) {
        push();
        imageMode(CENTER);
        translate(pos.x, pos.y);
        rotate(angle);
        // flip depending on speed
        if (this.isFacingLeft) {
            scale(-1, 1);
        }

        const animationIndex = Math.abs(round(this.index)) % this.frames.length;
        if (this.loaded) image(this.frames[animationIndex], 0, 0);

        this.index += vel.x;
        pop();
    }
}