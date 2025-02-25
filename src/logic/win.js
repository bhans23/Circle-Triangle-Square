import Phaser from "phaser";

export default class win {
  constructor(config) {
    this.config = config;
    this.scene = config.scene;
    this.gB = config.gB;
    this.key = config.key;

    this.winCon();
  }

  winCon() {
    if (
      this.scene.spriteSelection.x ===
        this.gB.sqNum[this.gB.exit].x + this.gB.sqW / 2 &&
      this.scene.spriteSelection.y ===
        this.gB.sqNum[this.gB.exit].y + this.gB.sqH / 2
    ) {
      this.scene.spriteSelection.target.x = this.config.leave.x;
      this.scene.spriteSelection.target.y = this.config.leave.y;
      this.scene.physics.moveTo(
        this.scene.spriteSelection,
        this.scene.spriteSelection.target.x,
        this.scene.spriteSelection.target.y,
        400
      );
      this.scene.spriteSelection.play("roll");
      this.scene.scene.get("levelMap").localStorage.setItem(this.key, this.key);

      //Removing addMove function, so it does not add an additional move at the end of level
      this.scene.scoreBox.addMove = () => {};

      var timer = this.scene.time.addEvent({
        delay: 300,
        callback: () => this.winScreen(),
        callbackScope: this.scene,
      });
    }
  }

  winScreen() {
    this.drawNum();
    //Audio events
    this.starEarnSFX = this.scene.sound.add("starEarn");
    this.starEarnSFX.play({ volume: 0.1 });
    this.starEarnSFX2 = this.scene.sound.add("starEarn2");
    this.starEarnSFX2.play({ volume: 0.3 });
    this.scene.sound.stopAll();
    this.winMusic = this.scene.sound.add("win");

    this.winMusic.play({ volume: 0.7 });

    //Pause events
    this.scene.menu.box.off("pointerdown");
    this.scene.menu.box2.off("pointerdown");
    this.scene.input.off("pointerdown");
    let bg = this.scene.add
      .rectangle(0, 0, 1200, 2160, 0x000000, 0.5)
      .setDepth(20)
      .setOrigin(0);
      this.scene.add
      .image(0, 600, "stoneBg")
      .setOrigin(0)
      .setScale(0.6, 0.4)
      .setDepth(20)
    let box = new Phaser.GameObjects.Rectangle(
      this.scene,
      50,
      650,
      1100,
      750,
      0xffffff,
      0.55
    )
      .setDepth(21)
      .setOrigin(0)
      .setScale(0);

    this.scene.tweens.add({
      targets: box,
      scale: { start: 0, from: 0, to: 1 },
      duration: 1000,
      repeat: 0,
      ease: "Sine.easeInOut",
    });
    this.scene.add.existing(box);

    this.scene.tweens.add({
      targets: [
        this.scene.scoreBar.stars.f,
        this.scene.scoreBar.stars.s1,
        this.scene.scoreBar.stars.s2,
        this.scene.scoreBar.stars.s3,
      ],
      y: { start: 0, from: 0, to: 675 },
      duration: 1000,
      repeat: 0,
      ease: "Sine.easeInOut",
      onCompleteScope: this,
      onComplete: this.animateRewards,
    });
    this.buttons();
    this.rewards();
  }

