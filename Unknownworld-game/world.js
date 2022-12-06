class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });

    // Put global variable here
  }
  init(data) {
    this.player = data.player
  }

  preload() {
    // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");

    this.load.tilemapTiledJSON("mainMap", "assets/mainMap.tmj") 

    // Step 2 : Preload any images here
    //image load
    this.load.image("beach", "assets/beach_tilesheet.png");
    this.load.image("trees", "assets/plant.png");
    this.load.image("signage", "assets/gather_signage_1.2.png");
    this.load.image("teleport", "assets/teleport-point.png");
    this.load.image('heart', 'assets/heart.png')

    //audio load
    this.load.audio("worldbgm", "assets/world-bgm.mp3")
    this.load.audio("winbgm", "assets/gamesuccess.mp3")

    //character load
    this.load.spritesheet('elle', 'assets/elle-sprite.png',
        { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('tiki', 'assets/tiki-sprite.png',
        { frameWidth: 64, frameHeight: 64 })
  }

  create() {
    console.log("*** world scene");

    let map = this.make.tilemap({key: "mainMap"})

    // Call to update inventory
    this.time.addEvent({
      delay: 500,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
      });

    //music
    this.music = this.sound
    .add("worldbgm",{
        loop : true,
    })
    .setVolume(0.6);
    this.worldbgm = this.music;
    this.music.play();

    this.winSnd = this.sound.add("winbgm").setVolume(2)

    //tikiAnims
    this.anims.create({
      key:'tikiAnims',
      frames:this.anims.generateFrameNumbers('tiki', 
      { start:0, end:1 }),
      frameRate: 7,
      repeat: -1
    })

    //tiles
    let beachTiles = map.addTilesetImage("beach tilesheet", "beach");
    let treesTiles = map.addTilesetImage("plant", "trees")
    let signageTiles = map.addTilesetImage("gather_signage_1.2", "signage")
    let teleportTiles = map.addTilesetImage("teleport", "teleport")

    let tilesArray = [beachTiles, treesTiles, signageTiles, teleportTiles]

    //layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0,0);
    this.treeLayer = map.createLayer("treeLayer", tilesArray, 0,0);
    this.signLayer = map.createLayer("signLayer", tilesArray, 0,0);
    this.alphabetLayer = map.createLayer("alphabetLayer", tilesArray, 0,0);

    //add physic
    this.player = this.physics.add.sprite(707, 419, 'elle')
    this.tiki = this.physics.add.sprite(670, 230, 'tiki').setScale(1.5).play("tikiAnims")
    window.player = this.player;

    //object layer
    var start = map.findObject("objectLayer", (obj) => obj.name === "exitJapan");
    var start = map.findObject("objectLayer", (obj) => obj.name === "exitMalaysia");
    var start = map.findObject("objectLayer", (obj) => obj.name === "exitItaly");
    var win = map.findObject("objectLayer", (obj) => obj.name === "gameSuccess");

    // player size
    this.player.body.setSize(this.player.width*0.3, this.player.height*0.8)
    this.tiki.body.setSize(this.player.width*0.4, this.player.height*0.4)

    //collide
    this.physics.world.bounds.width = this.treeLayer.width;
    this.physics.world.bounds.height = this.treeLayer.height;
    this.treeLayer.setCollisionByExclusion(-1, true) ;
    this.alphabetLayer.setCollisionByExclusion(-1, true) ;
    this.physics.add.collider(this.treeLayer, this.player);
    this.physics.add.collider(this.alphabetLayer, this.player);

    this.player.setCollideWorldBounds(true);//don't go out of the this.map
   
     
    //camera
    this.cameras.main.startFollow(this.player);

    console.log("showInventory");
    //start another scene in parallel
    this.scene.launch("showInventory")
  } /////////////////// end of create //////////////////////////////

  update() {

    
    if (this.player.x > 953 && this.player.x < 969 && this.player.y < 313 && this.player.y > 262) {
      console.log("Jump to roomJapan")
      this.roomJapan();
    }

    if (this.player.x > 953 && this.player.x < 969 && this.player.y < 430 && this.player.y > 403) {
      console.log("Jump to roomMalaysia")
      this.roomMalaysia();
    }

    if (this.player.x > 953 && this.player.x < 969 && this.player.y < 553 && this.player.y > 516) {
      console.log("Jump to roomItaly")
      this.roomItaly();
    }

    if (this.player.x > 659 && this.player.x < 728 && this.player.y < 242 && this.player.y > 221) {
      console.log("Jump to gameSuccess")
      this.gameSuccess();
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

  roomJapan(player,tile){
    console.log("roomJapan function");
    this.scene.start("room_japan", {player: player});
    player = {};
    player.x = 906
    player.y = 290
    this.worldbgm.loop = false;
    this.worldbgm.stop();
  }

  roomMalaysia(player,tile){
    console.log("roomMalaysia function");
    this.scene.start("room_malaysia");
    this.worldbgm.loop = false;
    this.worldbgm.stop();
  }

  roomItaly(player,tile){
    console.log("roomItaly function");
    this.scene.start("room_italy");
    this.worldbgm.loop = false;
    this.worldbgm.stop();
  }

  gameSuccess(player,tile){
    console.log("roomWin function");
    this.scene.start("gameSuccess");
    this.worldbgm.loop = false;
    this.worldbgm.stop();
  }
} //////////// end of class world ////////////////////////
