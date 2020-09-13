import Phaser from "phaser";

export default class doorSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(spriteValues) {
    super(spriteValues.scene, spriteValues.x, spriteValues.y, spriteValues.key);
    spriteValues.scene.add.existing(this);
    spriteValues.scene.physics.add.existing(this);
    this.spriteValues = spriteValues;
    this.scene = this.spriteValues.scene;
    this.target = new Phaser.Math.Vector2();
    this.doorAnim();
  }
  preload() {}

  doorAnim() {
    var config = {
      key: "rollDoor",
      frames: this.scene.anims.generateFrameNumbers("doorSheet", {
        start: 0,
        end: 17,
        first: 0,
      }),
      frameRate: 14,
      repeat: 0,
    };
    this.scene.stoneDoorMove = this.scene.anims.create(config);
  }

  update() {
    this.spriteMoves();
  }
  
  spriteMoves() {

    this.distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );
    
    if (this.body.speed > 0) {
     
      //  4 is our distance tolerance, i.e. how close the source can get to the this.target
      //  before it is considered as being there. The faster it moves, the more tolerance is required.
      
      if (this.distance < 10) {
        this.body.reset(this.target.x, this.target.y);
        
      }
    }
  }
}
