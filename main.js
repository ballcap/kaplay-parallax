const k = kaplay({
    width: 1024,
    height: 1024,
    letterbox: true,
});

k.loadSprite("sky", "assets/sky.png");
k.loadSprite("sun", "assets/sun.png");
k.loadSprite("mountain", "assets/mountain.png");
k.loadSprite("green_trees", "assets/green_trees.png");

const layers = [
    { name: "sky", speed: 10 },
    { name: "sun", speed: 20 },
    { name: "mountain", speed: 80 },
    { name: "green_trees", speed: 500 },
];

// This MUST match the actual width of your images (1024)
const IMG_WIDTH = 1024;

layers.forEach((layer) => {
    for (let i = 0; i < 2; i++) {
        k.add([
            k.sprite(layer.name),
            // Place first at 0, second at 1024
            k.pos(i * IMG_WIDTH, 0),
            "bg_layer",
            { speed: layer.speed }
        ]);
    }
});

k.onUpdate("bg_layer", (obj) => {
    // move() uses pixels per second
    obj.move(-obj.speed, 0);

    // If it moves past -1024, wrap it back
    if (obj.pos.x <= -IMG_WIDTH) {
        // Move it to the back of the other image (exactly 1024px away)
        obj.pos.x += IMG_WIDTH * 2;
    }
});