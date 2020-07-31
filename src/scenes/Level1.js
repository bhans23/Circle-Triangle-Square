import { Scene } from "phaser";
import spriteCreation from "../logic/spriteCreation";

export default class Level1 extends Scene {
  constructor() {
    super("level1");
  }

  // Preload, create, update functions ---------------------------------
  preload() {}

  create() {
    this.target = new Phaser.Math.Vector2();
    this.events.on("resize", this.resize, this);
    this.createMap();
    //sprite
    this.spriteSelection = [
      new spriteCreation({ scene: this, x: 300, y: 900, key: "circle" }),
      new spriteCreation({ scene: this, x: 500, y: 900, key: "square" }),
      new spriteCreation({ scene: this, x: 700, y: 900, key: "triangle" }),
    ];
    this.spriteMoveTo();
  }

  update() {
    this.spriteMoves();
  }

  //---------------------------------------------------------------------

  // handlePointerDown(spriteSelection) {
  //   this.spriteSelection.forEach((rockSprite) => {
  //     if (rockSprite === spriteSelection) {
  //       rockSprite.select();
  //     } else {
  //       rockSprite.deselect();
  //     }
  //   });
  // }

  spriteMoveTo() {
    this.spriteSelection.forEach((sprite) => {
      sprite.setInteractive();
      this.input.on(
        "pointerdown",
        function (pointer) {
          this.target.x = pointer.x;
          this.target.y = pointer.y;
          this.physics.moveToObject(sprite, this.target, 400);
        },
        this
      );
    });
  }

  spriteMoves() {
    this.spriteSelection.forEach((sprite) => {
      this.distance = Phaser.Math.Distance.Between(
        sprite.x,
        sprite.y,
        this.target.x,
        this.target.y
      );
      if (sprite.body.speed > 0) {
        //  4 is our distance tolerance, i.e. how close the source can get to the this.target
        //  before it is considered as being there. The faster it moves, the more tolerance is required.

        if (this.distance < 4) {
          sprite.body.reset(this.target.x, this.target.y);
        }
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
