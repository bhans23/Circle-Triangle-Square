import { Scene } from "phaser";
import tilePNG from "../assets/tiles.png";
import gameBoard from "../assets/level1.json";

export default class Level1 extends Scene {
  constructor() {
    super("level1");
  }

  preload() {
    // load the tilemap
    this.load.tilemapTiledJSON("level1GameBoard", gameBoard);
    //load the sprite sheet
    this.load.spritesheet("tiles", tilePNG, {
      frameWidth: 200,
      frameHeight: 200,
    });
  }

  create() {
    // this.add.image(400, 300, "level1Image", Level1Image);
    // //create the tilemap
    const board = this.make.tilemap({ key: "level1GameBoard" });
    //add tileset image
    const tilesPNG = board.addTilesetImage("tiles");
    // create our layers
    const backGroundLayer = board.createStaticLayer(
      "background",
      tilesPNG,
      0,
      0
    );
    backGroundLayer.setDepth(0);
    const topLayer = board.createStaticLayer("top", tilesPNG, 0, 0);
    topLayer.setDepth(1);
  }
}
