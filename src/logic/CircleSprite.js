import Phaser from "phaser";
import spriteCreation from "./spriteCreation";

export default class CircleSprite extends spriteCreation {
  constructor(spriteValues) {
    super(spriteValues);
    this.scene = this.spriteValues.scene;
    this.rockAnim();
    
  }
  rockAnim() {
    var config = {
      key: "roll",
      frames: this.scene.anims.generateFrameNumbers("circleSheet", {
        start: 0,
        end: 59,
        first: 0,
      }),
      frameRate: 60,
      repeat: -1,
    };
    this.scene.rockMove = this.scene.anims.create(config);
    this.rockMove = this.scene.rockMove
  }

  

  
}
