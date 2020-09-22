import Phaser from "phaser";
import spriteCreation from "./spriteCreation";

export default class CircleSprite extends spriteCreation {
  constructor(spriteValues) {
    super(spriteValues);
    this.gB = spriteValues.gB;
    this.graphics = this.scene.add.graphics().setDepth(1);
    this.speed = null;
    this.rockAnim();
  }
rockAnim () {
  var config = {
    key: "roll",
    frames: this.scene.anims.generateFrameNumbers("circleSheet", {
      start: 0,
      end: 59,
      first: 0,
    }),
    frameRate: 60,
    repeat: -1,
  };
  this.scene.rockMove = this.scene.anims.create(config);
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
        if(x === this.gB.exit || x === this.gB.altar) {
          this.graphics.fillStyle(0xf5e102, 0.6);
          this.graphics.fillRectShape(this.gB.sqNum[x]);
        } else {
          this.graphics.fillStyle(0x419ef0, 0.6);
          this.graphics.fillRectShape(this.gB.sqNum[x]);
        }
        

      });
    }
  }
}
