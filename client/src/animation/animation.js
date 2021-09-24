const spritesFolders = {
    COWBOY: "assets/animations/cowboy/"
}

class Animation {
    constructor(spriteFolder = spritesFolders.COWBOY, state = ANIMATION_STATE.WALK) {
        this.frames = {
            WALK: [],
            JUMP: []
        };
        this.index = 0;
        // defines which character sprite to use
        this.spriteFolder = spriteFolder;
        
        this.loaded = false;
        this.speed = 0.4;
        this.state = state;
        this.isFacingLeft = false;

        this.loadSprite(spriteFolder);
    }
    
    async loadSprite(spriteFolder) {
        Object.keys(ANIMATION_STATE).map(key => {
            const animationLabel = ANIMATION_STATE[key];
            // get the frames from spritesheet using json data
            loadJSON(`${spriteFolder}/${animationLabel}.json`, json => {
                // load image once we have json data
                loadImage(`${spriteFolder}/${animationLabel}.png`, img => this.generateSpriteSheet(img, json, key));
            });
        });
    }
    
    generateSpriteSheet(img, json, animationKey) {
        json.frames.map(f => {
            const { x, y, w, h } = f.frame;
            const frame = img.get(x, y, w, h);
            this.frames[animationKey].push(frame);
        });
        this.loaded = true;
    }

    getCurrentFrame() {
        const currentAnimation = this.frames[this.state.toUpperCase()];
        if (!currentAnimation) return;
        const animationIndex = Math.abs(round(this.index)) % currentAnimation.length;

        return currentAnimation[animationIndex];
    }
    
    // update the animation according to player
    update(isSteppingGround) {
        this.state = isSteppingGround ? ANIMATION_STATE.WALK : ANIMATION_STATE.JUMP;
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
            frame && image(frame, 0, 0);
        }
        
        pop();
        this.speed = vel.x || 0
        this.index += this.speed;
    }
}