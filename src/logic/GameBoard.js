import Phaser from "phaser";

export default class GameBoard {
  constructor(config) {
    this.rows = config.rows;
    this.cols = config.cols;
    this.sqW = config.sqW;
    this.sqH = config.sqH;
    this.scene = config.scene;
    this.exit = config.exit;
    this.altar = config.altar;
    this.firstSq = config.firstSq;
    this.squareBoard();
    // this.numbers();
  }

  squareBoard() {
    //Creating array with number of squares
    let num = 0;
    this.sqIndex = Array(this.rows * this.cols)
      .fill(num)
      .map((x) => (x = num++));
    this.sqNum = Array(this.rows * this.cols)
      .fill(num)
      .map((x) => (x = num++));
    let num4 = 0;
    this.squareMatrix = Array(this.rows)
      .fill([])
      .map(
        (x) =>
          (x = Array(this.rows)
            .fill(null)
            .map((x) => (x = num4++)))
      );
    this.squareMatrix = Phaser.Utils.Array.Matrix.TransposeMatrix(
      this.squareMatrix
    );

    //Creating Geometric square objects on each square coordinates
    let num2 = 0;
    let num3 = 0;
    const compareNumbers = (a, b) => a - b;
    let ySq = Array(this.rows)
      .fill(num3)
      .map((x) => (x = num3++ * this.sqH));
    ySq = Array(this.rows).fill(ySq);
    ySq = ySq.flat().sort(compareNumbers);

    let xSq = Array(this.rows)
      .fill(num2)
      .map((x) => (x = num2++ * this.sqW));
    xSq = Array(this.rows).fill(xSq);
    xSq = xSq.flat();

    for (let i = 0; i < this.sqNum.length; i++) {
      this.sqNum[i] = new Phaser.GameObjects.Rectangle(
        this.scene,
        xSq[i] + this.firstSq.x,
        ySq[i] + this.firstSq.y,
        this.sqW,
        this.sqH
      );

      this.scene.add.existing(this.sqNum[i]);
      this.scene.physics.add.existing(this.sqNum[i]);
    }
  }

  numbers() {
    for (let i = 0; i < this.sqNum.length; i++) {
      this.scene.add
        .text(this.sqNum[i].x, this.sqNum[i].y, i, {
          fontFamily: "Arial",
          fontSize: 25,
          color: "#ffffff",
        })

        .setDepth(20);
    }
  }
}
