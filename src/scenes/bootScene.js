import { Scene } from "phaser";
import tilePNG from "../assets/level1tiles.png";
import gameBoard from "../assets/level1.json";
import logo from "../assets/sQTLogo.png";
import startButton from "../assets/startButton.png";
import title from "../assets/title.png";
import circleSprite from "../assets/Circles.png";
import squareSprite from "../assets/Square.png";
import triangleSprite from "../assets/Triangle.png";
import pillar from "../assets/pillar.png";
import circleSheet from "../assets/circleSheet.png";
import doorSheet from "../assets/stoneDoor.png";
import alter from "../assets/alter.png";
import grass from '../assets/grass.png';
import stone from '../assets/stone.png';
import level1 from "../assets/level1.mp3";

export default class bootScene extends Scene {
  constructor() {
    super("bootScene");
  }

  preload() {
    //audio
    this.load.audio('level1Music', level1)
    // title Scene assets
    this.load.image('grass', grass)
    this.load.image("alter", alter);
    this.load.image("title", title);
    this.load.image("stone", stone);
    this.load.image("startButton", startButton);
    this.load.image("logo", logo);
    //level 1 assets
    
    this.load.tilemapTiledJSON("level1GameBoard", gameBoard);
    this.load.image("circle", circleSprite);
    this.load.image("square", squareSprite);
    this.load.image("triangle", triangleSprite);
    this.load.image("pillar", pillar);
    this.load.spritesheet("tiles", tilePNG, {
      frameWidth: 200,
      frameHeight: 200,
    });
    this.load.spritesheet("circleSheet", circleSheet, {
      frameWidth: 200,
      frameHeight: 200,
      endFrame: 59,
    });

    this.load.spritesheet("doorSheet", doorSheet, {
      frameWidth: 200,
      frameHeight: 200,
      endFrame: 59,
    });
  }
  create() {
    this.scene.start("Title");
  }
}
