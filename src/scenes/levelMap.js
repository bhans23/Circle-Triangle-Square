import Phaser from "phaser";
import button from "../logic/button";
export default class levelMap extends Phaser.Scene {
  constructor() {
    super("levelMap");
  }

  preload() {}

  create() {
    this.music();
    // Background image
    this.bg = this.add
      .image(0, 0, "stoneBg")
      .setOrigin(0)
      .setScale(0.6, 0.6)
      .setDepth(3)
      .setCrop(0, 0, 2000, 785);
    this.add
      .image(0, 1000, "stoneBg")
      .setOrigin(0)
      .setScale(0.6, 0.6)
      .setDepth(3)
      .setCrop(0, 1075, 2000, 2000);

    const bgImage = this.add.image(0, 468, "title").setOrigin(0, 0).setDepth(0);
    bgImage.displayWidth = 1200;
    bgImage.displayHeight = 1200;
    this.add.rectangle(0, 0, 1200, 1920, 0x000000, 0.3).setOrigin(0);

    this.localStorage = window.localStorage;

    this.levels();
    this.buttons();
    this.hover();
    this.rewardCount();
    this.rewards();
    this.resetButton();

    // this.localStorage.clear();
  }
  music() {
    
    const bgMusic = this.sound.get("title");
    console.log(bgMusic.isPlaying)
    if (bgMusic.isPlaying !== true) {
      const stopped = this.sound.stopByKey("level1");
      const music = this.sound.add("title", { loop: true, volume: 0.5 }).play();
    } else {
    }
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
    // this.levelArray.map((star) => this.addRewards(star))

    for (let i = 0; i < this.levelArray.length; i++) {
      this.addRewards(this.levelArray[i]);
    }
    // console.log(this.rewardArray)
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
    this.rewardArray = new Array(this.levelKeys.length).fill([]);
  }

  rewardCount() {
    //Feather count
    this.featherCount = 0;
    let feather = () => {
      for (let i = 0; i < this.levelKeys.length; i++) {
        if (
          Number.isInteger(
            parseInt(this.localStorage.getItem(`${this.levelKeys[i]}F`), 10)
          )
        ) {
          this.featherCount =
            this.featherCount +
            parseInt(this.localStorage.getItem(`${this.levelKeys[i]}F`), 10);
        } else {
        }
      }
      this.localStorage.setItem("feather", parseInt(this.featherCount, 10));
    };
    feather();
    //Star count
    this.starCount = 0;
    let star = () => {
      for (let i = 0; i < this.levelKeys.length; i++) {
        if (
          Number.isInteger(
            parseInt(this.localStorage.getItem(`${this.levelKeys[i]}R`), 10)
          )
        ) {
          this.starCount =
            this.starCount +
            parseInt(this.localStorage.getItem(`${this.levelKeys[i]}R`), 10);
        } else {
        }
      }
      this.localStorage.setItem("stars", parseInt(this.starCount, 10));
    };
    star();
  }

  rewards() {
    //Stars

    this.add.rectangle(1000, 0, 200, 100, 0xffffff, 0.5).setOrigin(0);
    let star = this.add.image(1050, 50, "star").setScale(0.16);
    star.setDepth(4);
    this.tweens.add({
      targets: star,
      scale: { start: 0.16, from: 0.12, to: 0.16 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.add
      .text(1135, 25, this.localStorage.getItem("stars"), {
        fontFamily: "Arial",
        fontSize: 48,
        color: "#ffffff",
      })
      .setDepth(13);

    //Feather
    this.add.rectangle(0, 0, 200, 100, 0xffffff, 0.5).setOrigin(0);
    let feather = this.add.image(50, 50, "feather").setScale(0.14);
    feather.setDepth(4);
    this.tweens.add({
      targets: feather,
      scale: { start: 0.14, from: 0.12, to: 0.14 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.add
      .text(125, 25, this.localStorage.getItem("feather"), {
        fontFamily: "Arial",
        fontSize: 48,
        color: "#ffffff",
      })
      .setDepth(13);
  }
  addRewards(star) {
    //creating stars
    let index = this.levelArray.indexOf(star);
    this.starColor = (i) => {
      if (
        i < parseInt(this.localStorage.getItem(`${this.levelKeys[index]}R`), 10)
      ) {
        return 0xf7b90f;
      } else {
        return 0xa8acad;
      }
    };
    this.rewardArray[index] = new Array(3).fill(null).map((_, i) => {
      this.add
        .star(
          this.levelArray[index].x - 50 + i * 50,
          this.levelArray[index].y + 70,
          5,
          10,
          20,
          this.starColor(i)
        )
        .setDepth(30);
    });
  }
  resetButton() {
    this.rButton = new button({
      scene: this,
      x: 600,
      y: 50,
      bType: "redo",
      scale: 0.5,
      depth: 20,
      function: () => {
        this.localStorage.clear();
        this.scene.start("levelMap");
      },
    });

    this.add
      .text(600, 130, "Reset Progress", {
        fontFamily: "Arial",
        fontSize: 45,
        color: "#ffffff",
      })
      .setDepth(20)
      .setOrigin(0.5);
  }
}
