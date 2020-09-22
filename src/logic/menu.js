import Phaser from "phaser";

export default class menu {
  constructor(config) {
    this.scene = config.scene;
    this.level = config.level;

    this.restart();
    this.levelMenu();
  }

  restart() {
    //Box
    let rect = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 100, 100).setDepth(16).setOrigin(0);
    rect.inputEnabled = true;
    
    this.box = this.scene.add
      .graphics({ fillStyle: { color: 0x07e825, alpha: 0.7 } }). setDepth(15)
      
    this.box.fillRectShape(rect);
    rect.setInteractive();
    rect.on("pointerdown", () => {
      this.scene.scene.start(this.level);
    });
    //text moves

    this.text = this.scene.add
      .text(0, 25, "Restart", {
        fontFamily: "Arial",
        fontSize: 28,
        color: "#ffffff",
      })
      .setDepth(17);
  }

  levelMenu() {
    //Box
    let rect = new Phaser.GameObjects.Rectangle(this.scene, 125, 0, 100, 100).setDepth(14).setOrigin(0);;
    console.log(rect);
    rect.inputEnabled = true;
    this.box = this.scene.add
      .graphics({ fillStyle: { color: 0x07e825, alpha: 0.7 } }). setDepth(12)
      
    this.box.fillRectShape(rect);
    rect.setInteractive();
    rect.on("pointerdown", () => {
      this.scene.scene.start("levelMap");
    });
    //text moves

    this.text = this.scene.add
      .text(125, 25, "Levels", {
        fontFamily: "Arial",
        fontSize: 32,
        color: "#ffffff",
      })
      .setDepth(17);
  }
}
