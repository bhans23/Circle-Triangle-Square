import { Scene } from "phaser";
import tilePNG from "../assets/tiles.png";
import tile2PNG from "../assets/tiles2.png";
import level1Map from "../assets/level1.json";
import level2Map from "../assets/level2.json";
import level3Map from "../assets/level3.json";
import level4Map from "../assets/level4.json";
import level5Map from "../assets/level5.json";
import logo from "../assets/sQTLogo.png";
import startButton from "../assets/startButton.png";
import title from "../assets/title.png";
import circleSprite from "../assets/Circles.png";
import squareSprite from "../assets/Square.png";
import triangleSprite from "../assets/Triangle.png";
import pillar from "../assets/pillar.png";
import circleSheet from "../assets/circleSheet.png";
import doorSheet from "../assets/stoneDoor.png";
import altar from "../assets/altar.png";
import grass from "../assets/grass.png";
import stone from "../assets/stone.png";
import dirt from "../assets/dirt.png";
import water from "../assets/water.png";
import stoneBg from "../assets/stoneBg.png";
import tree from "../assets/tree.png";

export default class bootScene extends Scene {
  constructor() {
    super("bootScene");
  }

  preload() {
    //audio
    this.load.audio("level1", "/assets/level1.mp3");
    this.load.audio("slide", "/assets/slide.mp3");
    this.load.audio("slideShort", "/assets/slideShort.mp3");
    this.load.audio("impact", "/assets/impact.mp3");
    this.load.audio("rockRoll", "/assets/rockRoll.mp3");
    this.load.audio("doorMove", "/assets/doorMove.mp3");
    this.load.audio("water", "/assets/water.mp3");
    // title Scene assets
    this.load.image("grass", grass);
    this.load.image("dirt", dirt);
    this.load.image("altar", altar);
    this.load.image("title", title);
    this.load.image("stone", stone);
    this.load.image("startButton", startButton);
    this.load.image("logo", logo);
    this.load.image("water", water);
    this.load.image("stoneBg", stoneBg);
    this.load.image("tree", tree);
    //level 1 assets

    this.load.tilemapTiledJSON("level1", level1Map);
    this.load.tilemapTiledJSON("level2", level2Map);
    this.load.tilemapTiledJSON("level3", level3Map);
    this.load.tilemapTiledJSON("level4", level4Map);
    this.load.tilemapTiledJSON("level5", level5Map);
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
