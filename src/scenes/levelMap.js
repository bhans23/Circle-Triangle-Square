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
    console.log(this.levelArray);
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
      this.levelArray[i].on("pointerdown", () =>
        this.scene.start(this.levelKeys[i])
      );
      this.levelArray[i].key = this.levelKeys[i];
    }

    this.levelArray.map((x) => {
      x.setFillStyle(0xdbc997, 0.7);
    });
  }

  hover() {
    this.input.on(
      "pointerover",
      function (event, gameObjects) {
        if (gameObjects[0]) gameObjects[0].setFillStyle(0xdbc997, 1);
      },
      this
    );

    this.input.on(
      "pointerout",
      function (event, gameObjects) {
        gameObjects[0].setFillStyle(0xdbc997, 0.8);
      },
      this
    );
  }
  levels() {
    this.levelKeys = ["level1", "level2", "level3", "level4", "level5"];
    this.levelComplete = {
      level1: false,
      level2: false,
      level3: false,
      level4: false,
      level5: false,
    };
  }
}
