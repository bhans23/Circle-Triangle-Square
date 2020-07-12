import Phaser from "phaser";
import config from "./config/config";
import TitleScene from "./scenes/TitleScene";
import Level1 from "./scenes/Level1";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("level1", Level1);
    this.scene.add("Title", TitleScene);
    this.scene.start("Title");
  }
}

window.onload = function () {
  window.game = new Game();
};
