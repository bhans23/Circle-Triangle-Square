import Phaser from "phaser";

export default class altar extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    this.config = config;
    this.scene = this.config.scene;
    this.endX = config.endX
    this.endY = config.endY
    this.create();
  }
  preload() {}

  create() {
    this.isPressed = false;
    this.emitter = this.scene.add.particles("grass").createEmitter({
        x: this.config.x,
        y: this.config.y,
        blendMode: "SCREEN",
        scale: { start: 0.03, end: 0 },
        speed: { min: -100, max: 100 },
        quantity: 20,
        emitZone: {
          source: new Phaser.Geom.Circle(0, 0, 100),
          type: "edge",
          quantity: 20,
        },
      });
  }

  update() {
    
  }

  altarPress() {
    if (this.isPressed === false) {
      //Emitter Altar FX
      this.emitter.explode();
      this.emitter.killAll();
      //Door move FX
      this.scene.doorMoveSFX.play();
      this.scene.stoneDoor.target.x = this.endX;
      this.scene.stoneDoor.target.y = this.endY;
      this.scene.physics.moveTo(
        this.scene.stoneDoor,
        this.scene.stoneDoor.target.x,
        this.scene.stoneDoor.target.y,
        200
      );
      this.scene.stoneDoor.play("rollDoor");
      this.scene.cameras.main.shake(1000, 0.005);
      this.isPressed = true;
    }
  }

 
  
  
    
    
    
  
}