import { Scene } from "phaser";

export default class Level1 extends Scene {
  constructor() {
    super("level1");
    this.characterSelect;
    this.target = new Phaser.Math.Vector2();
  }

  // Preload, create, uupdate functions ---------------------------------
  preload() {}

  create() {
    this.events.on("resize", this.resize, this);
    this.createMap();
    //circle sprite
    this.circleSprite = this.physics.add.sprite(500, 900, "circle");
    this.triangleSprite = this.physics.add.sprite(700, 900, "triangle");
    this.squareSprite = this.physics.add.sprite(300, 900, "square");
    this.circleMoveSetup();
    this. squareMoveSetup()
    
  }

  update() {
    this.spriteMoveTo();
    this.circleMoves();
  }

  //---------------------------------------------------------------------

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

  // sprite move functions -------------------------------------------

  circleMoveSetup() {
    
    this.circleSprite.setInteractive();
    this.squareSprite.setInteractive();

    this.circleSprite.on(
      "pointerdown",
      function () {
        this.circleSprite.selected = !this.circleSprite.selected;
        this.characterSelect = this.circleSprite;

        if (
          this.circleSprite.selected === true &&
          this.characterSelect === this.circleSprite
          
        ) {
          this.circleSprite.setTint(0xff00ff);
          this.squareSprite.clearTint();
        }
        if (this.circleSprite.selected === false || this.characterSelect != this.circleSprite) {
          this.characterSelect = "none";
          this.circleSprite.clearTint();
        }
      },
      this
    );

   
  }
  squareMoveSetup() {
    this.squareSprite.on(
      "pointerdown",
      function () {
        this.squareSprite.selected = !this.squareSprite.selected;
        this.characterSelect = this.squareSprite;

        if (
          this.squareSprite.selected === true &&
          this.characterSelect === this.squareSprite
        ) {
          this.squareSprite.setTint(0xff00ff);
          this.circleSprite.clearTint();
        }
        if (this.squareSprite.selected === false) {
          this.characterSelect = "none";
          this.squareSprite.clearTint();
        }
      },
      this
    );

  }


  spriteMoveTo() {
    if (this.characterSelect == this.circleSprite) {
      this.input.on(
        "pointerdown",
        function (pointer) {
          this.target.x = pointer.x;
          this.target.y = pointer.y;
          this.physics.moveToObject(this.circleSprite, this.target, 400);
        },
        this
      );
    } else {
      this.input.on(
        "pointerdown",
        function (pointer) {
          this.target.x = pointer.x;
          this.target.y = pointer.y;
          this.physics.moveToObject(this.circleSprite, this.target, 0);
        },
        this
      );
    }
  }

  circleMoves() {
    this.distance = Phaser.Math.Distance.Between(
      this.circleSprite.x,
      this.circleSprite.y,
      this.target.x,
      this.target.y
    );
    if (this.circleSprite.body.speed > 0) {
      //  4 is our distance tolerance, i.e. how close the source can get to the this.target
      //  before it is considered as being there. The faster it moves, the more tolerance is required.

      if (this.distance < 4) {
        this.circleSprite.body.reset(this.target.x, this.target.y);
      }
    }
  }
  //------------------------------------------------------------------------------------------------------------
}
