import Phaser from "phaser";
import spriteCreation from "./spriteCreation";

export default class CircleSprite extends spriteCreation {
  constructor(spriteValues) {
    super(spriteValues);
    this.gB = spriteValues.gB;
    this.graphics = this.scene.add.graphics().setDepth(1);
    this.speed = null;
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
    
    // Filtering out only sprite specific moves squares
    this.availableMoves = this.availableMoves.filter(
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
