class intro4 extends Phaser.Scene {

    constructor() {
        super({
            key: 'intro4'
        });

        // Put global variable here
    }

    preload() {

        // this.load.tilemapTiledJSON("mainMap", "assets/mainMap.tmj") 
        // Preload all the assets here

        // Preload any images here
        this.load.image('intro4', 'assets/intro4-game.png')

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    }

    create() {

        console.log('*** intro4');

        this.add.sprite(450,450,"intro4").setScale(0.48)
        // Add any sound and music here
        // ( 0 = mute to 1 is loudest )
        //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

        //this.music.play()
        //window.music = this.music


        // Add image and detect spacebar keypress
        //this.add.image(0, 0, 'main').setOrigin(0, 0);

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to intro5 scene');

            this.scene.start('intro5',
                // Optional parameters
                {

                }
            );
        }, this);


        // Add any text in the main page
        // this.add.text(90, 600, 'Press spacebar to continue', {
        //     font: '30px Courier',
        //     fill: '#FFFFFF'
        // });


        // Create all the game animations here

    }


}