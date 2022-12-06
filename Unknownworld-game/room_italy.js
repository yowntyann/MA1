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
    
    //image load
    this.load.image("atlas", "assets/misc_atlas.png");
    this.load.image("atlas2", "assets/build_atlas.png");
    this.load.image("magecity", "assets/magecity.png");
    this.load.image("pipoya", "assets/pipoya.png");
    this.load.image("teleport-point", "assets/teleport-point.png");
  
    //audio load
    this.load.audio("italybgm", "assets/italy-map.mp3")
    this.load.audio("collect", "assets/item-collect.mp3")
    this.load.audio("gamefail", "assets/failure.mp3")

    //object load
    this.load.spritesheet('pizza', 'assets/pizza-sprite.png',
    { frameWidth: 64, frameHeight: 64 })

    //enemy load
    this.load.image("witch", "assets/witch.png");
    this.load.spritesheet('slime', 'assets/slime-sprite.png',
    { frameWidth: 64, frameHeight: 64 })
  }

  create() {
    console.log("*** room_italy");

    // Call to update inventory
    this.time.addEvent({
      delay: 500,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
      });

    this.music = this.sound
    .add("italybgm",{
        loop : true,
    })
    .setVolume(0.3);
    this.italybgm = this.music;
    this.music.play();

    this.failSnd = this.sound.add('gamefail').setVolume(0.4)
    this.pizzaSnd = this.sound.add('collect').setVolume(0.1)
    this.hitSnd = this.sound.add('gamefail').setVolume(0.4)

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key: "italyMap"})

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let atlasTiles = map.addTilesetImage("atlas", "atlas");
    let atlas2Tiles = map.addTilesetImage("atlas2", "atlas2")
    let magecityTiles = map.addTilesetImage("magecity", "magecity")
    let pipoyaTiles = map.addTilesetImage("pipoya", "pipoya")
    let teleportTiles = map.addTilesetImage("teleport-point", "teleport-point")

    // Step 5  create an array of tiles

    let tilesArray = [atlasTiles, atlas2Tiles, magecityTiles, pipoyaTiles, teleportTiles]

    // Step 6  Load in layers by layers

    this.itgroundLayer = map.createLayer("itgroundLayer", tilesArray, 0,0);
    this.itwalkLayer = map.createLayer("itwalkLayer", tilesArray, 0,0);
    this.itbuildjectLayer = map.createLayer("itbuildjectLayer", tilesArray, 0,0);
    this.itbuildject2Layer = map.createLayer("itbuildject2Layer", tilesArray, 0,0);

    //pizzaAnims
    this.anims.create({
      key:'pizzaAnims',
      frames:this.anims.generateFrameNumbers('pizza', 
      { start:0, end:1 }),
      frameRate: 7,
      repeat: -1
    })

    //pizzaGroup
    this.pizzaGroup=this.physics.add.group()

      var pizza1 = map.findObject("itcollectLayer",  (obj) => obj.name === "pizza1");
      this.pizzaGroup.create(pizza1.x, pizza1.y,"pizza1").play("pizzaAnims");

      var pizza2 = map.findObject("itcollectLayer",  (obj) => obj.name === "pizza2");
      this.pizzaGroup.create(pizza2.x, pizza2.y,"pizza2").play("pizzaAnims");

      var pizza3 = map.findObject("itcollectLayer",  (obj) => obj.name === "pizza3");
      this.pizzaGroup.create(pizza3.x, pizza3.y,"pizza3").play("pizzaAnims");

      var pizza4 = map.findObject("itcollectLayer",  (obj) => obj.name === "pizza4");
      this.pizzaGroup.create(pizza4.x, pizza4.y,"pizza4").play("pizzaAnims");

      var pizza5 = map.findObject("itcollectLayer",  (obj) => obj.name === "pizza5");
      this.pizzaGroup.create(pizza5.x, pizza5.y,"pizza5").play("pizzaAnims");

      var pizza6 = map.findObject("itcollectLayer",  (obj) => obj.name === "pizza6");
      this.pizzaGroup.create(pizza6.x, pizza6.y,"pizza6").play("pizzaAnims");

      var pizza7 = map.findObject("itcollectLayer",  (obj) => obj.name === "pizza7");
      this.pizzaGroup.create(pizza7.x, pizza7.y,"pizza7").play("pizzaAnims");

      var pizza8 = map.findObject("itcollectLayer",  (obj) => obj.name === "pizza8");
      this.pizzaGroup.create(pizza8.x, pizza8.y,"pizza8").play("pizzaAnims");

      var pizza9 = map.findObject("itcollectLayer",  (obj) => obj.name === "pizza9");
      this.pizzaGroup.create(pizza9.x, pizza9.y,"pizza9").play("pizzaAnims");

      var pizza10 = map.findObject("itcollectLayer",  (obj) => obj.name === "pizza10");
      this.pizzaGroup.create(pizza10.x, pizza10.y,"pizza10").play("pizzaAnims");

    

    //start point
    var start = map.findObject("itobjectLayer", (obj) => obj.name === "itstart");

    //physic add
    this.player = this.physics.add.sprite(start.x, start.y, 'elle')
    this.witch = this.physics.add.image(643, 1254, 'witch')
    this.witch2 = this.physics.add.image(840, 721, 'witch')
    this.witch3 = this.physics.add.image(846, 415, 'witch')
    this.witch4 = this.physics.add.image(361, 870, 'witch')
    this.slime = this.physics.add.sprite(246, 1030, 'slime')
    this.slime2 = this.physics.add.sprite(70, 262, 'slime')
    this.slime3 = this.physics.add.sprite(182, 558, 'slime')
    this.slime4 = this.physics.add.sprite(246, 1230, 'slime')


    //overlap
    this.physics.add.overlap(
      this.pizzaGroup,
      this.player, 
      this.collectPizza,
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
          [this.witch, this.witch2, this.witch3, this.witch4], 
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

          this.time.addEvent({
            delay: 0,
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
            delay: 1000,
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
                callback: this.moveDownUp4,
                callbackScope: this,
                loop: false,
                });


    window.player = this.player

    //frame size
    this.player.body.setSize(this.player.width*0.3, this.player.height*0.8)
    this.witch.body.setSize(this.witch.width*0.5, this.witch.height*0.8)
    this.witch2.body.setSize(this.witch2.width*0.5, this.witch2.height*0.8)
    this.witch3.body.setSize(this.witch3.width*0.5, this.witch3.height*0.8)
    this.witch4.body.setSize(this.witch3.width*0.5, this.witch3.height*0.8)
    this.slime.body.setSize(this.slime.width*0.6, this.slime.height*0.8)
    this.slime2.body.setSize(this.slime2.width*0.6, this.slime2.height*0.8)
    this.slime3.body.setSize(this.slime3.width*0.6, this.slime3.height*0.8)
    this.slime4.body.setSize(this.slime3.width*0.6, this.slime3.height*0.8)

    //collide
    this.physics.world.bounds.width = this.itgroundLayer.width;
    this.physics.world.bounds.height = this.itgroundLayer.height;
    this.itbuildjectLayer.setCollisionByExclusion(-1, true) 
    this.itbuildject2Layer.setCollisionByExclusion(-1, true) 
    this.physics.add.collider(this.itbuildjectLayer, this.player);
    this.physics.add.collider(this.itbuildject2Layer, this.player);

    this.player.setCollideWorldBounds(true);//don't go out of the this.map
   
    //camera
    this.cameras.main.startFollow(this.player);
    
    console.log("showInventory");
    //start another scene in parallel
    this.scene.launch("showInventory")

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
  this.player.anims.stop();
 this.player.setVelocity(0)
}
  } /////////////////// end of update //////////////////////////////
  world(player,tile){
    console.log("world function");
    this.scene.start("world");
    this.italybgm.loop = false;
    this.italybgm.stop();
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
          x: 22,
        },
        {
          x: 246,
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
      duration: 3000,
      tweens: [
        {
          x: 500,
        },
        {
          x: 70,
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
      duration: 3000,
      tweens: [
        {
          x: 582,
        },
        {
          x: 182,
        },
      ],
    });
  }
  moveRightLeft4() {
    console.log("moveRightLeft");
    this.tweens.timeline({
      targets: this.slime4,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 2500,
      tweens: [
        {
          x: 73,
        },
        {
          x: 246,
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
          y: 987,
        },
        {
          y: 1254,
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
          y: 505,
        },
        {
          y: 721,
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
          y: 167,
        },
        {
          y: 415,
        },
      ],
    });
  }

  moveDownUp4() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.witch4,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 3000,
      tweens: [
        {
          y: 681,
        },
        {
          y: 870,
        },
      ],
    });
  }

  collectPizza(player,pizza){
    console.log("pizza overlap player")
    this.pizzaSnd.play();
    pizza.disableBody(true,true);

    window.sushi++;
    updateInventory.call(this)
  }
} //////////// end of class world ////////////////////////
