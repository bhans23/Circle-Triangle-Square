import Phaser from "phaser";

export default class doorSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    this.config = config;
    this.scene = this.config.scene;
    this.target = new Phaser.Math.Vector2();
    console.log(this.scene.textures.get("doorSheet"))
    this.attributes();
    this.doorAnim();
    
    this.setPipeline('Light2D')
  }
  preload() {}

  doorAnim() {
    var config = {
      key: "rollDoor",
      frames: this.scene.anims.generateFrameNames('doorSheet', {
        start: 1,
        end: 60,
        first: 1,
      }),
      frameRate: 30,
      repeat: 0,
    };
    this.scene.stoneDoorMove = this.scene.anims.create(config);
   
    
   
  }

  update() {
    this.spriteMoves();
  }
  attributes() {
    this.setDepth(this.config.depth);
    this.setScale(this.config.scale);
    this.setImmovable(this.config.immovable);
    this.setBodySize(
      this.config.bodySize.x,
      this.config.bodySize.y
    );
    this.setAngle(this.config.angle)
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
