import { Scene } from "phaser";
import stoneSprite from "../logic/stoneSprite";
import doorSprite from "../logic/doorSprite";
import scoreBar from "../logic/scoreBar";
import Pillar from "../logic/Pillar";
import GameBoard from "../logic/GameBoard";
import altar from "../logic/altar";
import score from "../logic/score";
import menu from "../logic/menu";
import win from "../logic/win";
import tree from "../logic/tree";
import createMap from "../logic/createMap";
import spriteCreation from "../logic/spriteCreation";

export default class Level2 extends Scene {
  constructor(config) {
    super("level2");
    this.key = "level2";
    this.keyWin = "level3";
  }
  // Preload, create, update functions ---------------------------------
  preload() {}

  create() {
    this.sound.stopAll();
    this.lightFX();
    this.createAudio();
    this.squareGameBoard();
    this.events.on("resize", this.resize, this);
    this.createMap();
    this.createGui();
    this.createSprites();
    this.createGameObjects();
    this.pointerXY(this.spriteSelection);
    this.addCollisions();
    this.winCon();
  }

  update() {
    this.spriteMoves();
    this.pillars.forEach((pillar) => {
      pillar.update();
    });
    this.treeRopes.forEach((tree) => {
      tree.update();
    });
  }

  //--Sprite Move functions----------------------------------------------------

  getSpriteSquare(sprite) {
    let sqX = Math.floor(sprite.x / this.gB.sqW);
    let sqY = Math.floor((sprite.y - this.gB.firstSq.y) / this.gB.sqH);
    console.log(sprite.x)
    console.log(sprite.y)
    this.spSq = this.gB.squareMatrix[sqX][sqY];
  }
  pointerXY(sprite) {
    this.input.on(
      "pointerdown",
      function (pointer) {
        if (sprite.body.speed === 0) {
          this.scoreBar.draw();
          let sqX = Math.floor(pointer.x / this.gB.sqW);
          let sqY = Math.floor((pointer.y - this.gB.firstSq.y) / this.gB.sqH);
          this.sqI = this.gB.squareMatrix[sqX][sqY];
          sprite.target.x = this.gB.sqNum[this.sqI].x + this.gB.sqW / 2;
          sprite.target.y = this.gB.sqNum[this.sqI].y + this.gB.sqH / 2;

          if (sprite.availableMoves.some((x) => x === this.sqI)) {
            this.rockRollSFX.play();
            this.physics.moveTo(sprite, sprite.target.x, sprite.target.y, 400);
            sprite.moveDirection();
          } else {
          }
        }
      },
      this
    );
  }

  spriteMoves() {
    this.spriteSelection.update();
    if (this.spriteSelection.body.speed === 0) {
      this.rockMove.pause();
      this.winCondition.winCon();
    } else {
      this.rockMove.resume();
    }

    this.stone.update();
    this.stoneDoor.update();
  }
  pillarMoves() {
    this.pillars.forEach((sprite) => {
      sprite.update();
    });
  }
  // ----------------------------------------------------------------

  squareGameBoard() {
    this.gB = new GameBoard({
      rows: 5,
      cols: 5,
      sqW: 200,
      sqH: 200,
      firstSq: { x: 0, y: 668 },
      scene: this,
      exit: 14,
      altar: 8,
    });
    this.gB.squareBoard();
  }

  //--------------------------------------------------------------------
  resize(width, height) {
    if (width === undefined) {
      width = this.sys.game.config.width;
      height = this.sys.game.config.height;
    }
    this.cameras.resize(width, height);
  }

  addCollisions() {
    this.physics.add.overlap(this.spriteSelection, this.altar, () => {
      this.altar.altarPress();
    });

    this.bounceReset = (object) => {
      let remainder = this.gB.firstSq.y % 100;
      let x = (this.gB.sqW / 2) * Math.round(object.x / (this.gB.sqW / 2));
      let y =
        (this.gB.sqW / 2) *
          Math.round((object.y - remainder) / (this.gB.sqW / 2)) +
        remainder;

      this.cameras.main.shake(300, 0.003);

      object.body.reset(x, y);
    };

    this.physics.add.collider(
      this.pillars,
      this.pillars,
      (pillar1, pillar2) => {
        this.pillars.forEach((pillar) => {
          this.bounceReset(pillar);
          this.impactSFX.stop();
          if (!this.impactSFX.isPlaying) {
            this.impactSFX.play();
          } else {
          }
        });
      }
    );

    this.physics.add.collider(
      this.spriteSelection,
      this.stoneDoor,
      (sprite, door) => {
        this.bounceReset(sprite);
        sprite.moves();
      }
    );
    this.physics.add.collider(this.pillars, this.stoneDoor, () => {
      this.cameras.main.shake(300, 0.003);
    });
    this.physics.add.collider(this.pillars, this.stone, () => {
      this.cameras.main.shake(300, 0.003);
    });
    this.physics.add.collider(this.pillars, this.map.door),
      () => {
        this.cameras.main.shake(300, 0.003);
      };
    this.physics.add.collider(this.spriteSelection, this.pillars);
    this.physics.add.collider(this.spriteSelection, this.map.wall);
    this.physics.add.collider(this.pillars, this.map.wall, () => {
      this.cameras.main.shake(300, 0.003);
    });
    this.physics.add.collider(this.pillars, this.altar);
    this.physics.add.overlap(
      this.spriteSelection,
      this.pillars,
      (sprite, pillar) => {
        if (pillar.body.velocity.x === 0 && pillar.body.velocity.y === 0) {
          this.bounceReset(sprite);
          sprite.moves();
        }
      }
    );
  }

