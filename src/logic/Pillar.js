import Phaser from "phaser";

export default class Pillar extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    this.scene = config.scene;
    this.movable = false;
    
  }
  update() {
    this.dust();
    console.log(this.body.touching.down);
  }
  dust() {
    if (this.body.touching.down) {
      let x = this.x;
      let y = this.y + 100;
      this.dustEmitter(x,y);
    }
    //   if(){

    //   }
    //   if(){

    //   }
    //   if(){

    //   }
    //   else {}
  }
  dustEmitter(x, y) {
    let particles = this.scene.add.particles("dirt").createEmitter({
      x: x,
      y: y,
      scale: { start: 0.02, end: 0 },
      speed: { min: -100, max: 100 },
      quantity: 10,
      _frequency: 10,
      blendMode: "SCREEN"
    });
  }
}
