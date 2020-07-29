import { Scene } from "phaser";
import spriteCreation from "../logic/spriteCreation";


export default class Level1 extends Scene {
  constructor() {
    super("level1");

    this.target = new Phaser.Math.Vector2();
  }

  // Preload, create, update functions ---------------------------------
  preload() {}

  create() {
    this.events.on("resize", this.resize, this);
    this.createMap();
    //sprite
    this.spriteSelection = [
      new spriteCreation('circle',300,900),
      new spriteCreation('square',700, 900),
      new spriteCreation('triangle',500,900),
    ];
   
  }

  update() {}

  //---------------------------------------------------------------------

  
  handlePointerDown(spriteSelection) {
    this.spriteSelection.forEach((rockSprite) => {
      if (rockSprite === spriteSelection) {
        rockSprite.select();
      } else {
        rockSprite.deselect();
      }
    });
  }

  

  resize(width, height) {
    if (width === undefined) {
      width = this.sys.game.config.width;
      height = this.sys.game.config.height;
    }
    this.cameras.resize(width, height);
  }

  createMap() {
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
    const topLayer = board.createStaticLayer("top", tilesPNG, 0, 0);
  }
}
