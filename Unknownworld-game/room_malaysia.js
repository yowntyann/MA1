class room_malaysia extends Phaser.Scene {
  constructor() {
    super({
      key: "room_malaysia",
    });

    // Put global variable here
  }

  preload() {
    // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");

    this.load.tilemapTiledJSON("malaysiaMap", "assets/malaysiaMap2.tmj") 

    // Step 2 : Preload any images here
    //image load
    this.load.image("city", "assets/City-01.png");
    this.load.image("myplants", "assets/plant.png");
    this.load.image("tuxmon-32x32", "assets/tuxmon-32x32.png");
    this.load.image("teleport", "assets/teleport-point.png");

    //audio load
    this.load.audio("mybgm", "assets/malaysia-map.mp3")
    this.load.audio("collect", "assets/item-collect.mp3")
    this.load.audio("gamefail", "assets/failure.mp3")

    //collect load
    this.load.spritesheet('nasi', 'assets/nasi-sprite.png',
    { frameWidth: 64, frameHeight: 64 })

    //enemy load
    this.load.image("witch", "assets/witch.png");
    this.load.spritesheet('slime', 'assets/slime-sprite.png',
    { frameWidth: 64, frameHeight: 64 })
  }

  create() {
    console.log("*** room_malaysia");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key: "malaysiaMap"})

    // Call to update inventory
    this.time.addEvent({
      delay: 500,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
      });

    //sound load
    this.music = this.sound
    .add("mybgm",{
        loop : true,
    })
    .setVolume(0.3);
    this.mybgm = this.music;
    this.music.play();

    this.failSnd = this.sound.add('gamefail').setVolume(0.4)
    this.hitSnd = this.sound.add('gamefail').setVolume(0.4)
    this.nasiSnd = this.sound.add('collect').setVolume(0.1)

    // Step 4 Load the game tiles
    let cityTiles = map.addTilesetImage("city", "city");
    let plantsTiles = map.addTilesetImage("myplants", "myplants")
    let tuxmonTiles = map.addTilesetImage("tuxmon-32x32", "tuxmon-32x32")
    let teleportTiles = map.addTilesetImage("teleport", "teleport")

    // Step 5  create an array of tiles
    let tilesArray = [cityTiles, plantsTiles, tuxmonTiles, teleportTiles]

    // Step 6  Load in layers by layer
    this.mygroundLayer = map.createLayer("mygroundLayer", tilesArray, 0,0);
    this.mywalkLayer = map.createLayer("mywalkLayer", tilesArray, 0,0);
    this.mybuildjectLayer = map.createLayer("mybuildjectLayer", tilesArray, 0,0);
    this.mybuildject2Layer = map.createLayer("mybuildject2Layer", tilesArray, 0,0);

    //nasiAnim
    this.anims.create({
      key:'nasiAnims',
      frames:this.anims.generateFrameNumbers('nasi', 
      { start:0, end:1 }),
      frameRate: 7,
      repeat: -1
    })
    //nasiGroup
    this.nasiGroup=this.physics.add.group()

    var nasi1 = map.findObject("mycollectLayer",  (obj) => obj.name === "nasi1");
    this.nasiGroup.create(nasi1.x, nasi1.y,"nasi1").play("nasiAnims");

    var nasi2 = map.findObject("mycollectLayer",  (obj) => obj.name === "nasi2");
    this.nasiGroup.create(nasi2.x, nasi2.y,"nasi2").play("nasiAnims");

    var nasi3 = map.findObject("mycollectLayer",  (obj) => obj.name === "nasi3");
    this.nasiGroup.create(nasi3.x, nasi3.y,"nasi3").play("nasiAnims");

    var nasi4 = map.findObject("mycollectLayer",  (obj) => obj.name === "nasi4");
    this.nasiGroup.create(nasi4.x, nasi4.y,"nasi4").play("nasiAnims");

    var nasi5 = map.findObject("mycollectLayer",  (obj) => obj.name === "nasi5");
    this.nasiGroup.create(nasi5.x, nasi5.y,"nasi5").play("nasiAnims");

    var nasi6 = map.findObject("mycollectLayer",  (obj) => obj.name === "nasi6");
    this.nasiGroup.create(nasi6.x, nasi6.y,"nasi6").play("nasiAnims");

    var nasi7 = map.findObject("mycollectLayer",  (obj) => obj.name === "nasi7");
    this.nasiGroup.create(nasi7.x, nasi7.y,"nasi7").play("nasiAnims");

    var nasi8 = map.findObject("mycollectLayer",  (obj) => obj.name === "nasi8");
    this.nasiGroup.create(nasi8.x, nasi8.y,"nasi8").play("nasiAnims"); 

    //teleport obj
    var start = map.findObject("myobjectLayer", (obj) => obj.name === "mystart");
    var start1 = map.findObject("mybossObjectLayer", (obj) => obj.name === "exitMalaysiaboss");

    //physic add
    this.player = this.physics.add.sprite(start.x, start.y, 'elle')
    this.witch = this.physics.add.image(100, 1055, 'witch')
    this.witch2 = this.physics.add.image(215, 330, 'witch')
    this.witch3 = this.physics.add.image(787, 270, 'witch')
    this.slime = this.physics.add.sprite(630, 1000, 'slime')
    this.slime2 = this.physics.add.sprite(1200, 1000, 'slime')
    this.slime3 = this.physics.add.sprite(1330, 774, 'slime')
    this.slime4 = this.physics.add.sprite(1360, 587, 'slime')

    //overlap
    this.physics.add.overlap(
    this.player, 
    this.nasiGroup,
    this.collectNasi,
    null, 
    this
    );

    this.physics.add.overlap(
      this.player,
      [this.slime, this.slime2, this.slime3, this.slime4], 
      slimeHit,
      null, 
      this
      );

      this.physics.add.overlap(
        this.player,
        [this.witch, this.witch2, this.witch3], 
        witchHit,
        null, 
        this
        );

    //movement event
    this.time.addEvent({
      delay: 0,
      callback: this.moveRightLeft,
      callbackScope: this,
      loop: false,
      });
    
      this.time.addEvent({
        delay: 1000,
        callback: this.moveRightLeft2,
        callbackScope: this,
        loop: false,
        });

        this.time.addEvent({
          delay: 1000,
          callback: this.moveRightLeft3,
          callbackScope: this,
          loop: false,
          });

          this.time.addEvent({
            delay: 1000,
            callback: this.moveRightLeft4,
            callbackScope: this,
            loop: false,
            });
      
        this.time.addEvent({
          delay: 0,
          callback: this.moveDownUp,
          callbackScope: this,
          loop: false,
          });

          this.time.addEvent({
            delay: 0,
            callback: this.moveDownUp2,
            callbackScope: this,
            loop: false,
            });

            this.time.addEvent({
              delay: 0,
              callback: this.moveDownUp3,
              callbackScope: this,
              loop: false,
              });

    window.player = this.player

    //frame size
    this.player.body.setSize(this.player.width*0.3, this.player.height*0.8)
    this.witch.body.setSize(this.witch.width*0.5, this.witch.height*0.8)
    this.witch2.body.setSize(this.witch2.width*0.5, this.witch2.height*0.8)
    this.witch3.body.setSize(this.witch3.width*0.5, this.witch3.height*0.8)
    this.slime.body.setSize(this.slime.width*0.6, this.slime.height*0.8)
    this.slime2.body.setSize(this.slime2.width*0.6, this.slime2.height*0.8)
    this.slime3.body.setSize(this.slime3.width*0.6, this.slime3.height*0.8)
    this.slime4.body.setSize(this.slime3.width*0.6, this.slime3.height*0.8)


    //collide
    this.physics.world.bounds.width = this.mygroundLayer.width;
    this.physics.world.bounds.height = this.mygroundLayer.height;
    this.mybuildjectLayer.setCollisionByExclusion(-1, true) 
    this.mybuildject2Layer.setCollisionByExclusion(-1, true) 
    this.physics.add.collider(this.mybuildjectLayer, this.player);
    this.physics.add.collider(this.mybuildject2Layer, this.player);

    this.player.setCollideWorldBounds(true);//don't go out of the this.map
   
    //camera
    this.cameras.main.startFollow(this.player);
    
    console.log("showInventory");
    //start another scene in parallel
    this.scene.launch("showInventory")

  } /////////////////// end of create //////////////////////////////

  update() {

    if (this.player.x > 499 && this.player.x < 531 && this.player.y < 1070 && this.player.y > 1051) {
      console.log("Jump back world")
      this.world();
    }

    if (this.player.x > 1045 && this.player.x < 1074 && this.player.y < 162 && this.player.y > 149) {
      console.log("Jump to malaysiaBoss")
      this.roomMalaysiaboss();
    }

    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.left.isDown)
    {
    this.player.setVelocityX(-160);
    this.player.anims.play('left-elle', true);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.setVelocityX(160);
      this.player.anims.play('right-elle', true);
    }
    else if (this.cursors.up.isDown)
    {
      this.player.setVelocityY(-160);
      this.player.anims.play('back-elle', true);
    }
    else if (this.cursors.down.isDown)
    {
      this.player.setVelocityY(160);
      this.player.anims.play('front-elle', true)
    }
    else
    {
      this.player.anims.stop();
    this.player.setVelocity(0)
    }
      } /////////////////// end of update //////////////////////////////
  world(player,tile){
    console.log("world function");
    this.scene.start("world");
    this.mybgm.loop = false;
    this.mybgm.stop();
  }

  roomMalaysiaboss(player,tile){
    console.log("roomMalaysiaboss function");
    this.scene.start("room_malaysiaBoss");
    this.mybgm.loop = false;
    this.mybgm.stop();
  }

  moveRightLeft() {
    console.log("moveRightLeft");
    this.tweens.timeline({
      targets: this.slime,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 2500,
      tweens: [
        {
          x: 350,
        },
        {
          x: 630,
        },
      ],
    });
  }

  moveRightLeft2() {
    console.log("moveRightLeft");
    this.tweens.timeline({
      targets: this.slime2,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 2500,
      tweens: [
        {
          x: 950,
        },
        {
          x: 1200,
        },
      ],
    });
  }

  moveRightLeft3() {
    console.log("moveRightLeft");
    this.tweens.timeline({
      targets: this.slime3,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 2500,
      tweens: [
        {
          x: 925,
        },
        {
          x: 1330,
        },
      ],
    });
  }

  moveRightLeft4() {
    console.log("moveRightLeft4");
    this.tweens.timeline({
      targets: this.slime4,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 2500,
      tweens: [
        {
          x: 826,
        },
        {
          x: 1360,
        },
      ],
    });
  }

  moveDownUp() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.witch,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 3000,
      tweens: [
        {
          y: 725,
        },
        {
          y: 1055,
        },
      ],
    });
  }

  moveDownUp2() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.witch2,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 3000,
      tweens: [
        {
          y: 42,
        },
        {
          y: 330,
        },
      ],
    });
  }

  moveDownUp3() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.witch3,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 3000,
      tweens: [
        {
          y: 60,
        },
        {
          y: 270,
        },
      ],
    });
  }

  collectNasi(player,nasi){
    console.log("nasi overlap player")
    this.nasiSnd.play();
    nasi.disableBody(true,true);

    window.nasi++;
    updateInventory.call(this)
  }
} //////////// end of class world ////////////////////////
