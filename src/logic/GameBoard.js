import Phaser from 'phaser';

export default class GameBoard {
    constructor(config) {
        this.rows = config.rows;
        this.cols = config.cols;
        this.sqW = config.sqW;
        this.sqH = config.sqH;
    }

    squareBoard() {
        //Creating array with number of squares
        let num = 0
        this.sqNum = Array(this.rows * this.cols).fill(num).map((x) => x = num++);
        let num4 = 0;
        this.squareMatrix = Array(this.rows).fill([]).map(x => x = Array(this.rows).fill(null).map(x => x = num4++))
        this.squareMatrix =  Phaser.Utils.Array.Matrix.TransposeMatrix(this.squareMatrix);
        console.log(this.squareMatrix);
        //Creating Geometric square objects on each square coordinates
        let num2 = 0
        let num3 = 0
        let xSq = Array(this.rows).fill(num3).map((x) => x = num3++ * this.sqH);
         xSq = Array(this.rows).fill(xSq);
        xSq = xSq.flat().sort()
        
       
        let ySq = Array(this.rows).fill(num2).map((x) => x = num2++ * this.sqH);
        ySq = Array(this.rows).fill(ySq);
        ySq = ySq.flat()
         
        for(let i = 0;i < this.sqNum.length; i++ ){
            this.sqNum[i] = new Phaser.Geom.Rectangle(xSq[i], ySq[i], this.sqW, this.sqH)

        }

       


        
       
       
        
       
    }
}