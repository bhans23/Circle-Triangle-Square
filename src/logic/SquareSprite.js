import Phaser from "phaser";
import spriteCreation from "./spriteCreation";

export default class SquareSprite extends spriteCreation {
  constructor(spriteValues) {
    super(spriteValues);
    this.gB = spriteValues.gB;
    this.graphics = this.scene.add.graphics().setDepth(1);
    this.speed = null;
  }

  moves(speed) {
    this.speed = speed;
    //filter out available moves
    this.selectedSquare = this.gB.sqNum.indexOf(this.gB.sqNum[this.scene.sqI]);
    this.availableMoves = this.gB.sqIndex.filter(
      (x) =>
        x === this.selectedSquare - 1 ||
        x === this.selectedSquare + 1 ||
        x === this.selectedSquare + this.gB.rows ||
        x === this.selectedSquare - this.gB.rows
    );
    this.nonAvailMoves = this.gB.sqIndex.filter(
      (x) => !this.availableMoves.includes(x)
    );
    // Add highlights to squares
    this.graphics.clear();
    this.graphics.fillStyle(0x2f40de, 0.6);
    this.availableMoves.map((x) =>
      this.graphics.fillRectShape(this.gB.sqNum[x])
    );
  }
}
