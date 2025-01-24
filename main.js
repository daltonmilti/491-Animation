const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./chick_24x24.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	const chickenCount = 100; // Number of chickens to spawn
    for (let i = 0; i < chickenCount; i++) {
        const chicken = new Chicken(gameEngine); // Create a new chicken instance
        gameEngine.addEntity(chicken); // Add chicken to the game engine
    }

	gameEngine.init(ctx);

	gameEngine.start();
});
