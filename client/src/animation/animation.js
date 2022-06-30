const spritesFolders = {
    COWBOY: "assets/animations/cowboy/",
    YELLOW: "assets/animations/yellow", // The yellow cowboy skin
}

class Animation {
    constructor(spriteFolder = spritesFolders.YELLOW, state = ANIMATION_STATE.WALK) {
        this.frames = {
            WALK: [],
            JUMP: [],
            PUNCH: [],
            SHOOT: [],
        };
        this.index = 0;
        // defines which character sprite to use
        this.spriteFolder = spriteFolder;
        this.frameCount = 0; // used to reset animation for punch, shoot, etc

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
    
    // play an animation animationState a with certain amount of repeat
    play(animationState, times) {
        const animation = this.getAnimationFramesByKey(animationState);

        if (animation) {
            this.state = animationState;
            this.index = 0;
            const frameAmount = animation.length * times; // for how many frames should the animation play
            this.frameCount = frameAmount;
        }
    }

    generateSpriteSheet(img, json, animationKey) {
        json.frames.map(f => {
            const { x, y, w, h } = f.frame;
            const frame = img.get(x, y, w, h);
            this.frames[animationKey].push(frame);
        });
    }

    getAnimationFramesByKey(key) {
        return this.frames[key.toUpperCase()];
    }

    getAnimationSpeedByKey(key) {
        return ANIMATION_SPEEDS[key.toUpperCase()] || 0;
    }

    getCurrentFrame() {
        const currentAnimation = this.getAnimationFramesByKey(this.state || ANIMATION_STATE.WALK);
        if (!currentAnimation) return;
        const animationIndex = Math.abs(round(this.index)) % currentAnimation.length;

        return currentAnimation[animationIndex];
    }
    
    // update the animation according to player
    update(isSteppingGround) {
        if (this.frameCount <= 0) {
            this.state = isSteppingGround ? ANIMATION_STATE.WALK : ANIMATION_STATE.JUMP;
        } else this.frameCount--;

        this.speed = this.getAnimationSpeedByKey(this.state);
    }

    draw(pos, angle, vel) {
        push();
        imageMode(CENTER);
        translate(pos.x, pos.y);
        rotate(angle);
        const frame = this.getCurrentFrame();
        if (this.isFacingLeft) scale(-1, 1);
        frame && image(frame, 0, 0);
        
        pop();
        this.speed = this.state == ANIMATION_STATE.WALK ? map(vel.x, -10, 10, -1, 1) : this.speed;
        this.index += this.speed;
    }
}