class room_malaysiaBoss extends Phaser.Scene {
  constructor() {
    super({
      key: "room_malaysiaBoss",
    });

    // Put global variable here
  }

  preload() {
    // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");

    this.load.tilemapTiledJSON("malaysiabossMap", "assets/malaysiabossMap.tmj") 

    // Step 2 : Preload any images here

    this.load.image("bossplant", "assets/plant.png");
    this.load.image("pipoya", "assets/pipoya.png");
    this.load.image("tuxmon", "assets/tuxmon-32x32.png");
    this.load.spritesheet('elle', 'assets/elle-sprite.png',
        { frameWidth: 64, frameHeight: 64 })

    //audio load
    this.load.audio("bossbgm", "assets/boss-theme.mp3")
    this.load.audio("collect", "assets/item-collect.mp3")
    this.load.audio("gamefail", "assets/failure.mp3")
   
    //boss load
    this.load.spritesheet('boss', 'assets/boss-sprite.png',
    { frameWidth: 64, frameHeight: 64 })

    //collect load
    this.load.spritesheet('nasi', 'assets/nasi-sprite.png',
    { frameWidth: 64, frameHeight: 64 })
  }

  create() {
    console.log("*** room_malaysiaBoss");

    // Call to update inventory
    this.time.addEvent({
      delay: 500,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
      });

    this.music = this.sound
    .add("bossbgm",{
        loop : true,
    })
    .setVolume(0.3);
    this.bossbgm = this.music;
    this.music.play();

    this.failSnd = this.sound.add('gamefail').setVolume(0.4)
    this.hitSnd = this.sound.add('gamefail').setVolume(0.4)
    this.nasiSnd = this.sound.add('collect').setVolume(0.1)

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key: "malaysiabossMap"})

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let plantsTiles = map.addTilesetImage("bossplant", "bossplant")
    let pipoyaTiles = map.addTilesetImage("pipoya", "pipoya")
    let tuxmonTiles = map.addTilesetImage("tuxmon", "tuxmon")

    // Step 5  create an array of tiles
    let tilesArray = [plantsTiles, pipoyaTiles, tuxmonTiles]

    // Step 6  Load in layers by layers
    this.mybossgroundLayer = map.createLayer("mybossgroundLayer", tilesArray, 0,0);
    this.mybosswalkLayer = map.createLayer("mybosswalkLayer", tilesArray, 0,0);
    this.mybossobject2Layer = map.createLayer("mybossobject2Layer", tilesArray, 0,0);
    this.mybossobjectLayer = map.createLayer("mybossobjectLayer", tilesArray, 0,0);

    
    //bossAnims
    // this.anims.create({
    // key: 'left-boss',
    // frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 2 }),
    // frameRate: 10,
    // repeat: -1
    // });

    this.anims.create({
    key: 'bossAnims',
    frames: this.anims.generateFrameNumbers('boss', { start: 3, end: 3 }),
    frameRate: 10,
    repeat: -1
    });

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

    var nasi9 = map.findObject("bosscollectLayer",  (obj) => obj.name === "nasi9");
    this.nasiGroup.create(nasi9.x, nasi9.y,"nasi9").play("nasiAnims");

    var nasi10 = map.findObject("bosscollectLayer",  (obj) => obj.name === "nasi10");
    this.nasiGroup.create(nasi10.x, nasi10.y,"nasi10").play("nasiAnims");

    //start point
    var startmyBoss = map.findObject("mybossObjectLayer", (obj) => obj.name === "startmyBoss");

    //physic add
    this.player = this.physics.add.sprite(startmyBoss.x, startmyBoss.y, 'elle')
    this.boss = this.physics.add.sprite(700, 300, 'boss').play("bossAnims").setScale(3)
    this.boss2 = this.physics.add.sprite(377, 579, 'boss').play("bossAnims").setScale(3)
    this.boss3 = this.physics.add.sprite(886, 579, 'boss').play("bossAnims").setScale(3)

    window.player = this.player

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
      [this.boss, this.boss2, this.boss3], 
      bossHit,
      null, 
      this
      );

    //movement event
    this.time.addEvent({
      delay: 1000,
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
          delay: 2000,
          callback: this.moveRightLeft3,
          callbackScope: this,
          loop: false,
          });

    // collide
    this.player.body.setSize(this.player.width*0.3, this.player.height*0.8)
    this.boss.body.setSize(this.player.width*0.3, this.player.height*0.8)
    this.boss2.body.setSize(this.player.width*0.3, this.player.height*0.8)
    this.boss3.body.setSize(this.player.width*0.3, this.player.height*0.8)

    this.physics.world.bounds.width = this.mybossgroundLayer.width;
    this.physics.world.bounds.height = this.mybossgroundLayer.height;

    this.mybossobjectLayer.setCollisionByExclusion(-1, true) 
    this.mybossobject2Layer.setCollisionByExclusion(-1, true) 
    this.physics.add.collider(this.mybossobjectLayer, this.player);
    this.physics.add.collider(this.mybossobject2Layer, this.player);

    this.player.setCollideWorldBounds(true);//don't go out of the this.map
   

    //camera
    this.cameras.main.startFollow(this.player);
    
    console.log("showInventory");
    //start another scene in parallel
    this.scene.launch("showInventory")
  } /////////////////// end of create //////////////////////////////

  update() {

    if (this.player.x > 393 && this.player.x < 420 && this.player.y < 893 && this.player.y > 885) {
      console.log("Jump back roomMalaysia")
      this.roomMalaysia();
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
  roomMalaysia(player,tile){
    console.log("roomMalaysia function");
    this.scene.start("room_malaysia");
    this.bossbgm.loop = false;
    this.bossbgm.stop();
  }

  moveRightLeft() {
    console.log("moveRightLeft");
    this.tweens.timeline({
      targets: this.boss,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 3000,
      tweens: [
        {
          x: 300,
        },
        {
          x: 700,
        },
      ],
    });
  }

  moveRightLeft2() {
    console.log("moveRightLeft2");
    this.tweens.timeline({
      targets: this.boss2,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 3000,
      tweens: [
        {
          x: 148,
        },
        {
          x: 377,
        },
      ],
    });
  }

  moveRightLeft3() {
    console.log("moveRightLeft3");
    this.tweens.timeline({
      targets: this.boss3,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 3000,
      tweens: [
        {
          x: 600,
        },
        {
          x: 886,
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
