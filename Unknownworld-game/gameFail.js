class gameFail extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameFail'
        });

        // Put global variable here
    }

    preload() {

        // this.load.tilemapTiledJSON("mainMap", "assets/mainMap.tmj") 
        // Preload all the assets here

        // Preload any images here
        this.load.image("failScene", "assets/gamefail.png")
        

        // Preload any sound and music here
        this.load.audio("gamefail", "assets/failure.mp3")
       
    }

    create() {

        console.log('Game Fail');

        this.add.image(450,450,"failScene").setScale(0.48)
        this.failSnd = this.sound.add('gamefail').setVolume(0.4)
    

        //reload 3 hearts 
        window.heart = 5;
        window.sushi = 0;
        window.nasi = 0;
        window.pizza = 0;

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Restart to world scene');
           

            this.scene.start('world',
                // Optional parameters
                {

                }
            );
            
        }, this);

        

        // start another scene in parallel
        this.scene.stop("showInventory"), gameFail

      // Create all the game animations here

    }
    gameFail(player, [slime, witch]){
        console.log("gameFail function");
        this.scene.start("world");
        this.japanbgm.loop = false;
        this.japanbgm.stop();
        this.mybgm.loop = false;
        this.mybgm.stop();
        this.bossbgm.loop = false;
        this.bossbgm.stop();
        this.italybgm.loop = false;
        this.italybgm.stop();
      }

}