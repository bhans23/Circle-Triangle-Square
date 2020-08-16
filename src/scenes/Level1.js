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
    
    
    this.gB = new GameBoard({rows: 6, cols: 6, sqW: 200, sqH: 200}) 
    this.gB.squareBoard()
    var graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
    this.gB.sqNum.map(x => graphics.fillRectShape(x));
    this.target = new Phaser.Math.Vector2();
    this.events.on("resize", this.resize, this);
    // this.createMap();
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
        sprite.setTint(0x32a852);
        this.spriteSpeed(sprite, 400);
      }
      if (sprite !== selectedSprite || sprite.selected === false) {
        sprite.clearTint();
        this.spriteSpeed(sprite, 0);
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

  spriteSpeed(sprite, speed) {
    this.input.on(
      "pointerdown",
      function (pointer) {
        //Converting pointer x value to a center value
        this.singleDigitX = Math.floor(Math.floor(pointer.x) / 100);
        this.centerX = Math.floor(this.singleDigitX / 2);
        //Converting pointer y value to a center value
        this.singleDigitY = Math.floor(Math.floor(pointer.y) / 100);
        this.centerY = Math.floor(this.singleDigitY / 2);
       
        
         this.squareSelected =  this.gB.sqNum[this.gB.squareMatrix[this.centerX][this.centerX]]
        
         console.log(this.squareSelected.x)
        this.physics.moveToObject(sprite, this.squareSelected, speed);
      },
      this
    );
  }

  spriteMoves() {
    this.spriteSelection.forEach((sprite) => {
      this.distance = Phaser.Math.Distance.Between(
        sprite.x,
        sprite.y,
        this.squareSelected.x,
        this.squareSelected.y
      );
      // console.log(this.squareSelected.x)
      if (sprite.body.speed > 0) {
        //  4 is our distance tolerance, i.e. how close the source can get to the this.target
        //  before it is considered as being there. The faster it moves, the more tolerance is required.

        if (this.distance < 4) {
          sprite.body.reset(this.squareSelected.x, this.squareSelected.y);
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