  rewards() {
    //Stars

    this.scene.add
      .rectangle(1000, 800, 200, 200, 0xffffff, 0.5)
      .setOrigin(0)
      .setDepth(22);
    this.star = this.scene.add
      .image(1060, 900, "star")
      .setScale(0.16)
      .setDepth(22);
    this.scene.tweens.add({
      targets: this.star,
      angle: { start: 0, from: -15, to: 15 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    //Feather
    this.scene.add
      .rectangle(0, 800, 200, 200, 0xffffff, 0.5)
      .setOrigin(0)
      .setDepth(22);
    this.feather = this.scene.add
      .image(65, 900, "feather")
      .setScale(0.14)
      .setDepth(22);
    this.scene.tweens.add({
      targets: this.feather,
      angle: { start: 0, from: -15, to: 15 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  buttons() {
    //Main menu

    let box1 = this.scene.add
      .sprite(300, 1050, "button")
      .setDepth(21)
      .setOrigin(0);
    let map = this.scene.add
      .sprite(315, 1065, "map")
      .setDepth(22)
      .setOrigin(0)
      .setScale(0.16);

    box1.displayWidth = 125;
    box1.displayHeight = 125;

    box1.setInteractive();
    box1.on("pointerdown", () => {
      this.scene.scene.start("levelMap");
    });

    //Restart level

    let box2 = this.scene.add
      .sprite(550, 1050, "button")
      .setDepth(21)
      .setOrigin(0);
    let redo = this.scene.add
      .sprite(560, 1065, "redo")
      .setDepth(22)
      .setOrigin(0)
      .setScale(0.5);

    box2.displayWidth = 125;
    box2.displayHeight = 125;

    box2.setInteractive();
    box2.on("pointerdown", () => {
      this.scene.scene.start(this.scene.key);
    });

    //Next level
    let box3 = this.scene.add
      .sprite(800, 1050, "button")
      .setDepth(21)
      .setOrigin(0);
    let next = this.scene.add
      .sprite(810, 1060, "next")
      .setDepth(22)
      .setOrigin(0)
      .setScale(0.5);

    box3.displayWidth = 125;
    box3.displayHeight = 125;

    box3.setInteractive();
    box3.on("pointerdown", () => {
      this.scene.scene.start(this.scene.keyWin);
    });
  }
  animateRewards() {
    let featherComplete = (tw, target, sprite) => {
      sprite.destroy();

      this.scene.tweens.add({
        targets: this.feather,
        scale: { from: 0.16, to: 0.25 },
        yoyo: true,
        duration: 100,
        ease: "Sine.easeInOut",
        onCompleteScope: this,
        onStart: this.updateFeather(),
        onComplete: this.starAnimate,
      });
    };
    let featherCount = parseInt(
      this.scene.scene
        .get("levelMap")
        .localStorage.getItem(`${this.scene.key}R`),
      10
    );
    //feather
    if (this.scene.scoreBar.stars.f.alpha === 1) {
      this.scene.tweens.add({
        targets: this.scene.scoreBar.stars.f,
        x: { from: this.scene.scoreBar.stars.f.x, to: this.feather.x },
        y: { from: this.scene.scoreBar.stars.f.y, to: this.feather.y },
        scale: { from: 0.4, to: 0 },
        duration: 300,
        ease: "Sine.easeInOut",
        onStart: () => this.starEarnSFX2.play({ volume: 0.3 }),
        onComplete: featherComplete,
        onCompleteParams: [this.scene.scoreBar.stars.f],
      });
    } else {
      this.starAnimate();
    }
  }

  starAnimate() {
    let star1Complete = (tw, target, sprite) => {
      sprite.destroy();
      console.log(this.star);
      this.scene.tweens.add({
        targets: this.star,
        scale: { from: 0.16, to: 0.25 },
        yoyo: true,
        duration: 100,
        ease: "Sine.easeInOut",
        onStartScope: this,
        onStart: this.updateStar,
      });
    };

    let star1 = () => {
      if (this.scene.scoreBar.stars.s1.alpha === 1) {
        this.scene.tweens.add({
          targets: this.scene.scoreBar.stars.s1,
          x: { from: this.scene.scoreBar.stars.s1.x, to: this.star.x },
          y: { from: this.scene.scoreBar.stars.s1.y, to: this.star.y },
          scale: { from: 0.4, to: 0 },
          duration: 300,
          ease: "Sine.easeInOut",
          onStart: () => this.starEarnSFX2.play({ volume: 0.3 }),
          onComplete: star1Complete,
          onCompleteParams: [this.scene.scoreBar.stars.s1],
        });
      }
    };
    let star2Complete = (tw, target, sprite) => {
      sprite.destroy();

      this.scene.tweens.add({
        targets: this.star,
        scale: { from: 0.16, to: 0.25 },
        yoyo: true,
        duration: 100,
        ease: "Sine.easeInOut",
        onStartScope: this,
        onStart: this.updateStar,
        onComplete: star1,
      });
    };
    let star2 = () => {
      if (this.scene.scoreBar.stars.s2.alpha === 1) {
        this.scene.tweens.add({
          targets: this.scene.scoreBar.stars.s2,
          x: { from: this.scene.scoreBar.stars.s2.x, to: this.star.x },
          y: { from: this.scene.scoreBar.stars.s2.y, to: this.star.y },
          scale: { from: 0.4, to: 0 },
          duration: 300,
          ease: "Sine.easeInOut",
          onStart: () => this.starEarnSFX2.play({ volume: 0.3 }),
          onComplete: star2Complete,
          onCompleteParams: [this.scene.scoreBar.stars.s2],
        });
      } else {
      }
    };
    let star3Complete = (tw, target, sprite) => {
      sprite.destroy();
      console.log(this.star);
      this.scene.tweens.add({
        targets: this.star,
        scale: { from: 0.16, to: 0.25 },
        yoyo: true,
        duration: 100,
        ease: "Sine.easeInOut",
        onStartScope: this,
        onStart: this.updateStar,
        onComplete: star2,
      });
    };
    let starCount = parseInt(
      this.scene.scene
        .get("levelMap")
        .localStorage.getItem(`${this.scene.key}R`),
      10
    );
    console.log(
      this.scene.scene
        .get("levelMap")
        .localStorage.getItem(`${this.scene.key}R`)
    );

    if (
      (starCount < 3 || Number.isInteger(starCount) === false) &&
      this.scene.scoreBar.starNumCal() === 3
    ) {
      this.scene.tweens.add({
        targets: this.scene.scoreBar.stars.s3,
        x: { from: this.scene.scoreBar.stars.s3.x, to: this.star.x },
        y: { from: this.scene.scoreBar.stars.s3.y, to: this.star.y },
        scale: { from: 0.4, to: 0 },
        duration: 300,
        ease: "Sine.easeInOut",
        onStart: () => this.starEarnSFX2.play({ volume: 0.3 }),
        onComplete: star3Complete,
        onCompleteParams: [this.scene.scoreBar.stars.s3],
      });
    } else if (
      (starCount < 2 || Number.isInteger(starCount) === false) &&
      this.scene.scoreBar.starNumCal() === 2
    ) {
      star2();
    } else if (
      (starCount < 1 || Number.isInteger(starCount) === false) &&
      this.scene.scoreBar.starNumCal() === 1
    ) {
      star1();
    } else {
    }
    this.updateTotals();
  }
  updateStar() {
    this.starEarnSFX.play({ volume: 0.3 });

    this.starItem = this.scene.scene
      .get("levelMap")
      .localStorage.getItem("stars");

    this.convertZero(this.starItem);

    let starNumber = parseInt(
      this.scene.scene.get("levelMap").localStorage.getItem("stars"),
      10
    );
    console.log(starNumber);
    starNumber++;

    let starString = starNumber.toString();
    console.log(starString);
    this.scene.scene.get("levelMap").localStorage.setItem("stars", starString);
    this.textCreate();
  }
  convertZero(starItem) {
    if (starItem === null) {
      this.scene.scene.get("levelMap").localStorage.setItem("stars", "0");

      return this.starItem;
    } else {
    }
  }

  updateFeather() {
    this.starEarnSFX.play({ volume: 0.3 });

    this.featherItem = this.scene.scene
      .get("levelMap")
      .localStorage.getItem("stars");

    this.convertFeatherZero(this.featherItem);

    let featherNumber = parseInt(
      this.scene.scene.get("levelMap").localStorage.getItem("feather"),
      10
    );

    featherNumber++;

    let featherString = featherNumber.toString();

    this.scene.scene
      .get("levelMap")
      .localStorage.setItem("feather", featherString);
    this.textCreate();
  }
  convertFeatherZero(item) {
    if (item === null) {
      this.scene.scene.get("levelMap").localStorage.setItem("feather", "0");

      return this.featherItem;
    } else {
    }
  }
  textCreate() {
    this.starNum.destroy();
    this.fCount.destroy();
    this.drawNum();
  }

  drawNum() {
    //Star Numbers
    this.starNum = this.scene.add
      .text(
        1120,
        875,
        this.scene.scene.get("levelMap").localStorage.getItem("stars"),
        {
          fontFamily: "Arial",
          fontSize: 48,
          color: "#000000",
        }
      )
      .setDepth(24);

    //feathers
    this.fCount = this.scene.add
      .text(
        130,
        875,
        this.scene.scene.get("levelMap").localStorage.getItem("feather"),
        {
          fontFamily: "Arial",
          fontSize: 48,
          color: "#000000",
        }
      )
      .setDepth(24);
  }
  // //Update totals
  updateTotals() {
    this.scene.scene
      .get("levelMap")
      .localStorage.setItem(
        `${this.scene.key}R`,
        this.scene.scoreBar.starNumCal()
      );
    this.scene.scene
      .get("levelMap")
      .localStorage.setItem(`${this.scene.key}F`, 1);
  }
}
