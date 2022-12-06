var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 30 * 30,
    height: 30 * 30,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [preload, showInventory, intro2, intro3, intro4, intro5, intro6, intro7, intro8, 
        world, room_japan, room_malaysia, room_malaysiaBoss, room_italy, gameFail, gameSuccess, game]
};

var game = new Phaser.Game(config);
window.heart = 5;
window.sushi = 0;
window.nasi = 0;
window.pizza = 0;