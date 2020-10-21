import Phaser from "phaser";
export default class levelMap extends Phaser.Scene {
  constructor() {
    super("levelMap");
  }

  preload() {}

  create() {
    // Background image
    const bgImage = this.add.image(0, 0, "title").setOrigin(0, 0).setDepth(0);
    bgImage.displayWidth = 1200;
    bgImage.displayHeight = 1200;
    this.localStorage = window.localStorage;
    this.sound.stopAll();
    this.levels();
    this.buttons();
    this.hover();
    console.log(this.localStorage.getItem("level1R"))
    // this.rewards()

    // this.localStorage.clear()
  }

  buttons() {
    //Level squares

    this.levelArray = Array(5).fill(null);
    let x = 200;
    for (let i = 0; i < this.levelArray.length; i++) {
      this.levelArray[i] = new Phaser.GameObjects.Rectangle(
        this,
        x,
        600,
        100,
        100
      ).setDepth(1);

      let textX = this.levelArray[i].x;
      let textY = this.levelArray[i].y;

      // Level text
      this.add
        .text(textX - 30, textY - 20, "Level", {
          fontFamily: "Arial",
          fontSize: 25,
          color: "#ffffff",
        })
        .setDepth(2);

      this.add
        .text(textX - 10, textY + 10, i + 1, {
          fontFamily: "Arial",
          fontSize: 25,
          color: "#ffffff",
        })
        .setDepth(2);
      x = x + 200;
      this.add.existing(this.levelArray[i]);
      this.physics.add.existing(this.levelArray[i]);

      // Level Scene link
      this.levelArray[i].setInteractive();
      this.levelArray[i].on("pointerdown", (event, gameObjects) => {
        let keyFind = (x) =>
          this.localStorage.getItem(x) === this.levelArray[i].key;
        let findKey = this.levelKeys.some(keyFind);
        if (findKey || this.levelArray[i].key === "level1") {
          this.scene.start(this.levelKeys[i]);
        } else {
        }
      });
      this.levelArray[i].key = this.levelKeys[i];
    }

    this.levelArray.map((x) => {
      let keyFind = (xy) => this.localStorage.getItem(xy) === x.key;
      let findKey = this.levelKeys.some(keyFind);
      if (findKey || x.key === "level1") {
        x.setFillStyle(0xdbc997, 1);
      } else {
        x.setFillStyle(0xa18785, 0.5);
      }
    });
  }

  hover() {
    this.input.on(
      "pointerover",
      function (event, gameObjects) {
        let keyFind = (x) =>
          this.localStorage.getItem(x) === gameObjects[0].key;
        let findKey = this.levelKeys.some(keyFind);

        if (gameObjects[0].key === "level1" || findKey) {
          gameObjects[0].setFillStyle(0x87eb4d, 1);
        } else {
          gameObjects[0].setFillStyle(0xd10d0d, 0.7);
        }
      },
      this
    );

    this.input.on(
      "pointerout",
      function (event, gameObjects) {
        let keyFind = (x) =>
          this.localStorage.getItem(x) === gameObjects[0].key;
        let findKey = this.levelKeys.some(keyFind);
        if (gameObjects[0].complete === true || findKey) {
          gameObjects[0].setFillStyle(0xdbc997, 1);
        } else {
          gameObjects[0].setFillStyle(0xa18785, 0.5);
        }
      },
      this
    );
  }
  levels() {
    this.levelKeys = ["level1", "level2", "level3", "level4", "level5"];
    this.localStorage.setItem("level1", "level1");
  }

  rewards() {
    //Stars

    this.add.rectangle(1000, 0, 200, 100, 0xffffff, 0.5).setOrigin(0);
    let star = this.add.image(1050, 50, "star").setScale(0.16);
    this.tweens.add({
      targets: star,
      scale: { start: 0.16, from: 0.12, to: 0.16 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.add
      .text(1175, 25, this.localStorage.getItem("stars"), {
        fontFamily: "Arial",
        fontSize: 48,
        color: "#ffffff",
      })
      .setDepth(13);

    //Feather
    this.add.rectangle(0, 0, 200, 100, 0xffffff, 0.5).setOrigin(0);
    let feather = this.add.image(50, 50, "feather").setScale(0.14);
    this.tweens.add({
      targets: feather,
      scale: { start: 0.14, from: 0.12, to: 0.14 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.add
      .text(125, 25, this.localStorage.getItem("feathers"), {
        fontFamily: "Arial",
        fontSize: 48,
        color: "#ffffff",
      })
      .setDepth(13);
  }
}
