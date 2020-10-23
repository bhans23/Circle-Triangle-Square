import { Scene } from "phaser";
import level1Map from "../assets/level1.json";
import level2Map from "../assets/level2.json";
import level3Map from "../assets/level3.json";
import level4Map from "../assets/level4.json";
import level5Map from "../assets/level5.json";
import logo from "../assets/sQTLogo.png";
import startButton from "../assets/startButton.png";
import title from "../assets/title.png";
import grass from "../assets/grass.png";
import dirt from "../assets/dirt.png";
import water from "../assets/water.png";
import stoneBg from "../assets/stoneBg.png";
import star from "../assets/star.png";
import feather from "../assets/feather.png";
import next from "../assets/next.png";
import redo from "../assets/redo.png";
import map from "../assets/map.png";
import button from "../assets/button.png";

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
    this.load.audio("star", "/assets/star.mp3");
    this.load.audio("altar", "/assets/altar.mp3");
    this.load.audio("win", "/assets/win.mp3");
    this.load.audio("starEarn", "/assets/starEarn.mp3");
    this.load.audio("starEarn2", "/assets/starEarn2.mp3");
    // title Scene assets
    this.load.image("grass", grass);
    this.load.image("dirt", dirt);
    this.load.image("altar", ["/assets/altar.png", "/assets/alter-n.png"]);
    this.load.image("title", title);
    this.load.image("stone", ["/assets/stone.png", "/assets/stone_n.png"]);
    this.load.image("startButton", startButton);
    this.load.image("logo", logo);
    this.load.image("water", water);
    this.load.image("stoneBg", stoneBg);
    this.load.image("tree", ["/assets/tree.png", "/assets/tree-n.png"]);
    //level 1 assets
    this.load.tilemapTiledJSON("level1", level1Map);
    this.load.tilemapTiledJSON("level2", level2Map);
    this.load.tilemapTiledJSON("level3", level3Map);
    this.load.tilemapTiledJSON("level4", level4Map);
    this.load.tilemapTiledJSON("level5", level5Map);
    this.load.image("star", star);
    this.load.image("feather", feather);
    this.load.image("redo", redo);
    this.load.image("next", next);
    this.load.image("map", map);
    this.load.image("button", button);

    this.load.image("pillar", ["/assets/pillar.png", "/assets/pillar-n.png"]);
    this.load.image("tiles", [
      "/assets/dirtWorldTiles2.png",
      "/assets/dirtWorldTiles2_n.png",
    ]);
    this.load.setPath("assets/");
    this.load.multiatlas("circleSheet", "circleSheet.json");

    this.load.multiatlas("doorSheet", "doorSheet.json");
  }
  create() {
    this.scene.start("Title");
  }
}
