import Phaser from "phaser";
import config from "./config/config";
import TitleScene from "./scenes/TitleScene";
import Level1 from "./scenes/Level1";
import Level2 from "./scenes/Level2";
import Level3 from "./scenes/Level3";
import Level4 from "./scenes/Level4";
import Level5 from "./scenes/Level5";
import beatGame from "./scenes/beatGame";
import Model from "./logic/model"

import bootScene from "./scenes/bootScene";
import levelMap from "./scenes/levelMap";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model };
    this.scene.add("bootScene", bootScene);
    this.scene.add("level1", Level1);
    this.scene.add("level2", Level2);
    this.scene.add("level3", Level3);
    this.scene.add("level4", Level4);
    this.scene.add("level5", Level5);
    this.scene.add("Title", TitleScene);
    this.scene.add("levelMap", levelMap);
    this.scene.add("beatGame", beatGame);
    this.scene.start("bootScene");
    
    
  }
}

window.game = new Game();
window.addEventListener("resize", (event) => {
  window.game.resize(window.innerWidth, window.innerHeight);
});
