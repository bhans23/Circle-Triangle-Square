import Phaser from "phaser";

export default class Pillar extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    this.scene = config.scene;
    this.movable = false;
  }
  // update() {
  //   console.log(this.body.velocity)
    
  //   if(this.body.velocity.x !== 0 || this.body.velocity.y !== 0){
  //     this.scene.slideSFX.play();
  //   } else {}
  // }
}
