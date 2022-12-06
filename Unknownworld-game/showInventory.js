class showInventory extends Phaser.Scene {

  constructor() {
      super({
          key: 'showInventory',
          active: false
      });
  }

  // incoming data from other scene
  init(data) {
      this.player = data.player
      this.inventory = data.inventory
  }

  preload() {
    this.load.image('heart', 'assets/heart.png')
    this.load.image('sushi', 'assets/sushi1.png')
    this.load.image('nasi', 'assets/nasi1.png')
    this.load.image('pizza', 'assets/pizza1.png')

  }

  create() {

    console.log("***showInventory")
    this.scene.bringToTop("showInventory");

      var rect = new Phaser.Geom.Rectangle(29, 10, 650, 80);
      var graphics = this.add.graphics({
          fillStyle: {
              color: 0xffffff
          }
      });
      graphics.fillRectShape(rect).setScrollFactor(0)

      // Setup heart and keys but visible to false
      console.log("***showInventory");
      this.scene.bringToTop("showInventory");

      this.heart1 = this.add.image (60, 50,'heart').setScrollFactor(0).setVisible(false).setScale(1);
      this.heart2 = this.add.image (120, 50,'heart').setScrollFactor(0).setVisible(false).setScale(1);
      this.heart3 = this.add.image (180, 50,'heart').setScrollFactor(0).setVisible(false).setScale(1);
      this.heart4 = this.add.image (240, 50,'heart').setScrollFactor(0).setVisible(false).setScale(1);
      this.heart5 = this.add.image (300, 50,'heart').setScrollFactor(0).setVisible(false).setScale(1);

      this.sushi = this.add.image (400, 50, 'sushi').setScrollFactor(0).setVisible(true).setScale(1);
      this.nasi = this.add.image (510, 50, 'nasi').setScrollFactor(0).setVisible(true).setScale(1);
      this.pizza = this.add.image (600, 50, 'pizza').setScrollFactor(0).setVisible(true).setScale(1);

      // Recv an event, call the method
      this.events.on('inventory', this.updateScreen, this)

      //Setup objects
      this.sushiNum = this.add.text(440, 23, window.sushi, {font: '50px Futura PT Medium', fill: '#272e66'}).setScrollFactor(0);
      this.nasiNum = this.add.text(540, 23, window.nasi, {font: '50px Futura PT Medium', fill: '#272e66'}).setScrollFactor(0);
      this.pizzaNum = this.add.text(640, 23, window.pizza, {font: '50px Futura PT Medium', fill: '#272e66'}).setScrollFactor(0);
  }

  update() {
  }

  updateScreen(data) {
       console.log('Received event inventory', data);

        this.sushiNum.setText(data.sushi);
        this.nasiNum.setText(data.nasi);
        this.pizzaNum.setText(data.pizza);

       switch ( data.heart ) {

          case 5: 
              this.heart1.setVisible(true)
              this.heart2.setVisible(true)
              this.heart3.setVisible(true)
              this.heart4.setVisible(true)
              this.heart5.setVisible(true)
              break;

          case 4:
            this.heart1.setVisible(true)
            this.heart2.setVisible(true)
            this.heart3.setVisible(true)
            this.heart4.setVisible(true)
            this.heart5.setVisible(false)
              break;

          case 3:
            this.heart1.setVisible(true)
            this.heart2.setVisible(true)
            this.heart3.setVisible(true)
            this.heart4.setVisible(false)
            this.heart5.setVisible(false)
              break;
           
          case 2:
            this.heart1.setVisible(true)
            this.heart2.setVisible(true)
            this.heart3.setVisible(false)
            this.heart4.setVisible(false)
            this.heart5.setVisible(false)
              break;  
            
            case 1:
            this.heart1.setVisible(false)
            this.heart2.setVisible(false)
            this.heart3.setVisible(false)
            this.heart4.setVisible(false)
            this.heart5.setVisible(false)
              break;

          default:
          break;
      }
      
  }
}