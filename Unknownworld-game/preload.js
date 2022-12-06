class preload extends Phaser.Scene {
  constructor() {
    super("preload");

    // Put global variable here
  }

  preload() {
    this.load.image('intro1', 'assets/intro1-game.png')
    
    this.load.image('heart', 'assets/heart.png')
    this.load.spritesheet('sushi', 'assets/sushi-sprite.png',
    { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('nasi', 'assets/nasi-sprite.png',
    { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('pizza', 'assets/pizza-sprite.png',
    { frameWidth: 64, frameHeight: 64 })

    this.load.spritesheet('elle', 'assets/elle-sprite.png',
    { frameWidth: 64, frameHeight: 64 })

    //audio load
    this.load.audio("introbgm", "assets/intro-scenes.mp3")

    //enemy load
    this.load.spritesheet('slime', 'assets/slime-sprite.png',
    { frameWidth: 64, frameHeight: 64 })
  }

  create() {
    console.log("*** preload scene");

    //sound create
    // this.music = this.sound
    // .add("introbgm",{
    //     loop : true,
    // })
    // .setVolume(0.4);
    // this.introbgm = this.music;
    // this.music.play();

    //reload 3 hearts 
    // window.heart = 5;
    // window.sushi = 0;
    // window.nasi = 0;
    // window.pizza = 0;
    
    //player anims
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

    //slime anims
    this.anims.create({
    key: 'left-slime',
    frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1
    });

    this.anims.create({
    key: 'right-slime',
    frames: this.anims.generateFrameNumbers('slime', { start: 2, end: 3 }),
    frameRate: 10,
    repeat: -1
    });
    
    
    this.add.sprite(450, 450,"intro1").setScale(0.48)

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to intro2 scene");

        let playerPos = {}
        playerPos.x = 452
        playerPos.y = 1002
        this.scene.start(
          "intro2",
          { player: playerPos}
        );
      },
      this
    );

    // // Add any text in the main page
    // this.add.text(90, 600, "Press spacebar to continue", {
    //   font: "30px Courier",
    //   fill: "#FFFFFF",
    // });

    // Create all the game animations here
  }
}
