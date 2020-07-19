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
    this.circleMoveSetup();
  }

  update() {
    this.circleMoves();
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
    // backGroundLayer.setDepth(0);
    const topLayer = board.createStaticLayer("top", tilesPNG, 0, 0);
    // topLayer.setDepth(1);
  }

  circleMoveSetup() {
    this.target = new Phaser.Math.Vector2();

    console.log(this.circleSprite.selected);
    this.circleSprite.setInteractive();
    this.circleSprite.on(
      "pointerdown",
      function () {
        this.circleSprite.selected = !this.circleSprite.selected;

        if (this.circleSprite.selected === true) {
          this.circleSprite.setTint(0xff00ff);
          this.circleMoveTo();
        }
        if (this.circleSprite.selected === false) {
          this.circleSprite.clearTint();
        }
      },
      this
    );
  }

  circleMoveTo() {
    this.input.on(
      "pointerdown",
      function (pointer) {
        this.target.x = pointer.x;
        this.target.y = pointer.y;

        // Move at 200 px/s:
        this.physics.moveToObject(this.circleSprite, this.target, 400);
      },
      this
    );
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
}
