class gameSuccess extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameSuccess'
        });

        // Put global variable here
    }

    preload() {

        // this.load.tilemapTiledJSON("mainMap", "assets/mainMap.tmj") 
        // Preload all the assets here

        // Preload any images here
        this.load.image("gamesuccess", 'assets/gameSuccess.png')
        this.load.audio("winbgm", "assets/gamesuccess.mp3")

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    }

    create() {

        console.log('Game Win');

        this.add.image(450,450,"gamesuccess").setScale(0.48);
        this.winSnd = this.sound.add("winbgm").setVolume(2)
       

        // this.music = this.sound
        // .add("winbgm",{
        // loop : true,
        // })
        // .setVolume(0.4);
        // this.winbgm = this.music;
        // this.music.play();
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
            console.log('Back to world scene');

            this.scene.start('world',
                // Optional parameters
                {

                }
            );
            this.japanbgm.loop = false;
            this.japanbgm.stop();
            this.mybgm.loop = false;
            this.mybgm.stop();
            this.bossbgm.loop = false;
            this.bossbgm.stop();
            this.italybgm.loop = false;
            this.italybgm.stop();
        }, this);

        // start another scene in parallel
        this.scene.stop("showInventory")

        // Add any text in the main page
        // this.add.text(90, 600, 'Press spacebar to continue', {
        //     font: '30px Courier',
        //     fill: '#FFFFFF'
        // });


        // Create all the game animations here

    }


}