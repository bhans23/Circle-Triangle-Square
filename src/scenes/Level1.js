import { Scene } from "phaser";

export default class Level1 extends Scene {
  constructor() {
    super("level1");
  }

  preload() {}

  create() {
    this.events.on("resize", this.resize, this);
    this.createMap();
    //circle sprite
    this.circleSprite = this.physics.add.sprite(500, 900, "circle");
    this.circleMoves();
  }

  update() {}

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
    // backGroundLayer.setDepth(0);
    const topLayer = board.createStaticLayer("top", tilesPNG, 0, 0);
    // topLayer.setDepth(1);
  }

  circleMoves() {
    this.pointerCord = game.input.mousePointer;
    this.pointer = this.input.activePointer;
    this.input.on("pointerdown", function (pointer) {
      this.physics.moveTo(this.circleSprite,this.pointerCord.x,this.pointerCord.y, 240);
    }, this);
    if (this.circleSprite.x == this.pointerCord.x && this.circleSprite.y == this.pointerCord.y ) {
      this.circleSprite.stop();
    }
    
  }
}
