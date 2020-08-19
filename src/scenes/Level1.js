import { Scene } from "phaser";
import spriteCreation from "../logic/spriteCreation";
import GameBoard from "../logic/GameBoard";


export default class Level1 extends Scene {
  constructor() {
    super("level1");
  }
  // Preload, create, update functions ---------------------------------
  preload() { }

  create() {
    this.gB = new GameBoard({ rows: 6, cols: 6, sqW: 200, sqH: 200 })
    this.gB.squareBoard()
    var graphics = this.add.graphics();
    // graphics.fillGradientStyle(0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 1);
    this.gB.sqNum.map(x => graphics.fillRectShape(x));

    for (let i = 0; i < this.gB.sqNum.length; i++) {
      this.add.text(this.gB.sqNum[i].x, this.gB.sqNum[i].y, i, { color: "#ffffff", fontSize: "30px"})
    }
    

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

  handlePointerDown(selectedSprite) {
    this.spriteSelection.forEach((sprite) => {
      if (sprite === selectedSprite) {
        sprite.select()
        this.pointerXY(sprite, 400)

      }
      if (sprite !== selectedSprite || sprite.selected === false) {
        this.pointerXY(sprite, 0)
        sprite.deselect()
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
          sprite.selected = !sprite.selected;
          this.handlePointerDown(sprite);
        },
        this
      );
    });
  }

  pointerXY(sprite, speed) {
    this.input.on(
      "pointerdown",
      function (pointer) {
        let sqX = Math.floor(pointer.x / this.gB.sqW);
        let sqY = Math.floor(pointer.y / this.gB.sqH);
        let sqI = this.gB.squareMatrix[sqX][sqY];

        sprite.target.x = this.gB.sqNum[sqI].centerX
        sprite.target.y = this.gB.sqNum[sqI].centerY
       
        console.log(this.gB.sqNum[sqI])
        console.log(sprite.target.y)


        this.physics.moveTo(sprite, sprite.target.x, sprite.target.y, speed);
      },
      this
    );
  }

  spriteMoves() {
    this.spriteSelection.forEach((sprite) => {
      sprite.update();
    })
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
