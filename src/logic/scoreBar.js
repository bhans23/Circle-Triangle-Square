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
     this.bar.setDepth(17)
     this.bar.fillStyle(0x000000,.5);
     this.bar.fillRect(this.x, this.y, 600, 100);

        //  Health

        this.bar.fillStyle(0xffffff,.5);
        this.bar.fillRect(this.x + 2, this.y + 2, 595, 95);
        
        this.bar.fillStyle(0x3aeb34,.8);
        this.bar.fillRect(this.x + 2, this.y + 2, 595/2, 95);

    

  }
}
