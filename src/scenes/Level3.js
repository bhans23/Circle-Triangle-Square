import { Scene } from "phaser";
import stoneSprite from "../logic/stoneSprite";
import CircleSprite from "../logic/CircleSprite";
import doorSprite from "../logic/doorSprite";
import Pillar from "../logic/Pillar";
import GameBoard from "../logic/GameBoard";
import altar from "../logic/altar";
import score from "../logic/score";
import menu from "../logic/menu";

export default class Level3 extends Scene {
  constructor(config) {
    super("level3");
  }
  // Preload, create, update functions ---------------------------------
  preload() {}

  create() {
    this.localStorage = window.localStorage;
    this.createAudio();
    this.squareGameBoard();
    // this.higlightSquares()
    this.events.on("resize", this.resize, this);
    this.createMap();
    this.createSprites();
    this.createGameObjects();
    this.spriteMoveTo();
    this.addCollisions();
    this.createGui();
  }

  update() {
    this.spriteMoves();
    this.winCon();
  }

  //--Sprite Move functions----------------------------------------------------

  handlePointerDown(selectedSprite) {
    this.spriteSelection.forEach((sprite) => {
      if (sprite === selectedSprite) {
        if (sprite.isTinted) {
          sprite.deselect();
          this.pointerXY(sprite, 0);
        } else {
          sprite.select();
          sprite.moves();
          this.pointerXY(sprite, 400);
        }
      }
      if (sprite !== selectedSprite) {
        sprite.deselect();
        this.pointerXY(sprite, 0);
      } else {
      }
    });
  }

  spriteMoveTo() {
    this.spriteSelection.forEach((sprite) => {
      sprite.setInteractive();
      sprite.on(
        "pointerdown",
        () => {
          this.getSpriteSquare(sprite);
          this.handlePointerDown(sprite);
        },
        this
      );
    });
  }
  getSpriteSquare(sprite) {
    let sqX = Math.floor((sprite.x - this.gB.firstSq) / this.gB.sqW);
    let sqY = Math.floor((sprite.y - this.gB.firstSq) / this.gB.sqH);
    this.spSq = this.gB.squareMatrix[sqX][sqY];
  }
  pointerXY(sprite, speed) {
    this.input.on(
      "pointerdown",
      function (pointer) {
        if (sprite.body.speed === 0) {
          let sqX = Math.floor((pointer.x - this.gB.firstSq) / this.gB.sqW);
          let sqY = Math.floor((pointer.y - this.gB.firstSq) / this.gB.sqH);
          this.sqI = this.gB.squareMatrix[sqX][sqY];
          sprite.target.x = this.gB.sqNum[this.sqI].x + this.gB.sqW / 2;
          sprite.target.y = this.gB.sqNum[this.sqI].y + this.gB.sqH / 2;
          if (sprite.availableMoves.some((x) => x === this.sqI)) {
            this.rockRollSFX.play();
            this.scoreBox.addMove();
            this.physics.moveTo(
              sprite,
              sprite.target.x,
              sprite.target.y,
              speed
            );

            if (
              sprite.body.velocity.x >= 0 &&
              sprite.body.velocity.y < 0 &&
              sprite.isTinted
            ) {
              sprite.setAngle(0);
            }
            if (
              sprite.body.velocity.x >= 0 &&
              sprite.body.velocity.y === 0 &&
              sprite.isTinted
            ) {
              sprite.setAngle(90);
            }
            if (
              sprite.body.velocity.x < 0 &&
              sprite.body.velocity.y >= 0 &&
              sprite.isTinted
            ) {
              sprite.setAngle(-90);
            }
            if (
              sprite.body.velocity.x >= 0 &&
              sprite.body.velocity.y > 0 &&
              sprite.isTinted
            ) {
              sprite.setAngle(180);
            }
            if (sprite.isTinted) {
              this.rockMove.pause();
            }
          }
        } else {
        }
      },
      this
    );
  }

