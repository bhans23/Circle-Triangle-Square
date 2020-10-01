import Phaser from "phaser";
import { config } from "process";

export default class spriteCreation extends Phaser.Physics.Arcade.Sprite {
  constructor(spriteValues) {
    super(spriteValues.scene, spriteValues.x, spriteValues.y, spriteValues.key);
    spriteValues.scene.add.existing(this);
    spriteValues.scene.physics.add.existing(this);
    this.spriteValues = spriteValues;
    this.scene = this.spriteValues.scene;
    this.gB = spriteValues.gB;
    this.graphics = this.scene.add.graphics().setDepth(1);
    this.speed = null;
    this.target = new Phaser.Math.Vector2();
    this.depth = spriteValues.depth;
    this.bodySize = spriteValues.bodySize;
    this.introSq = spriteValues.introSq;
    this.attributes();

    
  }
  preload() {}

  create() {}

  update() {
    this.spriteMoves();
  }

  select() {
    this.setTint(0x0e9c2a);
  }

  deselect() {
    this.clearTint();
    this.graphics.clear();
  }

  attributes() {
    this.setDepth(this.depth);
    this.setBodySize(this.bodySize.x, this.bodySize.y);
  }
  moveDirection() {
    if (
      this.body.velocity.x >= 0 &&
      this.body.velocity.y < 0 &&
      this.isTinted
    ) {
      this.setAngle(0);
    }
    if (
      this.body.velocity.x >= 0 &&
      this.body.velocity.y === 0 &&
      this.isTinted
    ) {
      this.setAngle(90);
    }
    if (
      this.body.velocity.x < 0 &&
      this.body.velocity.y >= 0 &&
      this.isTinted
    ) {
      this.setAngle(-90);
    }
    if (
      this.body.velocity.x >= 0 &&
      this.body.velocity.y > 0 &&
      this.isTinted
    ) {
      this.setAngle(180);
    }
    if (this.isTinted) {
      this.rockMove.pause();
    }
  }
  intro() {
    this.target.x = this.introSq.x;
    this.target.y = this.introSq.y;
    this.scene.physics.moveTo(this, this.target.x, this.target.y, 400);
    this.play("roll");
  }

  moves(x, y) {
    //filter out available moves and border
    this.selectedSquare = this.gB.sqNum.indexOf(this.gB.sqNum[this.scene.spSq]);

    //Removing border squares
    this.availableMoves = this.gB.sqIndex.filter(
      (x) => x < this.gB.sqIndex.length - this.gB.rows
    );
    this.availableMoves = this.availableMoves.filter((x) => x > this.gB.rows);
    for (let i = 0; i < this.gB.sqIndex.length; i = i + this.gB.rows) {
      this.availableMoves = this.availableMoves.filter(
        (x) => x !== this.gB.sqIndex[i]
      );
    }
    for (let i = -1; i < this.gB.sqIndex.length; i = i + this.gB.rows) {
      this.availableMoves = this.availableMoves.filter(
        (x) => x !== this.gB.sqIndex[i]
      );
    }
    //Adding exit
    const compareNumbers = (a, b) => a - b;

    this.availableMoves.push(this.gB.exit);
    this.availableMoves = this.availableMoves.sort(compareNumbers);

    // Filtering out only sprite specific moves squares
    this.availableMoves = this.availableMoves.filter(
      (x) =>
        x === this.selectedSquare - 1 ||
        x === this.selectedSquare + 1 ||
        x === this.selectedSquare + this.gB.rows ||
        x === this.selectedSquare - this.gB.rows
    );

    // console.log(this.availableMoves)

    // Add highlights to squares
    this.graphics.clear();
    if (this.isTinted === true) {
      this.availableMoves.map((x) => {
        if (x === this.gB.exit || x === this.gB.altar) {
          this.graphics.fillStyle(0xf5e102, 0.6);
          this.graphics.fillRectShape(this.gB.sqNum[x]);
        } else {
          this.graphics.fillStyle(0x419ef0, 0.6);
          this.graphics.fillRectShape(this.gB.sqNum[x]);
        }
      });
    }
  }
  spriteMoves() {
    this.distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );
    // console.log(this.squareSelected.x)
    if (this.body.speed > 0) {
      //  4 is our distance tolerance, i.e. how close the source can get to the this.target
      //  before it is considered as being there. The faster it moves, the more tolerance is required.

      if (this.distance < 10) {
        this.body.reset(this.target.x, this.target.y);
      }
    }
    if (this.distance > 0 && this.body.speed > 0) {
      this.graphics.clear();

      if (this.distance < 20) {
        this.scene.getSpriteSquare(this);
        this.moves();
      } else {
      }
    }
  }
}
