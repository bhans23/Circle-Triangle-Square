import Phaser from "phaser";

export default class win {
  constructor(config) {
    this.config = config;
    this.scene = config.scene;
    this.gB = config.gB;
    this.key = config.key
    this.winCon();
  }

  winCon() {
    if (
      this.scene.spriteSelection[0].x ===
        this.gB.sqNum[this.gB.exit].x + this.gB.sqW / 2 &&
      this.scene.spriteSelection[0].y ===
        this.gB.sqNum[this.gB.exit].y + this.gB.sqH / 2
    ) {
      this.scene.spriteSelection[0].target.x = this.config.leave.x;
      this.scene.spriteSelection[0].target.y = this.config.leave.y;
      this.scene.physics.moveTo(
        this.scene.spriteSelection[0],
        this.scene.spriteSelection[0].target.x,
        this.scene.spriteSelection[0].target.y,
        400
      );
      this.scene.spriteSelection[0].play("roll");
      this.scene.scene.get("levelMap").localStorage.setItem(this.key, this.key);

      var timer = this.scene.time.addEvent({
        delay: 3000,
        callback: () => this.scene.scene.start("levelMap"),
        callbackScope: this,
      });
    }
  }
}