  spriteMoves() {
    this.spriteSelection.forEach((sprite) => {
      sprite.update();
      if (sprite.body.speed === 0) {
        this.rockMove.pause();
      } else {
        this.rockMove.resume();
      }
    });
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
      rows: 6,
      cols: 6,
      sqW: 200,
      sqH: 200,
      firstSq: 0,
      scene: this,
      exit: 23,
      altar: 8,
    });
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
      let x = (this.gB.sqW / 2) * Math.round(object.x / (this.gB.sqW / 2));
      let y = (this.gB.sqW / 2) * Math.round(object.y / (this.gB.sqW / 2));
      this.cameras.main.shake(300, 0.003);
      this.impactSFX.play()
      object.body.reset(x, y);
    };
    this.physics.add.collider(
      this.spriteSelection,
      this.wall,
      (sprite, wall) => {
        this.bounceReset(sprite);
        sprite.moves();
      }
    );
    this.physics.add.collider(
      this.pillars,
      this.pillars,
      (pillar1, pillar2) => {
        this.impactSFX.play();
        this.pillars.forEach((pillar) => {
          this.bounceReset(pillar);
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
      this.impactSFX.play();
    });
    this.physics.add.collider(this.pillars, this.stone, () => {
      this.cameras.main.shake(300, 0.003);
      this.impactSFX.play();
    });
    this.physics.add.collider(this.pillars, this.door),
      () => {
        this.cameras.main.shake(300, 0.003);
        this.impactSFX.play();
      };
    this.physics.add.collider(
      this.spriteSelection,
      this.pillars,
      (sprite, pillar) => {
       
        console.log(pillar.body);
        if (
          pillar.body.velocity.x !== 0 ||
          (pillar.body.velocity.y !== 0 &&
            pillar.body.speed === 0 &&
            sprite.body.speed !== 0)
        ) {
          
          this.slideShortSFX.play();
        }
      }
    );
    this.physics.add.collider(this.spriteSelection, this.wall);
    this.physics.add.collider(this.pillars, this.wall, () => {
      this.cameras.main.shake(300, 0.003);
      this.impactSFX.play();
    });
    this.physics.add.collider(this.pillars, this.altar);
    this.physics.add.overlap(
      this.spriteSelection,
      this.pillars,
      (sprite, pillar) => {
        if (pillar.body.velocity.x === 0 && pillar.body.velocity.y === 0) {
          this.bounceReset(sprite);
          sprite.moves();
          this.impactSFX.play();
        }
      }
    );
  }

  createMap() {
    // //create the tilemap
    const board = this.make.tilemap({ key: "level3Map" });
    //add tileset image
    const tilesPNG = board.addTilesetImage("tiles");
    // create our layers
    this.ground = board.createStaticLayer("ground", tilesPNG, 0, 0);
    this.floor = board.createStaticLayer("floor", tilesPNG, 0, 0);
    this.vinesFloor = board.createStaticLayer("tile", tilesPNG, 0, 0);
    this.wall = board.createStaticLayer("wall", tilesPNG, 0, 0);
    this.wall.setCollisionByExclusion([-1]);
    this.door = board.createStaticLayer("door", tilesPNG, 0, 0).setDepth(6);
    this.door.setCollisionByExclusion([-1]);
    this.vines = board.createStaticLayer("vines", tilesPNG, 0, 0);
    this.otherTree = board
      .createStaticLayer("vines2", tilesPNG, 0, 0)
      .setDepth(2);
    this.trees = board.createStaticLayer("vines3", tilesPNG, 0, 0).setDepth(3);
    this.tree1 = board.createStaticLayer("trees", tilesPNG, 0, 0).setDepth(3);
    this.tree2 = board.createStaticLayer("trees2", tilesPNG, 0, 0).setDepth(4);
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
    this.spriteSelection = [
      new CircleSprite({
        scene: this,
        x: -300,
        y: 700,
        key: "circleSheet",
        gB: this.gB,
      })
        .setDepth(5)
        .setBodySize(150, 150)
        .setAngle(90),
    ];
    // Intro movement for sprite
    this.spriteSelection[0].target.x = 300;
    this.spriteSelection[0].target.y = 700;
    this.physics.moveTo(
      this.spriteSelection[0],
      this.spriteSelection[0].target.x,
      this.spriteSelection[0].target.y,
      400
    );
    this.spriteSelection[0].play("roll");
  }
  createGameObjects() {
    //Stone sprite Creation
    this.stone = new stoneSprite({
      scene: this,
      x: -700,
      y: 700,
      key: "stone",
    }).setImmovable(true);
    // Opening Stone movement Intro
    this.stone.target.x = 100;
    this.stone.target.y = 700;
    this.slideSFX.play();
    this.physics.moveTo(
      this.stone,
      this.stone.target.x,
      this.stone.target.y,
      300
    );
    //Stone door creation

    this.stoneDoor = new doorSprite({
      scene: this,
      x: 1075,
      y: 700,
      key: "doorSheet",
    })
      .setDepth(7)
      .setScale(1.5)
      .setImmovable(true)
      .setBodySize(100, 100)
      .setAngle(90);

    //altar creation
    this.altar = new altar({
      scene: this,
      x: 700,
      y: 900,
      key: "altar",
      gB: this.gB,
      selected: this.selectedSquare,
      endX: 1075,
      endY: 400,
    }).setImmovable(true);

    this.pillars = [
      //   new Pillar({
      //     scene: this,
      //     x: 900,
      //     y: 700,
      //     key: "pillar",
      //     gB: this.gB,
      //     selected: this.selectedSquare,
      //   }).setDepth(1),
      //   new Pillar({
      //     scene: this,
      //     x: 700,
      //     y: 300,
      //     key: "pillar",
      //     gB: this.gB,
      //     selected: this.selectedSquare,
      //   }).setDepth(1),
      new Pillar({
        scene: this,
        x: 500,
        y: 900,
        key: "pillar",
        gB: this.gB,
        selected: this.selectedSquare,
      }).setDepth(1),
      new Pillar({
        scene: this,
        x: 500,
        y: 300,
        key: "pillar",
        gB: this.gB,
        selected: this.selectedSquare,
      }).setDepth(1),
      new Pillar({
        scene: this,
        x: 500,
        y: 500,
        key: "pillar",
        gB: this.gB,
        selected: this.selectedSquare,
      }).setDepth(1)
      //   new Pillar({
      //     scene: this,
      //     x: 300,
      //     y: 500,
      //     key: "pillar",
      //     gB: this.gB,
      //     selected: this.selectedSquare,
      //   }).setDepth(1),
    ];
  }
  createGui() {
    this.scoreBox = new score({ scene: this, totalMoves: 0 });
    this.menu = new menu({ scene: this, level: 'level3' });
  }
  winCon() {
    if (
      this.spriteSelection[0].distance === 0 &&
      this.scene.get("levelMap").levelArray[0].complete === true
    ) {
      this.scene.start("levelMap");
    }
    if (
      this.spriteSelection[0].x ===
        this.gB.sqNum[this.gB.exit].x + this.gB.sqW / 2 &&
      this.spriteSelection[0].y ===
        this.gB.sqNum[this.gB.exit].y + this.gB.sqH / 2
    ) {
      this.spriteSelection[0].target.x = 500;
      this.spriteSelection[0].target.y = -700;
      this.physics.moveTo(
        this.spriteSelection[0],
        this.spriteSelection[0].target.x,
        this.spriteSelection[0].target.y,
        400
      );

      this.scene.get("levelMap").localStorage.setItem("level4", "level4");

      this.spriteSelection[0].play("roll");
      this.scene.start("levelMap");
    }
  }
}