  createMap() {
    let rect0 = new Phaser.GameObjects.Rectangle(this, 100, 200, 950, 950)
      .setDepth(8)
      .setOrigin(0);
    let rect = new Phaser.GameObjects.Rectangle(this, 0, 136, 1200, 1200)
      .setDepth(8)
      .setOrigin(0);
    let shape = this.make.graphics();
    shape.fillRectShape(rect0);
    var mask = shape.createGeometryMask();
    mask.setInvertAlpha();
    this.box = this.add
      .graphics({ fillStyle: { color: 0x000000, alpha: 0.2 } })
      .setDepth(8);
    this.box.setMask(mask);

    this.bg = this.add
      .image(0, 0, "stoneBg")
      .setOrigin(0)
      .setScale(0.6, 0.6)
      .setDepth(9)
      .setCrop(0, 0, 2000, 785);
    this.add
      .image(0, 1000, "stoneBg")
      .setOrigin(0)
      .setScale(0.6, 0.6)
      .setDepth(9)
      .setCrop(0, 1075, 2000, 2000);

    this.map = new createMap({
      scene: this,
      mapKey: this.key,
      tileMap: "tiles",
      y: 468,
    });
  }

  createAudio() {
    this.music = this.sound.add("level1", { loop: true }).play();
    this.slideSFX = this.sound.add("slide", { volume: 0.2 });
    this.slideShortSFX = this.sound.add("slideShort", { volume: 0.2 });
    this.impactSFX = this.sound.add("impact", { volume: 0.3 });
    this.rockRollSFX = this.sound.add("rockRoll", { volume: 0.5 });
    this.doorMoveSFX = this.sound.add("doorMove", { volume: 0.4 });
  }
  createSprites() {
    (this.spriteSelection = new spriteCreation({
      scene: this,
      x: 300,
      y: 1500,
      key: "circleSheet",
      gB: this.gB,
      bodySize: { x: 150, y: 150 },
      depth: 1,
      introSq: { x: 300, y: 900 + this.map.config.y },
    })),
      //Sprite Intros
      this.spriteSelection.intro();
  }

  createGameObjects() {
    //Stone sprite Creation
    this.stone = new stoneSprite({
      scene: this,
      x: 300,
      y: 1700,
      key: "stone",
      introSq: { x: 300, y: 1100 + this.map.config.y },
    });

    //Stone door creation

    this.stoneDoor = new doorSprite({
      scene: this,
      x: 875,
      y: 700 + this.map.config.y,
      key: "doorSheet",
      depth: 2,
      scale: 1.5,
      immovable: true,
      bodySize: { x: 100, y: 100 },
      angle: 90,
    });

    //altar creation
    this.altar = new altar({
      scene: this,
      x: 700,
      y: 500 + this.map.config.y,
      key: "altar",
      gB: this.gB,
      selected: this.selectedSquare,
      endX: 875,
      endY: 950 + this.map.config.y,
    }).setImmovable(true);

    this.pillars = [
      new Pillar({
        scene: this,
        x: 300,
        y: 700 + this.map.config.y,
        key: "pillar",
        gB: this.gB,
        selected: this.selectedSquare,
      }),
      new Pillar({
        scene: this,
        x: 500,
        y: 900 + this.map.config.y,
        key: "pillar",
        gB: this.gB,
        selected: this.selectedSquare,
      }),
      new Pillar({
        scene: this,
        x: 700,
        y: 700 + this.map.config.y,
        key: "pillar",
        gB: this.gB,
        selected: this.selectedSquare,
      }),
    ];
    this.treeRopes = [
      new tree({
        scene: this,
        pos: { x: 1200, y: 1200 },
        speed: 0.03,
        angle: 30,
        depth: 3,
      }),
      new tree({
        scene: this,
        pos: { x: 100, y: 900 },
        speed: 0.04,
        angle: -270,
        depth: 3,
      }),
      new tree({
        scene: this,
        pos: { x: 250, y: 1650 },
        speed: 0.05,
        depth: 1,
      }),
    ];
  }
  createGui() {
    this.scoreBox = new score({ scene: this, totalMoves: 0 });
    this.menu = new menu({ scene: this, level: "level2" });
    this.scoreBar = new scoreBar({
      scene: this,
      location: { x: 300, y: 25 },
      stars: {
        one: 8,
        two: 7,
        three: 6,
      },
    });
  }
  winCon() {
    this.winCondition = new win({
      scene: this,
      gB: this.gB,
      leave: { x: 1000, y: 700 + this.map.config.y },
      key: this.keyWin,
    });
  }
  lightFX() {
    this.lights.enable();
    this.lights.setAmbientColor(0x808080);
    this.lights.addLight(900, 500, 1000).setColor(0xffffff).setIntensity(1);
    this.lights.addLight(1300, 1400, 1000).setColor(0xffffff).setIntensity(1);
    this.lights.addLight(0, 1500, 1000).setColor(0xffffff).setIntensity(1);
  }
}
