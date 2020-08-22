import Phaser from "phaser";
import spriteCreation from "./spriteCreation";

export default class CircleSprite extends spriteCreation {
  constructor(spriteValues) {
    super(spriteValues);
    this.gB = spriteValues.gB;
  }

  moves() {
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
    if (this.body.speed > 0) {
      
      this.graphics.clear();
    } else {
      this.graphics.fillStyle(0xffff00, 0.2);
      this.availableMoves.map((x) =>
        this.graphics.fillRectShape(this.gB.sqNum[x])
      );
    }
  }
}
