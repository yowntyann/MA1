class room_japan extends Phaser.Scene {
  constructor() {
    super({
      key: "room_japan",
    });

    // Put global variable here
  }

  preload() {
    // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");

    this.load.tilemapTiledJSON("japanMap", "assets/japanMap2.tmj") 

    // Step 2 : Preload any images here
    //this.load.image("building", "assets/Buildings32x32.png");
    //this.load.image("street", "assets/Street32x32.png");

    this.load.image("japan", "assets/RuralJapan_Shadows_32x 32.png");
    this.load.image("teleport", "assets/teleport-point.png");

    //enemy load
    // this.load.image("witch", "assets/witch.png");

    this.load.spritesheet('elle', 'assets/elle-sprite.png',
        { frameWidth: 64, frameHeight: 64 })
  }

  create() {
    console.log("*** room_japan");

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });

    let map = this.make.tilemap({key: "japanMap"})

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    //let streetTiles = map.addTilesetImage("Street32x32", "street");

    let japanTiles = map.addTilesetImage("japan", "japan");
    let teleportTiles = map.addTilesetImage("teleport", "teleport")

    // Step 5  create an array of tiles
    // let tilesArray = [
    //   buildingTiles,
    //   streetTiles,
    // ];

    let tilesArray = [japanTiles, teleportTiles]

    // Step 6  Load in layers by layers
    //this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);

    this.jpgroundLayer = map.createLayer("jpgroundLayer", tilesArray, 0,0);
    this.jpwalkLayer = map.createLayer("jpwalkLayer", tilesArray, 0,0);
    this.jpteleportLayer = map.createLayer("jpteleportLayer", tilesArray, 0,0);
    this.jpbuildjectLayer = map.createLayer("jpbuildjectLayer", tilesArray, 0,0);
    this.jpwallLayer = map.createLayer("jpwallLayer", tilesArray, 0,0);

    // Add main player here with physics.add.sprite

    
    
    this.anims.create({
      key: 'left-elle',
      frames: this.anims.generateFrameNumbers('elle', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
    key: 'front-elle',
    frames: this.anims.generateFrameNumbers('elle', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
  key: 'back-elle',
  frames: this.anims.generateFrameNumbers('elle', { start: 6, end: 8 }),
  frameRate: 10,
  repeat: -1
});

this.anims.create({
  key: 'right-elle',
  frames: this.anims.generateFrameNumbers('elle', { start: 9, end: 11 }),
  frameRate: 10,
  repeat: -1
});

var start = map.findObject("jpobjectLayer", (obj) => obj.name === "jpstart");

this.player = this.physics.add.sprite(start.x, start.y, 'elle')
// this.witch = this.physics.add.sprite(400, 300, 'witch')
window.player = this.player;

// this.add.sprite(300, 500, 'elle').play('left-elle');
// this.add.sprite(400, 500, 'elle').play('front-elle');
// this.add.sprite(500, 500, 'elle').play('back-elle');
// this.add.sprite(600, 500, 'elle').play('right-elle');




    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // window.player=this.player;
    this.player.body.setSize(this.player.width*0.3, this.player.height*0.8)

    this.physics.world.bounds.width = this.jpwallLayer.width;
    this.physics.world.bounds.height = this.jpwallLayer.height;

    this.jpwallLayer.setCollisionByExclusion(-1, true) 
    this.jpbuildjectLayer.setCollisionByExclusion(-1, true) 
    this.physics.add.collider(this.jpbuildjectLayer, this.player);
    this.physics.add.collider(this.jpwallLayer, this.player);
    

    this.player.setCollideWorldBounds(true);//don't go out of the this.map
   
    // this.time.addEvent({
    //   delay: 0,
    //   callback: this.moveDownUp,
    //   callbackScope: this,
    //   loop: false,
    // });

    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    //this.cameras.main.startFollow(this.player);
    this.cameras.main.startFollow(this.player);
    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  } /////////////////// end of create //////////////////////////////

  update() {

    if (this.player.x > 214 && this.player.x < 240 && this.player.y < 262 && this.player.y > 217) {
      console.log("Jump back world")
      this.world();
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
 this.player.setVelocity(0)
}
  } /////////////////// end of update //////////////////////////////

  world(player,tile){
    console.log("world function");
    this.scene.start("world");
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
          y: 600,
        },
        {
          y: 300,
        },
      ],
    });
  }

} //////////// end of class world ////////////////////////
