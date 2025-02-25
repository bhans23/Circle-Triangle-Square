import Phaser from "phaser";

export default class stoneSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(spriteValues) {
    super(spriteValues.scene, spriteValues.x, spriteValues.y, spriteValues.key);
    spriteValues.scene.add.existing(this);
    spriteValues.scene.physics.add.existing(this);
    this.spriteValues = spriteValues;
    this.scene = this.spriteValues.scene;
    this.introSq = spriteValues.introSq;

    this.target = new Phaser.Math.Vector2();
    this.setImmovable(true);
    this.intro();
    this.setPipeline("Light2D");
    this.create();
  }
  preload() {}

  create() {
    this.slideSFX = this.scene.sound.add("slide", { volume: 0.2 });
    this.impactSFX = this.scene.sound.add("impact", { volume: 0.3 });
  }

  update() {
    this.spriteMoves();
  }
  intro() {
    this.setAngle(this.spriteValues.angle);
    this.target.x = this.introSq.x;
    this.target.y = this.introSq.y;

    this.scene.physics.moveTo(this, this.target.x, this.target.y, 300);
  }

  spriteMoves() {
    this.distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );
    
    if (this.body.speed === 0) {
      this.slideSFX.stop();
    }
    if (this.body.speed > 0) {
      if (!this.slideSFX.isPlaying) {
        this.slideSFX.play();
      }
      
      //  4 is our distance tolerance, i.e. how close the source can get to the this.target
      //  before it is considered as being there. The faster it moves, the more tolerance is required.

      if (this.distance < 10) {
        this.body.reset(this.target.x, this.target.y);
        this.scene.cameras.main.shake(300, 0.002);
        if (!this.impactSFX.isPlaying) {
          this.impactSFX.play();
        } else {
        }
      }
    }
  }
}
