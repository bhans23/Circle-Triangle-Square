import Phaser from "phaser";

export default class spriteCreation extends Phaser.Physics.Arcade.Sprite {
  constructor(spriteValues) {
    super(spriteValues.scene, spriteValues.x, spriteValues.y, spriteValues.key);
    spriteValues.scene.add.existing(this);
    spriteValues.scene.physics.add.existing(this);
    this.spriteValues = spriteValues;
    this.scene = this.spriteValues.scene;
    this.target = new Phaser.Math.Vector2();
  }
  preload() {}

  create() {}

  update() {
    this.spriteMoves();
  }

  select() {
    this.setTint(0x0e9c2a);
  }

  deselect() {
    this.clearTint();
    this.graphics.clear();
  }

  spriteMoves() {
    this.distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );
    // console.log(this.squareSelected.x)
    if (this.body.speed > 0) {
      //  4 is our distance tolerance, i.e. how close the source can get to the this.target
      //  before it is considered as being there. The faster it moves, the more tolerance is required.

      if (this.distance < 10) {
        this.body.reset(this.target.x, this.target.y);
      }
    }
    if (this.distance > 0 && this.body.speed > 0) {
      this.graphics.clear();
      
      if (this.distance < 20) {
        this.scene.getSpriteSquare(this);
        this.moves();
      } else {
      }
    }
  }
}
