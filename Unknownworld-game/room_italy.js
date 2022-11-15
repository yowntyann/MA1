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

    this.load.image("beach", "assets/beach_tilesheet.png");
    this.load.image("trees", "assets/plant.png");
    this.load.image("signage", "assets/gather_signage_1.2.png");
    this.load.image("teleport", "assets/teleport-point.png");
    this.load.spritesheet('elle', 'assets/elle-sprite.png',
        { frameWidth: 64, frameHeight: 64 })
  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });

    let map = this.make.tilemap({key: "mainMap"})

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    //let streetTiles = map.addTilesetImage("Street32x32", "street");

    let beachTiles = map.addTilesetImage("beach tilesheet", "beach");
    let treesTiles = map.addTilesetImage("plant", "trees")
    let signageTiles = map.addTilesetImage("gather_signage_1.2", "signage")
    let teleportTiles = map.addTilesetImage("teleport", "teleport")

    // Step 5  create an array of tiles
    // let tilesArray = [
    //   buildingTiles,
    //   streetTiles,
    // ];

    let tilesArray = [beachTiles, treesTiles, signageTiles, teleportTiles]

    // Step 6  Load in layers by layers
    //this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);

    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0,0);
    this.treeLayer = map.createLayer("treeLayer", tilesArray, 0,0);
    this.signLayer = map.createLayer("signLayer", tilesArray, 0,0);
    this.alphabetLayer = map.createLayer("alphabetLayer", tilesArray, 0,0);

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

this.player = this.physics.add.sprite(300, 500, 'elle')


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

    this.physics.world.bounds.width = this.treeLayer.width;
    this.physics.world.bounds.height = this.treeLayer.height;

    this.treeLayer.setCollisionByExclusion(-1, true) 
    this.alphabetLayer.setCollisionByExclusion(-1, true) 
    this.physics.add.collider(this.treeLayer, this.player);
    this.physics.add.collider(this.alphabetLayer, this.player);

    this.player.setCollideWorldBounds(true);//don't go out of the this.map
   

    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    //this.cameras.main.startFollow(this.player);
    this.cameras.main.startFollow(this.player);
    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  } /////////////////// end of create //////////////////////////////

  update() {
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

} //////////// end of class world ////////////////////////
