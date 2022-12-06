////////////////////////////////////////////////////////
//
// access this function using updateInventory.call(this)
// Uses a JS function to prevent repeated codes
// 
///////////////////////////////////////////////////////
function updateInventory() {
    console.log("*** updateInventory()")
    // Emit events showInventory
    this.inventory = {}
    this.inventory.heart = window.heart
    this.inventory.sushi = window.sushi
    this.inventory.nasi = window.nasi
    this.inventory.pizza = window.pizza
  
    console.log('*** updateInventory() Emit event', this.inventory)
    this.invEvent = (event, data) =>  { this.scene.get('showInventory').events.emit(event, data); }
    this.invEvent("inventory", this.inventory);
  }
  
  ////////////////////////////////////////////////////////
  //
  // access this function using guardCaught
  // Uses a JS function to prevent repeated codes
  // 
  ///////////////////////////////////////////////////////
  function witchHit(player,witch) {
      console.log("*** witchCaught: attack by witch");
  
      this.hitSnd.play();
  
      // Shake screen
    this.cameras.main.shake(100);
  
    window.heart--;
    witch.disableBody(true, true);
    //this.updateInventory()
    updateInventory.call(this)

  if (window.heart == 0){
    this.scene.start("gameFail");
    this.failSnd.play();
    }
  }

  function slimeHit(player,slime) {
    console.log("*** slimeCaught: attack by slime");

    this.hitSnd.play();

    // Shake screen
  this.cameras.main.shake(100);

  window.heart--;
  slime.disableBody(true, true);
  //this.updateInventory()
  updateInventory.call(this)

if (window.heart == 0){
  this.scene.start("gameFail");
  this.failSnd.play();
  }
}

function bossHit(player,boss) {
  console.log("*** bossCaught: attack by boss");

  this.hitSnd.play();

  // Shake screen
this.cameras.main.shake(100);

window.heart--;
boss.disableBody(true, true);
//this.updateInventory()
updateInventory.call(this)

if (window.heart == 0){
this.scene.start("gameFail");
this.failSnd.play();
}
}