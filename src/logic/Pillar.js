import Phaser from "phaser";

export default class Pillar extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    this.scene = config.scene;
    this.setCollideWorldBounds(true);
    this.setDepth(1);
    this.setPipeline("Light2D");
    this.create();
  }

  create() {
    this.slideSFX = this.scene.sound.add("slide", { volume: 0.2 });
    this.impactSFX = this.scene.sound.add("impact", { volume: 0.3 });
  }
  update() {
    this.spriteMoves();
  }
  spriteLog() {}
  spriteMoves() {
    if (this.body.speed === 0) {
      this.slideSFX.stop();
    }

    if (this.body.speed > 0) {
      if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
        this.impactSFX.play();

        
      } else {
      }
      if (!this.slideSFX.isPlaying) {
        this.slideSFX.play();
      } else {
      }
    }
  }
}
