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
    this.draw();
    this.scene.add.existing(this.bar);
  }
  objects() {
    this.length = 600;
    this.unit = (this.length - 5) / this.threeStar;
    this.bar = new Phaser.GameObjects.Graphics(this.scene);

    //star
    this.starSFX = this.scene.sound.add("star", { volume: 0.2 });
    this.s1Pos = this.length - (this.oneStar - this.threeStar) * this.unit;
    this.s2Pos = this.length - (this.twoStar - this.threeStar) * this.unit;

    this.stars = {
      f: this.scene.add
        .image(this.x, this.y + 50, "feather")
        .setDepth(22)
        .setScale(0.15)
        .setAngle(50),
      s1: this.scene.add
        .image(this.x + this.s1Pos, this.y + 50, "star")
        .setDepth(22)
        .setScale(0.2),

      s2: this.scene.add
        .image(this.x + this.s2Pos, this.y + 50, "star")
        .setDepth(22)
        .setScale(0.2),

      s3: this.scene.add
        .image(this.x + this.length, this.y + 50, "star")
        .setDepth(22)
        .setScale(0.2),
    };
    // Mark off already gotten stars
    if (
      this.scene.scene
        .get("levelMap")
        .localStorage.getItem(`${this.scene.key}R`) == 3
    ) {
      this.stars.s1.setAlpha(0.3);
      this.stars.s2.setAlpha(0.3);
      this.stars.s3.setAlpha(0.3);
    }
    if (
      this.scene.scene
        .get("levelMap")
        .localStorage.getItem(`${this.scene.key}R`) == 2
    ) {
      this.stars.s1.setAlpha(0.3);
      this.stars.s2.setAlpha(0.3);
    }
    if (
      this.scene.scene
        .get("levelMap")
        .localStorage.getItem(`${this.scene.key}R`) == 1
    ) {
      this.stars.s1.setAlpha(0.3);
    } else {
    }
    if (
      this.scene.scene
        .get("levelMap")
        .localStorage.getItem(`${this.scene.key}F`) == 1
    ) {
      this.stars.f.setAlpha(0.5);
    } else {
    }

    //Animate Stars
    this.fTween = this.scene.tweens.add({
      targets: this.stars.f,
      angle: { start: 50, from: 80, to: 20 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.starTween1 = this.scene.tweens.add({
      targets: this.stars.s1,
      angle: { star: 0, from: 30, to: -30 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.starTween2 = this.scene.tweens.add({
      targets: this.stars.s2,
      angle: { star: 0, from: 30, to: -30 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.starTween3 = this.scene.tweens.add({
      targets: this.stars.s3,
      angle: { star: 0, from: 30, to: -30 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  draw() {
    //BG
    this.bar.clear();
    this.bar.setDepth(17);
    this.bar.fillStyle(0x000000, 0.3);
    this.bar.fillRect(this.x, this.y, this.length, 100);

    //  Health Bar
    this.bar.fillStyle(0xffffff, 0.3);
    this.bar.fillRect(this.x + 2, this.y + 2, 595, 95);
    this.bar.fillStyle(0x643dff, 0.6);

    if (this.scene.scoreBox.totalMoves + 1 < this.threeStar) {
      this.value = this.length - 5;
      this.bar.fillRect(this.x + 2, this.y + 2, this.value, 95);
    } else {
      if (this.value > 0) {
        this.value =
          this.length -
          5 -
          ((this.scene.scoreBox.totalMoves + 1) * this.unit -
            (this.length - 5));

        this.bar.fillRect(this.x + 2, this.y + 2, this.value, 95);
      } else {
      }
    }

    //Stars
    this.starDestroy(this.threeStar, this.starTween3, this.stars.s3);
    this.starDestroy(this.twoStar, this.starTween2, this.stars.s2);
    this.starDestroy(this.oneStar, this.starTween1, this.stars.s1);
  }
  starDestroy(count, tween, star) {
    if (this.scene.scoreBox.totalMoves === count) {
      tween.stop();
      this.scene.tweens.add({
        targets: star,
        scale: { star: 0.2, from: 0.1, to: 0.3 },
        duration: 500,
        yoyo: true,
        repeat: 0,
        ease: "Sine.easeInOut",
      });
      this.starSFX.play();
      var timer = this.scene.time.addEvent({
        delay: 500,
        callback: () => star.destroy(),
        callbackScope: this,
      });
    } else {
    }
  }

  starNumCal() {
    if (this.scene.scoreBox.totalMoves <= this.threeStar) {
      return 3;
    }
    if (
      this.scene.scoreBox.totalMoves <= this.twoStar &&
      this.scene.scoreBox.totalMoves > this.threeStar
    ) {
      return 2;
    }
    if (
      this.scene.scoreBox.totalMoves <= this.oneStar &&
      this.scene.scoreBox.totalMoves > this.twoStar
    ) {
      return 1;
    } else {
      return 0;
    }
  }
}
