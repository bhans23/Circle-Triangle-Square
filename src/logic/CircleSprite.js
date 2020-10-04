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
      frames: this.scene.anims.generateFrameNames("circleSheet", {
        start: 1,
        end: 60,
        first: 1,
      }),
      frameRate: 90,
      repeat: -1,
    };
    this.scene.rockMove = this.scene.anims.create(config);
    this.rockMove = this.scene.rockMove
  }

  

  
}
