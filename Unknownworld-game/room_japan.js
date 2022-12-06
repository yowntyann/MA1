class room_japan extends Phaser.Scene {
  constructor() {
    super({
      key: "room_japan",
    });

    // Put global variable here
  }

  preload() {

    this.load.tilemapTiledJSON("japanMap", "assets/japanMap2.tmj") 

    //image load
    this.load.image("japan", "assets/RuralJapan_Shadows_32x 32.png");
    this.load.image("teleport", "assets/teleport-point.png");
    this.load.image('heart', 'assets/heart.png')

    //object load
    this.load.spritesheet('sushi', 'assets/sushi-sprite.png',
    { frameWidth: 64, frameHeight: 64 })

    //audio load
    this.load.audio("japanbgm", "assets/japan-map.mp3")
    this.load.audio("collect", "assets/item-collect.mp3")
    this.load.audio("enemyHit", "assets/enemy-hit.mp3")
    this.load.audio("gamefail", "assets/failure.mp3")

    //enemy load
    this.load.image("witch", "assets/witch.png");
    this.load.spritesheet('slime', 'assets/slime-sprite.png',
    { frameWidth: 64, frameHeight: 64 })

  }

  create() {
    console.log("*** room_japan");

    let map = this.make.tilemap({key: "japanMap"})

    // Call to update inventory
    this.time.addEvent({
      delay: 500,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
      });

    
    //sound
    this.music = this.sound
    .add("japanbgm",{
        loop : true,
    })
    .setVolume(0.4);
    this.japanbgm = this.music;
    this.music.play();

    this.sushiSnd = this.sound.add('collect').setVolume(0.1)
    this.hitSnd = this.sound.add('enemyHit').setVolume(0.4)
    this.failSnd = this.sound.add('gamefail').setVolume(0.4)

    // tiles
    let japanTiles = map.addTilesetImage("japan", "japan");
    let teleportTiles = map.addTilesetImage("teleport", "teleport")

    let tilesArray = [japanTiles, teleportTiles]

    //layers
    this.jpgroundLayer = map.createLayer("jpgroundLayer", tilesArray, 0,0);
    this.jpwalkLayer = map.createLayer("jpwalkLayer", tilesArray, 0,0);
    this.jpteleportLayer = map.createLayer("jpteleportLayer", tilesArray, 0,0);
    this.jpbuildjectLayer = map.createLayer("jpbuildjectLayer", tilesArray, 0,0);
    this.jpwallLayer = map.createLayer("jpwallLayer", tilesArray, 0,0);

    //sushiAnim
    this.anims.create({
      key:'sushiAnims',
      frames:this.anims.generateFrameNumbers('sushi', 
      { start:0, end:1 }),
      frameRate: 7,
      repeat: -1
    })

    //sushiGroup
    this.sushiGroup=this.physics.add.group()

      var sushi1 = map.findObject("jpcollectLayer",  (obj) => obj.name === "sushi1");
      this.sushiGroup.create(sushi1.x, sushi1.y,"sushi1").play("sushiAnims");

      var sushi2 = map.findObject("jpcollectLayer",  (obj) => obj.name === "sushi2");
      this.sushiGroup.create(sushi2.x, sushi2.y,"sushi2").play("sushiAnims");

      var sushi3 = map.findObject("jpcollectLayer",  (obj) => obj.name === "sushi3");
      this.sushiGroup.create(sushi3.x, sushi3.y,"sushi3").play("sushiAnims");

      var sushi4 = map.findObject("jpcollectLayer",  (obj) => obj.name === "sushi4");
      this.sushiGroup.create(sushi4.x, sushi4.y,"sushi4").play("sushiAnims");

      var sushi5 = map.findObject("jpcollectLayer",  (obj) => obj.name === "sushi5");
      this.sushiGroup.create(sushi5.x, sushi5.y,"sushi5").play("sushiAnims");

      var sushi6 = map.findObject("jpcollectLayer",  (obj) => obj.name === "sushi6");
      this.sushiGroup.create(sushi6.x, sushi6.y,"sushi6").play("sushiAnims");

      var sushi7 = map.findObject("jpcollectLayer",  (obj) => obj.name === "sushi7");
      this.sushiGroup.create(sushi7.x, sushi7.y,"sushi7").play("sushiAnims");

      var sushi8 = map.findObject("jpcollectLayer",  (obj) => obj.name === "sushi8");
      this.sushiGroup.create(sushi8.x, sushi8.y,"sushi8").play("sushiAnims");

      var sushi9 = map.findObject("jpcollectLayer",  (obj) => obj.name === "sushi9");
      this.sushiGroup.create(sushi9.x, sushi9.y,"sushi9").play("sushiAnims");

      var sushi10 = map.findObject("jpcollectLayer",  (obj) => obj.name === "sushi10");
      this.sushiGroup.create(sushi10.x, sushi10.y,"sushi10").play("sushiAnims");

    

    //start point
    var start = map.findObject("jpobjectLayer", (obj) => obj.name === "jpstart");

    //add physics
    this.player = this.physics.add.sprite(start.x, start.y, 'elle')
    this.witch = this.physics.add.image(390, 200, 'witch')
    this.witch2 = this.physics.add.image(1065, 1158, 'witch')
    this.witch3 = this.physics.add.image(1246, 460, 'witch')
    this.slime = this.physics.add.sprite(600, 950, 'slime')
    this.slime2 = this.physics.add.sprite(972, 379, 'slime')
    this.slime3 = this.physics.add.sprite(680, 1273, 'slime')
    
   
    window.player = this.player;

    
    //overlap
      this.physics.add.overlap(
      this.player,
      this.sushiGroup, 
      this.collectSushi,
      null, 
      this
      );

    //overlap enemy
    this.physics.add.overlap(
      this.player,
      [this.slime, this.slime2, this.slime3], 
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

    // box size
    this.player.body.setSize(this.player.width*0.3, this.player.height*0.8)
    this.witch.body.setSize(this.witch.width*0.5, this.witch.height*0.8)
    this.witch2.body.setSize(this.witch2.width*0.5, this.witch2.height*0.8)
    this.witch3.body.setSize(this.witch3.width*0.5, this.witch3.height*0.8)
    this.slime.body.setSize(this.slime.width*0.6, this.slime.height*0.8)
    this.slime2.body.setSize(this.slime2.width*0.6, this.slime2.height*0.8)
    this.slime3.body.setSize(this.slime3.width*0.6, this.slime3.height*0.8)

    //collide
    this.physics.world.bounds.width = this.jpwallLayer.width;
    this.physics.world.bounds.height = this.jpwallLayer.height;

    this.jpwallLayer.setCollisionByExclusion(-1, true) 
    this.jpbuildjectLayer.setCollisionByExclusion(-1, true) 
    this.physics.add.collider(this.jpbuildjectLayer, this.player);
    this.physics.add.collider(this.jpwallLayer, this.player);
    
    this.player.setCollideWorldBounds(true);//don't go out of the this.map
   
    //movement event
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

    this.time.addEvent({
    delay: 0,
    callback: this.moveRightLeft,
    callbackScope: this,
    loop: false,
    });

    this.time.addEvent({
    delay: 0,
    callback: this.moveRightLeft2,
    callbackScope: this,
    loop: false,
    });

    this.time.addEvent({
    delay: 0,
    callback: this.moveRightLeft3,
    callbackScope: this,
    loop: false,
    });

    //camera
    this.cameras.main.startFollow(this.player);

    console.log("showInventory");

    // start another scene in parallel
    this.scene.launch("showInventory");

    console.log("showInventory");
    //start another scene in parallel
    this.scene.launch("showInventory")
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
  this.player.anims.stop();
 this.player.setVelocity(0)
}
  } /////////////////// end of update //////////////////////////////

  world(player,tile){
    console.log("world function");
    
    player = {};
    player.x = 906
    player.y = 290

    this.scene.start("world", {player: player});
    
    this.japanbgm.loop = false;
    this.japanbgm.stop();
  }

moveDownUp() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.witch,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2500,
      tweens: [
        {
          y: 500,
        },
        {
          y: 200,
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
      duration: 2500,
      tweens: [
        {
          y: 970,
        },
        {
          y: 1157,
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
      duration: 2500,
      tweens: [
        {
          y: 860,
        },
        {
          y: 460,
        },
      ],
    });
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
          x: 200,
        },
        {
          x: 550,
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
          x: 720,
        },
        {
          x: 972,
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
          x: 209,
        },
        {
          x: 680,
        },
      ],
    });
  }

  collectSushi(player,sushi){
    console.log("sushi overlap player")
    this.sushiSnd.play();
    sushi.disableBody(true,true);

    window.sushi++;
    updateInventory.call(this)
  }

  slimeHit(player,slime){
    console.log("slime overlap player")
    this.hitSnd.play();
    slime.disableBody(true,true);
  }
} //////////// end of class world ////////////////////////
