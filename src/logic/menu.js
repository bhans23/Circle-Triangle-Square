import Phaser from "phaser";

export default class menu {
  constructor(config) {
    this.scene = config.scene;
    this.level = config.level;

    this.restart();
    this.levelMenu();
  }

  restart() {
    this.box = this.scene.add.sprite(0, 0, "button").setDepth(15).setOrigin(0);
    let arrow = this.scene.add
      .sprite(25, 10, "redo")
      .setDepth(16)
      .setOrigin(0)
      .setScale(0.16);

    this.box.displayWidth = 125;
    this.box.displayHeight = 125;

    this.box.setInteractive();
    this.box.on("pointerdown", () => {
      this.scene.scene.start(this.level);
    });
  }

  levelMenu() {
    //Box
    this.box2 = this.scene.add
      .sprite(130, 0, "button")
      .setDepth(15)
      .setOrigin(0);
    let arrow = this.scene.add
      .sprite(140, 10, "map")
      .setDepth(16)
      .setOrigin(0)
      .setScale(0.16);

    this.box2.displayWidth = 125;
    this.box2.displayHeight = 125;

    this.box2.setInteractive();
    this.box2.on("pointerdown", () => {
      this.scene.scene.start("levelMap");
    });
  }
}
