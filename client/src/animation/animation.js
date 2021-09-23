const spritesFolders = {
    COWBOY: "assets/animations/cowboy/"
}

class Animation {
    constructor(spriteFolder = spritesFolders.COWBOY, state = ANIMATION_STATE.WALK) {
        this.frames = [];
        this.index = 0;
        // defines which character sprite to use
        this.spriteFolder = spriteFolder;
        
        this.loaded = false;
        this.json = undefined;
        this.speed = 0.4;
        this.state = state;
        this.isFacingLeft = false;

        this.loadSprite(spriteFolder);
    }
    
    async loadSprite(spriteFolder) {
        // get the frames from spritesheet using json data
        loadJSON(`${spriteFolder}/data.json`, json => {
            this.json = json;
            // load image once we have json data
            loadImage(`${spriteFolder}/sprite.png`, img => this.generateSpriteSheet(img, this.json));
        });
    }
    
    generateSpriteSheet(img, json) {
        this.sprite = img;
        console.log('loading', json);
        json.frames.map(f => {
            const { x, y, w, h } = f.frame;
            const frame = img.get(x, y, w, h);
            this.frames.push(frame);
        });
        this.loaded = true;
    }

    getCurrentFrame() {
        const animationIndex = Math.abs(round(this.index)) % this.frames.length;

        return this.frames[animationIndex];
    }
    
    draw(pos, angle, vel) {
        push();
        imageMode(CENTER);
        translate(pos.x, pos.y);
        rotate(angle);
        // flip depending on speed
        
        if (this.loaded) {
            const frame = this.getCurrentFrame();
            if (this.isFacingLeft) scale(-1, 1);
            image(frame, 0, 0);
        }
        
        pop();
        this.index += vel.x;
    }
}