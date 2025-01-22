class Chicken {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./chick_24x24.png"), 0, 0, 24, 24, 7, 0.2);

        this.x = 0;
        this.y = 0;
        this.speed = 100;
    };

    update() {
        this.x += this.speed * this.game.clockTick;
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };
}
