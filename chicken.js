class Chicken {
    constructor(game) {
        this.game = game;
        this.walkingLeft = new Animator(ASSET_MANAGER.getAsset("./chick_24x24.png"), 48, 0, 24, 24, 5, 0.4);
        this.walkingDown = new Animator(ASSET_MANAGER.getAsset("./chick_24x24.png"), 48, 24, 24, 24, 5, 0.2);
        this.walkingUp = new Animator(ASSET_MANAGER.getAsset("./chick_24x24.png"), 48, 48, 24, 24, 5, 0.2);
        this.eatingLeft = new Animator(ASSET_MANAGER.getAsset("./chick_24x24.png"), 0, 0, 24, 24, 2, 0.2);
        this.eatingDown = new Animator(ASSET_MANAGER.getAsset("./chick_24x24.png"), 0, 24, 24, 24, 2, 0.2);
        this.eatingUp = new Animator(ASSET_MANAGER.getAsset("./chick_24x24.png"), 0, 48, 24, 24, 2, 0.2);

        this.x = 1000;
        this.y = 384;
        this.speed = 50;
    };

    update() {
        this.x -= this.speed * this.game.clockTick;
    };

    draw(ctx) { 
        this.walkingLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };
}
