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

      var timer = this.scene.time.addEvent({
        delay: 1000,
        callback: () => this.winScreen(),
        callbackScope: this.scene,
      });
    }
  }

  winScreen() {
    //Pause events
    this.scene.menu.box.off("pointerdown");
    this.scene.menu.box2.off("pointerdown");
    this.scene.input.off("pointerdown");
    let bg = this.scene.add
      .rectangle(0, 0, 1200, 2160, 0x000000, 0.5)
      .setDepth(20)
      .setOrigin(0);
    let box = new Phaser.GameObjects.Rectangle(
      this.scene,
      0,
      600,
      1200,
      800,
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
    });
    this.buttons();
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
      .sprite(570, 1065, "redo")
      .setDepth(22)
      .setOrigin(0)
      .setScale(0.16);

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
      .sprite(815, 1060, "next")
      .setDepth(22)
      .setOrigin(0)
      .setScale(0.16);

    box3.displayWidth = 125;
    box3.displayHeight = 125;

    box3.setInteractive();
    box3.on("pointerdown", () => {
      this.scene.scene.start(this.scene.keyWin);
    });
  }
}
