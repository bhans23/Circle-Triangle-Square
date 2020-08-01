import Phaser from "phaser";

export default class spriteCreation extends Phaser.Physics.Arcade.Sprite {
  constructor(spriteValues) {
    super(spriteValues.scene, spriteValues.x, spriteValues.y, spriteValues.key);
    spriteValues.scene.add.existing(this);
    spriteValues.scene.physics.add.existing(this);
    this.spriteValues = spriteValues;
  }
  preload() {}

  create() {}

  update() {}

  select() {}

  deselect() {}
}

