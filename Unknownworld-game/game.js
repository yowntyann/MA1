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
    scene: [world, room_japan, room_malaysia, game]
};

var game = new Phaser.Game(config);