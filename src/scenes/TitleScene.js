import Phaser from "phaser";
import logo from "../assets/sQTLogo.png";
import startButton from "../assets/startButton.png";
import mountainBG from "../assets/mountainBG.png";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  preload() {
    this.load.image('mountainBG', mountainBG);
    this.load.image("startButton", startButton);
    this.load.image("logo", logo);
  }

  create() {
    // Background image
    const bgImage = this.add.image(0,0,'mountainBG', mountainBG).setOrigin(0, 0).setDepth(0);
    bgImage.displayWidth = 800;
    bgImage.displayHeight = 600;

    //Start ButtonSprite
    const startButtonSprite = this.add.sprite(400,300,'startButton').setDepth(1);
    startButtonSprite.displayWidth = 100;
    startButtonSprite.displayHeight = 100;
    startButtonSprite.setInteractive();
    startButtonSprite.on("pointerdown",() => this.scene.start("level1"));

    // title Logo
    const logo = this.add.image(400, 200, "logo").setDepth(1);
    logo.displayWidth = 650;
    logo.displayHeight = 400;
    
    
    // this.input.on("pointerdown", () => this.scene.start("level1"));
  }
}
