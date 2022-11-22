class room_italy extends Phaser.Scene {
  constructor() {
    super({
      key: "room_italy",
    });

    // Put global variable here
  }

  preload() {
    // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");

    this.load.tilemapTiledJSON("italyMap", "assets/italyMap.tmj") 

    // Step 2 : Preload any images here
    //this.load.image("building", "assets/Buildings32x32.png");
    //this.load.image("street", "assets/Street32x32.png");

    this.load.image("atlas", "assets/misc_atlas.png");
    this.load.image("atlas2", "assets/build_atlas.png");
    this.load.image("magecity", "assets/magecity.png");
    this.load.image("pipoya", "assets/pipoya.png");
    this.load.image("teleport-point", "assets/teleport-point.png");
    this.load.spritesheet('elle', 'assets/elle-sprite.png',
        { frameWidth: 64, frameHeight: 64 })
  }

  create() {
    console.log("*** room_italy");

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });

    let map = this.make.tilemap({key: "italyMap"})

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    //let streetTiles = map.addTilesetImage("Street32x32", "street");

    let atlasTiles = map.addTilesetImage("atlas", "atlas");
    let atlas2Tiles = map.addTilesetImage("atlas2", "atlas2")
    let magecityTiles = map.addTilesetImage("magecity", "magecity")
    let pipoyaTiles = map.addTilesetImage("pipoya", "pipoya")
    let teleportTiles = map.addTilesetImage("teleport-point", "teleport-point")

    // Step 5  create an array of tiles
    // let tilesArray = [
    //   buildingTiles,
    //   streetTiles,
    // ];

    let tilesArray = [atlasTiles, atlas2Tiles, magecityTiles, pipoyaTiles, teleportTiles]

    // Step 6  Load in layers by layers
    //this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);

    this.itgroundLayer = map.createLayer("itgroundLayer", tilesArray, 0,0);
    this.itwalkLayer = map.createLayer("itwalkLayer", tilesArray, 0,0);
    this.itbuildjectLayer = map.createLayer("itbuildjectLayer", tilesArray, 0,0);
    this.itbuildject2Layer = map.createLayer("itbuildject2Layer", tilesArray, 0,0);

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

var start = map.findObject("itobjectLayer", (obj) => obj.name === "itstart");

this.player = this.physics.add.sprite(start.x, start.y, 'elle')
window.player = this.player


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

    this.physics.world.bounds.width = this.itgroundLayer.width;
    this.physics.world.bounds.height = this.itgroundLayer.height;

    this.itbuildjectLayer.setCollisionByExclusion(-1, true) 
    this.itbuildject2Layer.setCollisionByExclusion(-1, true) 
    this.physics.add.collider(this.itbuildjectLayer, this.player);
    this.physics.add.collider(this.itbuildject2Layer, this.player);

    this.player.setCollideWorldBounds(true);//don't go out of the this.map
   

    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    //this.cameras.main.startFollow(this.player);
    this.cameras.main.startFollow(this.player);
    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  } /////////////////// end of create //////////////////////////////

  update() {

    if (this.player.x > 569 && this.player.x < 598 && this.player.y < 38 && this.player.y > 25) {
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
} //////////// end of class world ////////////////////////
