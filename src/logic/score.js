import Phaser from "phaser";
import spriteCreation from "./spriteCreation";

export default class score {
  constructor(config) {
    this.scene = config.scene;
    this.totalMoves = config.totalMoves;
    this.scoreBox();
  }
  addMove(sprite) {
    
   
      this.totalMoves++;
      this.box.clear();
      this.scoreText.destroy();
      this.scoreBox();
    
    
  }

  scoreBox() {
    //Box
    let rect = new Phaser.Geom.Rectangle(1000, 0, 200, 200);
    this.box = this.scene.add
      .graphics({ fillStyle: { color: 0xdbc997, alpha: 0.6 } })
      .setDepth(11);
    this.box.fillRectShape(rect);
    //text moves

    this.text = this.scene.add
      .text(1005, 70, "Moves Made:", {
        fontFamily: "Arial",
        fontSize: 32,
        color: "#ffffff",
      })
      .setDepth(13);

    this.scoreText = this.scene.add
      .text(1070, 110, this.totalMoves, {
        fontFamily: "Arial",
        fontSize: 70,
        color: "#ffffff",
      })
      .setDepth(13);
  }
}
