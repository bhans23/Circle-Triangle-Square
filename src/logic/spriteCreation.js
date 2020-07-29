import Phaser from "phaser";

export default class spriteCreation extends Phaser.Scene {
  constructor(rockSprite, spriteXValue, spriteYValue) {
    this.rockSprite = rockSprite;
    this.spriteXValue = spriteXValue;
    this.spriteyValue  = spriteYValue;
  }
  preload() {};
  // create() {
  //   this.physics.add.sprite(this.spriteXValue, this.spriteyValue, this.rockSprite);
  // }
  update() {
  //   this.spriteMoves();
  // }
  // onPointerDown() {
  //   this.rockSprite.setInteractive();
  //   this.rockSprite.on("pointerdown", function () {
  //     this.handlePointerDown()

  //   }, this);
  }
  select() {
    this.update();
    rockSprite.setTint(0x32a852);
  }

  deselect() {}

  // spriteMoveTo() {
  //   this.input.on(
  //     "pointerdown",
  //     function (pointer) {
  //       this.target.x = pointer.x;
  //       this.target.y = pointer.y;
  //       this.physics.moveToObject(this.circleSprite, this.target, 400);
  //     },
  //     this
  //   );
  // }

  // spriteMoves() {
  //   this.distance = Phaser.Math.Distance.Between(
  //     this.circleSprite.x,
  //     this.circleSprite.y,
  //     this.target.x,
  //     this.target.y
  //   );
  //   if (this.circleSprite.body.speed > 0) {
  //     //  4 is our distance tolerance, i.e. how close the source can get to the this.target
  //     //  before it is considered as being there. The faster it moves, the more tolerance is required.

  //     if (this.distance < 4) {
  //       this.circleSprite.body.reset(this.target.x, this.target.y);
  //     }
  //   }
  // }
}
