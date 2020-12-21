import Phaser from "phaser";
import button from "./button";

export default class intro {
  constructor(config) {
    this.scene = config.scene;
    this.tut = 0;
    this.start()
    
  }
  // Intro box's parameters. Edit this
  start(){
    if (this.scene.scene
      .get("levelMap")
      .localStorage.getItem(`${this.scene.key}R`) === null) {
      this.intro();
    }
  }
  intro() {
    if (this.tut === 0) {
      this.dialogueBox({
        x: 600,
        y: 800,
        disPhy: true,
        bScreen: true,
        t1X: 600,
        t1Y: 725,
        t2X: 600,
        t2Y: 785,
        t3X: 600,
        t3Y: 845,
        scale: 0.5,
        alpha: 1,
        text: "",
        text2: "Welcome to Rock Adventure!",
        text3: "",
        bType: "next",
      });
    } else if (this.tut === 1) {
      this.dialogueBox({
        x: 600,
        y: 1600,
        bScreen: true,
        disPhy: true,
        t1X: 600,
        t1Y: 1525,
        t2X: 600,
        t2Y: 1585,
        t3X: 600,
        t3Y: 1645,
        scale: 0.5,
        alpha: 1,
        text: "",
        text2: "Help Circle to navigate through ",
        text3: "the Mystical Jungle",
        bType: "next",
      });
      this.pointArrow = this.scene.add
        .sprite(500, 1100, "next")
        .setAngle(90)
        .setDepth(36);
      this.scene.tweens.add({
        targets: this.pointArrow,
        scale: { start: 0, from: 0, to: 1 },
        duration: 700,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
      //Mask
      let shape = this.scene.make.graphics();
      shape.fillStyle(0xffffff);
      shape.beginPath();
      shape.fillRect(
        this.scene.spriteSelection.x - 100,
        this.scene.spriteSelection.y - 100,
        200,
        200
      );
      const mask = shape.createGeometryMask();
      mask.invertAlpha = true;
      this.dbBS.setMask(mask);
    } else if (this.tut === 2) {
      this.dialogueBox({
        x: 600,
        y: 1600,
        disPhy: true,
        bScreen: true,
        t1X: 600,
        t1Y: 1525,
        t2X: 600,
        t2Y: 1585,
        t3X: 600,
        t3Y: 1645,
        scale: 0.5,
        alpha: 1,
        text: "Move stone pillars,",
        text2: "to navigate through",
        text3: "the jungle.",
        bType: "next",
      });
      this.pointArrow = this.scene.add
        .sprite(500, 900, "next")
        .setAngle(90)
        .setDepth(36);
      this.scene.tweens.add({
        targets: this.pointArrow,
        scale: { start: 0, from: 0, to: 1 },
        duration: 700,
        repeat: -1,
        ease: "Sine.easeInOut",
      });

      let shape = this.scene.make.graphics();
      shape.fillStyle(0xffffff);
      shape.beginPath();
      shape.fillRect(
        this.scene.spriteSelection.x - 100,
        this.scene.spriteSelection.y - 100,
        200,
        200
      );

      shape.fillRect(400, 868, 200, 200);

      const mask = shape.createGeometryMask();
      mask.invertAlpha = true;
      this.dbBS.setMask(mask);
    } else if (this.tut === 3) {
      this.dialogueBox({
        x: 600,
        y: 1600,
        disPhy: true,
        bScreen: true,
        t1X: 600,
        t1Y: 1525,
        t2X: 600,
        t2Y: 1585,
        t3X: 600,
        t3Y: 1645,
        scale: 0.5,
        alpha: 1,
        text: "Try to navigate to ,",
        text2: "the magic altar",
        text3: "",
        bType: "next",
      });
      this.pointArrow = this.scene.add
        .sprite(300, 900, "next")
        .setAngle(90)
        .setDepth(36);
      this.scene.tweens.add({
        targets: this.pointArrow,
        scale: { start: 0, from: 0, to: 1 },
        duration: 700,
        repeat: -1,
        ease: "Sine.easeInOut",
      });

      let shape = this.scene.make.graphics();
      shape.fillStyle(0xffffff);
      shape.beginPath();
      shape.fillRect(400, 1068, 200, 200);
      shape.fillRect(400, 868, 200, 200);
      shape.fillRect(200, 868, 200, 200);

      const mask = shape.createGeometryMask();
      mask.invertAlpha = true;
      this.dbBS.setMask(mask);
    } else if (this.tut === 4) {
      this.dialogueBox({
        x: 600,
        y: 1600,
        disPhy: true,
        bScreen: true,
        t1X: 600,
        t1Y: 1525,
        t2X: 600,
        t2Y: 1585,
        t3X: 600,
        t3Y: 1645,
        scale: 0.5,
        alpha: 1,
        text: "Pressing the Altar will,",
        text2: "move the stone allowing you,",
        text3: "to pass to the next area.",
        bType: "next",
      });
      this.pointArrow = this.scene.add
        .sprite(500, 668, "next")
        .setAngle(-90)
        .setDepth(36);
      this.scene.tweens.add({
        targets: this.pointArrow,
        scale: { start: 0, from: 0, to: 1 },
        duration: 700,
        repeat: -1,
        ease: "Sine.easeInOut",
      });

      let shape = this.scene.make.graphics();
      shape.fillStyle(0xffffff);
      shape.beginPath();
      shape.fillRect(400, 1068, 200, 200);
      shape.fillRect(400, 868, 200, 200);
      shape.fillRect(200, 868, 200, 200);
      shape.fillRect(200, 468, 600, 200);

      const mask = shape.createGeometryMask();
      mask.invertAlpha = true;
      this.dbBS.setMask(mask);
    } else if (this.tut === 5) {
      this.dialogueBox({
        x: 600,
        y: 1600,
        disPhy: true,
        bScreen: true,
        t1X: 600,
        t1Y: 1525,
        t2X: 600,
        t2Y: 1585,
        t3X: 600,
        t3Y: 1645,
        scale: 0.5,
        alpha: 1,
        text: "Try to pass the area",
        text2: "with as few moves as possible",
        text3: "",
        bType: "next",
      });
      this.pointArrow = this.scene.add
        .sprite(1100, 300, "next")
        .setAngle(-90)
        .setDepth(36);
      this.scene.tweens.add({
        targets: this.pointArrow,
        scale: { start: 0, from: 0, to: 1 },
        duration: 700,
        repeat: -1,
        ease: "Sine.easeInOut",
      });

      let shape = this.scene.make.graphics();
      shape.fillStyle(0xffffff);
      shape.beginPath();
      shape.fillRect(400, 1068, 200, 200);
      shape.fillRect(400, 868, 200, 200);
      shape.fillRect(200, 868, 200, 200);
      shape.fillRect(200, 468, 600, 200);
      shape.fillRect(1000, 0, 200, 200);

      const mask = shape.createGeometryMask();
      mask.invertAlpha = true;
      this.dbBS.setMask(mask);
    } else if (this.tut === 6) {
      this.dialogueBox({
        x: 600,
        y: 1600,
        disPhy: true,
        bScreen: true,
        t1X: 600,
        t1Y: 1525,
        t2X: 600,
        t2Y: 1585,
        t3X: 600,
        t3Y: 1645,
        scale: 0.5,
        alpha: 1,
        text: "The fewer the moves made",
        text2: "the more stars collected",
        text3: "",
        bType: "next",
      });
      this.pointArrow = this.scene.add
        .sprite(650, 300, "next")
        .setAngle(-90)
        .setDepth(36);
      this.scene.tweens.add({
        targets: this.pointArrow,
        scale: { start: 0, from: 0, to: 1 },
        duration: 700,
        repeat: -1,
        ease: "Sine.easeInOut",
      });

      let shape = this.scene.make.graphics();
      shape.fillStyle(0xffffff);
      shape.beginPath();
      shape.fillRect(400, 1068, 200, 200);
      shape.fillRect(400, 868, 200, 200);
      shape.fillRect(200, 868, 200, 200);
      shape.fillRect(200, 468, 600, 200);
      shape.fillRect(1000, 0, 200, 200);
      shape.fillRect(260, 0, 725, 200);

      const mask = shape.createGeometryMask();
      mask.invertAlpha = true;
      this.dbBS.setMask(mask);
    } else if (this.tut === 7) {
      this.dialogueBox({
        x: 600,
        y: 1600,
        disPhy: true,
        bScreen: true,
        t1X: 600,
        t1Y: 1525,
        t2X: 600,
        t2Y: 1585,
        t3X: 600,
        t3Y: 1645,
        scale: 0.5,
        alpha: 1,
        text: "If you get stuck",
        text2: "use the restart",
        text3: "or menu buttons",
        bType: "next",
      });
      this.pointArrow = this.scene.add
        .sprite(100, 300, "next")
        .setAngle(-90)
        .setDepth(36);
      this.scene.tweens.add({
        targets: this.pointArrow,
        scale: { start: 0, from: 0, to: 1 },
        duration: 700,
        repeat: -1,
        ease: "Sine.easeInOut",
      });

      let shape = this.scene.make.graphics();
      shape.fillStyle(0xffffff);
      shape.beginPath();
      shape.fillRect(400, 1068, 200, 200);
      shape.fillRect(400, 868, 200, 200);
      shape.fillRect(200, 868, 200, 200);
      shape.fillRect(200, 468, 600, 200);
      shape.fillRect(1000, 0, 200, 200);
      shape.fillRect(260, 0, 725, 200);
      shape.fillRect(0, 0, 300, 200);

      const mask = shape.createGeometryMask();
      mask.invertAlpha = true;
      this.dbBS.setMask(mask);
    } else {
      this.scene.menu.restart();
      this.scene.menu.levelMenu();
      this.scene.pointerXY(this.scene.spriteSelection);
      this.introDone = true;
    }
  }

  //Dialogue box and buttons. No need to edit
  dialogueBox(config) {
    //Black out game and stop physics
    if (config.disPhy === true) {
      this.scene.menu.box.off("pointerdown");
      this.scene.menu.box2.off("pointerdown");
      this.scene.input.off("pointerdown");
    } else {
      this.scene.menu.restart();
      this.scene.menu.levelMenu();
      this.scene.pointerXY(this.scene.spriteSelection);
    }
    if (config.bScreen === true) {
      this.dbBS = this.scene.add
        .rectangle(0, 0, 1200, 2136, 0x000000, 0.5)
        .setDepth(30)
        .setOrigin(0);
    } else {
    }

    //diaglogue box
    this.boxBG = this.scene.add
      .image(config.x, config.y, "stoneBg")
      .setScale(0.4, 0.2)
      .setDepth(31);
    this.whiteBox = this.scene.add
      .rectangle(config.x, config.y, 750, 350, 0xffffff, 0.5)
      .setDepth(32);

    //Text
    this.t1 = this.scene.add
      .text(config.t1X, config.t1Y, config.text, {
        fontFamily: "Arial",
        fontSize: 48,
        color: "#x000000",
      })
      .setDepth(32)
      .setOrigin(0.5);
    this.t2 = this.scene.add
      .text(config.t2X, config.t2Y, config.text2, {
        fontFamily: "Arial",
        fontSize: 48,
        color: "#x000000",
      })
      .setDepth(32)
      .setOrigin(0.5);
    this.t3 = this.scene.add
      .text(config.t3X, config.t3Y, config.text3, {
        fontFamily: "Arial",
        fontSize: 48,
        color: "#x000000",
      })
      .setDepth(32)
      .setOrigin(0.5);

    this.button(config);
    this.dialogueAnim(config);
    //Button
  }
  dialogueBoxClear() {
    this.dbBS.destroy();
    this.boxBG.destroy();
    this.whiteBox.destroy();
    this.t1.destroy();
    this.t2.destroy();
    this.t3.destroy();
    this.theButton.box.destroy();
    this.theButton.arrow.destroy();
    if (this.pointArrow != null) {
      this.pointArrow.destroy();
    }

    if (this.dbBS.mask != null) {
      this.dbBS.mask.destroy();
    }
  }

  dialogueAnim(config) {
    this.scene.tweens.add({
      targets: this.boxBG,
      scaleX: { start: 0, from: 0, to: 0.4 },
      scaleY: { start: 0, from: 0, to: 0.2 },
      duration: 700,
      repeat: 0,
      ease: "Sine.easeInOut",
    });
    this.scene.tweens.add({
      targets: this.whiteBox,
      scale: { start: 0, from: 0, to: 1 },

      duration: 700,
      repeat: 0,
      ease: "Sine.easeInOut",
    });
    this.scene.tweens.add({
      targets: this.t1,
      scale: { start: 0, from: 0, to: 1 },

      duration: 700,
      repeat: 0,
      ease: "Sine.easeInOut",
    });
    this.scene.tweens.add({
      targets: this.t2,
      scale: { start: 0, from: 0, to: 1 },

      duration: 700,
      repeat: 0,
      ease: "Sine.easeInOut",
    });
    this.scene.tweens.add({
      targets: this.t3,
      scale: { start: 0, from: 0, to: 1 },
      duration: 700,
      repeat: 0,
      ease: "Sine.easeInOut",
    });
    this.scene.tweens.add({
      targets: this.theButton.box,
      scale: { start: 0, from: 0, to: config.scale },
      duration: 700,
      repeat: 0,
      ease: "Sine.easeInOut",
    });
    this.scene.tweens.add({
      targets: this.theButton.arrow,
      scale: { start: 0, from: 0, to: 0.4 },
      duration: 700,
      repeat: 0,
      ease: "Sine.easeInOut",
    });
  }

  button(config) {
    this.theButton = new button({
      scene: this.scene,
      scale: 0.5,
      depth: 35,
      x: config.x,
      y: config.y + 125,
      bType: config.bType,
      alpha: config.alpha,
      function: () => {
        this.tut++;
        this.dialogueBoxClear();
        this.intro();
      },
    });
  }
}
