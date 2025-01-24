class Chicken {
    constructor(game) {
        this.game = game;
        this.walkingLeft = new Animator(ASSET_MANAGER.getAsset("./chick_24x24.png"), 48, 0, 24, 24, 5, 0.4);
        this.walkingDown = new Animator(ASSET_MANAGER.getAsset("./chick_24x24.png"), 48, 24, 24, 24, 5, 0.2);
        this.walkingUp = new Animator(ASSET_MANAGER.getAsset("./chick_24x24.png"), 48, 48, 24, 24, 5, 0.2);
        this.eatingLeft = new Animator(ASSET_MANAGER.getAsset("./chick_24x24.png"), 0, 0, 24, 24, 2, 0.2);
        this.eatingDown = new Animator(ASSET_MANAGER.getAsset("./chick_24x24.png"), 0, 24, 24, 24, 2, 0.2);
        this.eatingUp = new Animator(ASSET_MANAGER.getAsset("./chick_24x24.png"), 0, 48, 24, 24, 2, 0.2);

        this.x = Math.random() * 1400 / 2; // Random x within canvas width
        this.y = Math.random() * 800 / 2;  // Random y within canvas height

        this.generateRandomDirection();
        
        this.speed = 20 + Math.random() * 80; // Speed between 20 and 100

        this.scale = 2;

        // Timing for random direction changes
        this.timeSinceLastChange = 0;
        this.changeInterval = this.getRandomInterval();
    };

    update() {
        this.x += this.dx * this.speed * this.game.clockTick;
        this.y += this.dy * this.speed * this.game.clockTick;

        if (this.x < 0 || this.x > 1400 / 2) this.dx *= -1;
        if (this.y < 0 || this.y > 780 / 2) this.dy *= -1;

        this.timeSinceLastChange += this.game.clockTick;

        // Change direction if the interval is exceeded
        if (this.timeSinceLastChange >= this.changeInterval) {
            this.generateRandomDirection(); // Generate a new random direction
            this.timeSinceLastChange = 0;  // Reset the timer
            this.changeInterval = this.getRandomInterval(); // Get a new random interval
        }
    };

    generateRandomDirection() {
        this.dx = Math.floor(Math.random() * 3) - 1; 
        this.dy = Math.floor(Math.random() * 3) - 1;
    }

    getRandomInterval() {
        return 1 + Math.random();
    }

    draw(ctx) {

        ctx.save();

        // Apply scaling
        ctx.translate(this.x, this.y); // Move to the chicken's position
        ctx.scale(this.scale, this.scale); // Scale by the factor

        if (this.dx < 0) { // Moving left
            this.walkingLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.dy < 0) { // Moving up
            this.walkingUp.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.dy > 0) { // Moving down
            this.walkingDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.dx > 0) { // Moving right
            ctx.save();
            ctx.translate(this.x + 24, this.y);
            ctx.scale(-1, 1);
            this.walkingLeft.drawFrame(this.game.clockTick, ctx, 0, 0);
            ctx.restore();
        } else { // Stationary
            if (this.lastDirection === "right") {
                ctx.save();
                ctx.translate(this.x + 24, this.y);
                ctx.scale(-1, 1);
                this.eatingLeft.drawFrame(this.game.clockTick, ctx, 0, 0);
                ctx.restore();
            } else if (this.lastDirection === "left") {
                this.eatingLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            } else if (this.lastDirection === "up") {
                this.eatingUp.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            } else if (this.lastDirection === "down") {
                this.eatingDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            }

        }
    
        // Track the last direction for eating animation
        if (this.dx > 0) {
            this.lastDirection = "right";
        } else if (this.dx < 0) {
            this.lastDirection = "left";
        } else if (this.dy > 0) {
            this.lastDirection = "down";
        } else if (this.dy < 0) {
            this.lastDirection = "up";
        }

        ctx.restore();

    }
}
