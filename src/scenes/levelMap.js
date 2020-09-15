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
    this.levels();
    this.buttons();
    this.hover();
    console.log(this.levelArray)
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
        if (
          this.levelArray[i].complete === true ||
          this.levelArray[i].key === "level1"
        ) {
          this.scene.start(this.levelKeys[i]);
        } else {
          this.levelArray[i].complete = false;
          this.levelArray[i].key = "none";
        }
      });
      this.levelArray[i].key = this.levelKeys[i];
    }

    this.levelArray.map((x) => {
      if (x.complete === true || x.key === "level1") {
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
        console.log(gameObjects[0].complete)
        if (
          
          gameObjects[0].complete === true ||
          gameObjects[0].key === "level1"
        ) {
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
        if (
          gameObjects[0].complete === true ||
          gameObjects[0].key === "level1"
        ) {
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
  }
}
