import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  preload() {}

  create() {
    //Music
    this.bgMusic = this.sound.add("title", { loop: true, volume: .5 }).play()
    // Background image
    const bgImage = this.add.image(0, 468, "title").setOrigin(0, 0).setDepth(0);
    bgImage.displayWidth = 1200;
    bgImage.displayHeight = 1200;

    //Start ButtonSprite
    const startButtonSprite = this.add
      .sprite(600, 1000, "startButton")
      .setDepth(1);
    startButtonSprite.displayWidth = 100;
    startButtonSprite.displayHeight = 100;
    startButtonSprite.setInteractive();
    startButtonSprite.on("pointerdown", () => this.scene.start("levelMap"));

    // title Logo
    const logo = this.add.image(600, 200, "logo").setDepth(10);
    logo.displayWidth = 650;
    logo.displayHeight = 400;

    // this.input.on("pointerdown", () => this.scene.start("level1"));

    this.bg = this.add
    .image(0, 0, "stoneBg")
    .setOrigin(0)
    .setScale(0.6, 0.6)
    .setDepth(9)
    .setCrop(0, 0, 2000, 785);
  this.add
    .image(0, 1000, "stoneBg")
    .setOrigin(0)
    .setScale(0.6, 0.6)
    .setDepth(9)
    .setCrop(0, 1075, 2000, 2000);
  }
}
