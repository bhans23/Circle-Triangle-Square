import Phaser from "phaser";
import config from "./config/config";
import TitleScene from "./scenes/TitleScene";
import Level1 from "./scenes/Level1";
import bootScene from './scenes/bootScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("bootScene", bootScene);
    this.scene.add("level1", Level1);
    this.scene.add("Title", TitleScene);
    this.scene.start("bootScene");
  }
}

window.game = new Game();
window.addEventListener('resize', (event) => {
  window.game.resize(window.innerWidth,window.innerHeight)
})



