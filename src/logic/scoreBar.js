import Phaser from "phaser";

export default class scoreBar {
  constructor(config) {
    this.scene = config.scene;
    this.x = config.location.x;
    this.y = config.location.y;
    this.oneStar = config.stars.one;
    this.twoStar = config.stars.two;
    this.threeStar = config.stars.three;
    this.objects();

    this.scene.add.existing(this.bar);
  }
  objects() {
    this.length = 600;
    this.unit = (this.length - 5) / this.threeStar;
    this.bar = new Phaser.GameObjects.Graphics(this.scene);
    //star
    this.s1Pos = (this.threeStar / this.oneStar) * this.length;
    this.s2Pos = this.length - (this.twoStar - this.threeStar) * this.unit;

    this.stars = {
      s1: this.scene.add
        .image(this.x, this.y + 50, "star")
        .setDepth(18)
        .setScale(0.2),

      s2: this.scene.add
        .image(this.x + this.s2Pos, this.y + 50, "star")
        .setDepth(18)
        .setScale(0.2),

      s3: this.scene.add
        .image(this.x + this.length, this.y + 50, "star")
        .setDepth(18)
        .setScale(0.2),
    };
    this.starTween1 = this.scene.tweens.add({
      targets: [this.stars.s1, this.stars.s2, this.stars.s3],
      angle: {star: 0,from: 30, to: -30},
      duration:2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }
  draw() {
    //BG
    this.bar.clear();

    this.bar.setDepth(17);
    this.bar.fillStyle(0x000000, 0.5);
    this.bar.fillRect(this.x, this.y, this.length, 100);

    //  Health Bar

    this.bar.fillStyle(0xffffff, 0.5);
    this.bar.fillRect(this.x + 2, this.y + 2, 595, 95);
    this.bar.fillStyle(0x643dff, 0.6);

    if (this.scene.scoreBox.totalMoves < this.threeStar) {
      this.value = this.length - 5;
      this.bar.fillRect(this.x + 2, this.y + 2, this.value, 95);
    } else {
      if (this.value > 0) {
        this.value =
          this.length -
          5 -
          (this.scene.scoreBox.totalMoves * this.unit - (this.length - 5));

        this.bar.fillRect(this.x + 2, this.y + 2, this.value, 95);
      } else {
      }
    }
    //Stars
    if (this.scene.scoreBox.totalMoves > this.threeStar) {
      this.stars.s3.destroy();
    } else {
    }
    if (this.scene.scoreBox.totalMoves > this.twoStar) {
      this.stars.s2.destroy();
    } else {
    }
  }
}
