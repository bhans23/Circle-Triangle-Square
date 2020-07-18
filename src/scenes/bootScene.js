import { Scene } from "phaser";
import tilePNG from "../assets/tiles.png";
import gameBoard from "../assets/level1.json";
import logo from "../assets/sQTLogo.png";
import startButton from "../assets/startButton.png";
import mountainBG from "../assets/mountainBG.png";
import circleSprite from "../assets/Circle.png";

export default class bootScene extends Scene {
  constructor() {
    super("bootScene");
    
  }

  preload() {
      //title Scene assets
    this.load.image('mountainBG', mountainBG);
    this.load.image("startButton", startButton);
    this.load.image("logo", logo);
    //level 1 assets
    this.load.tilemapTiledJSON("level1GameBoard", gameBoard);
    this.load.image("circle", circleSprite);
    this.load.spritesheet("tiles", tilePNG, {
      frameWidth: 200,
      frameHeight: 200,
    });
  }

  create() {
    this.scene.start("Title");
  }
}
