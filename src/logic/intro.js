import Phaser from "phaser";

export default class intro {
  constructor(config) {
    this.scene = config.scene;
    this.intro();
  }

  dialogueBox(config) {
    //Black out game and stop physics
    this.scene.add
      .rectangle(0, 0, 1200, 2136, 0x000000, 0.5)
      .setDepth(30)
      .setOrigin(0);

    //diaglogue box
    this.scene.add
      .image(config.x, config.y, "stoneBg")
      .setOrigin(0)
      .setScale(0.4, 0.2)
      .setDepth(31);
    this.scene.add
      .rectangle(config.x + 40, config.y + 40, 750, 350, 0xffffff, 0.5)
      .setDepth(32)
      .setOrigin(0);
    //Text
    this.scene.add
      .text(config.t1X, config.t1Y, config.text, {
        fontFamily: "Arial",
        fontSize: 48,
        color: "#x000000",
      })
      .setDepth(32);
    this.scene.add
      .text(config.t2X, config.t2Y, config.text2, {
        fontFamily: "Arial",
        fontSize: 48,
        color: "#x000000",
      })
      .setDepth(32);
    this.scene.add
      .text(config.t3X, config.t3Y, config.text3, {
        fontFamily: "Arial",
        fontSize: 48,
        color: "#x000000",
      })
      .setDepth(32);
  }

  intro() {
    this.dialogueBox({
      x: 200,
      y: 600,
      t1X: 300,
      t1Y: 725,
      t2X: 280,
      t2Y: 785,
      t3X: 390,
      t3Y: 855,

      text: "Welcome to Rock Adventure!",
      text2: "Help Circle to navigate through ",
      text3: "the Mystical Jungle",
    });
  }
}
