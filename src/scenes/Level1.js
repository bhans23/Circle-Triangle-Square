import { Scene } from "phaser";
import SquareSprite from "../logic/SquareSprite";
import CircleSprite from "../logic/CircleSprite";
import TriangleSprite from "../logic/TriangleSprite";
import GameBoard from "../logic/GameBoard";

export default class Level1 extends Scene {
  constructor() {
    super("level1");
  }
  // Preload, create, update functions ---------------------------------
  preload() {}

  create() {
    this.squareGameBoard();
    // this.higlightSquares()
    this.events.on("resize", this.resize, this);
    this.createMap();
    //sprite
    this.spriteSelection = [
      new SquareSprite({
        scene: this,
        x: 500,
        y: 900,
        key: "square",
        gB: this.gB,
      }).setDepth(2),
      // new CircleSprite({
      //   scene: this,
      //   x: 300,
      //   y: 900,
      //   key: "circle",
      //   gB: this.gB,
      // }).setDepth(2),
      // new TriangleSprite({
      //   scene: this,
      //   x: 700,
      //   y: 900,
      //   key: "triangle",
      //   gB: this.gB,
      // }).setDepth(2),
    ];
    this.spriteMoveTo();
  }

  update() {
    this.spriteMoves();
  }

  //--Sprite Move functions----------------------------------------------------

  handlePointerDown(selectedSprite) {
    this.spriteSelection.forEach((sprite) => {
      if (sprite === selectedSprite) {
        if (sprite.isTinted) {
          sprite.deselect();
          this.pointerXY(sprite, 0);
        } else {
          sprite.select();
          sprite.moves();
          this.pointerXY(sprite, 400);
        }
      }
      if (sprite !== selectedSprite) {
        sprite.deselect();
        this.pointerXY(sprite, 0);
      } else {
      }
    });
  }

  spriteMoveTo() {
    this.spriteSelection.forEach((sprite) => {
      sprite.setInteractive();
      sprite.on(
        "pointerdown",
        () => {
          this.getSpriteSquare(sprite);
          this.handlePointerDown(sprite);
        },
        this
      );
    });
  }
  getSpriteSquare(sprite) {
    let sqX = Math.floor(sprite.x / this.gB.sqW);
    let sqY = Math.floor(sprite.y / this.gB.sqH);
    this.spSq = this.gB.squareMatrix[sqX][sqY];
  }
  pointerXY(sprite, speed) {
    this.input.on(
      "pointerdown",
      function (pointer) {
        let sqX = Math.floor(pointer.x / this.gB.sqW);
        let sqY = Math.floor(pointer.y / this.gB.sqH);
        this.sqI = this.gB.squareMatrix[sqX][sqY];
        sprite.target.x = this.gB.sqNum[this.sqI].x + this.gB.sqW / 2;
        sprite.target.y = this.gB.sqNum[this.sqI].y + this.gB.sqH / 2;

        if (sprite.availableMoves.some((x) => x === this.sqI)) {
          this.physics.moveTo(sprite, sprite.target.x, sprite.target.y, speed);
        }
      },
      this
    );
  }

  spriteMoves() {
    this.spriteSelection.forEach((sprite) => {
      sprite.update();
    });
  }
  // ----------------------------------------------------------------
  // Game Board Squares Moves Functions -------------------------
  // higlightSquares() {
  //   this.input.on("pointerover", function (event, gameObjects) {
  //     gameObjects[0].setTint(0xff0000);
  //   });
  //   this.input.on("pointerout", function (event, gameObjects) {
  //     gameObjects[0].clearTint();
  //   });
  // }

  squareGameBoard() {
    this.gB = new GameBoard({
      rows: 6,
      cols: 6,
      sqW: 200,
      sqH: 200,
      scene: this,
    });
    this.gB.squareBoard();
    this.gB.sqNum.map((x) => x.setDepth(10));

    for (let i = 0; i < this.gB.sqNum.length; i++) {
      this.add
        .text(this.gB.sqNum[i].x, this.gB.sqNum[i].y, i, {
          color: "#ffffff",
          fontSize: "30px",
        })
        .setDepth(1);
    }
  }

  //--------------------------------------------------------------------
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
