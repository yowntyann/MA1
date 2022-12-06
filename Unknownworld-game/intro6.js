class intro6 extends Phaser.Scene {

    constructor() {
        super({
            key: 'intro6'
        });

        // Put global variable here
    }

    preload() {

        // this.load.tilemapTiledJSON("mainMap", "assets/mainMap.tmj") 
        // Preload all the assets here

        // Preload any images here
        this.load.image('intro6', 'assets/intro6-game.png')

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    }

    create() {

        console.log('*** intro6');

        this.add.sprite(450,450,"intro6").setScale(0.48)
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
            console.log('Jump to intro7 scene');

            this.scene.start('intro7',
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