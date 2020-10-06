import Phaser from "phaser";

export default class scoreBar {
  constructor(config) {
    this.scene = config.scene;
    this.x = config.location.x;
    this.y = config.location.y;
    this.oneStar = config.stars.one;
    this.twoStar = config.stars.two;
    this.threeStar = config.stars.two;
    this.bar = new Phaser.GameObjects.Graphics(this.scene);
    this.draw();
    this.scene.add.existing(this.bar);
  }

  draw() {
    //BG
    this.bar.clear();
    let length = 600;
    this.bar.setDepth(17);
    this.bar.fillStyle(0x000000, 0.5);
    this.bar.fillRect(this.x, this.y, length, 100);

    //  Health

    this.bar.fillStyle(0xffffff, 0.5);
    this.bar.fillRect(this.x + 2, this.y + 2, 595, 95);

    this.bar.fillStyle(0x3aeb34, 0.8);
    

    if (this.scene.scoreBox.totalMoves < (this.threeStar - 1)) {
      this.value = length - 5;
      this.bar.fillRect(this.x + 2, this.y + 2, this.value, 95);
    } else {
      this.value = this.value - ((length - 5) / this.threeStar);
      

      if (this.value > 0) {
        this.bar.fillRect(this.x + 2, this.y + 2, this.value, 95);
      } else {
      }
    }
    console.log(this.value);
  }
}
