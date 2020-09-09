import { Scene } from "phaser";
import stoneSprite from "../logic/stoneSprite";
import CircleSprite from "../logic/CircleSprite";
import doorSprite from "../logic/doorSprite";
import Pillar from "../logic/Pillar";
import GameBoard from "../logic/GameBoard";
import spriteCreation from "../logic/spriteCreation";

export default class Level1 extends Scene {
  constructor() {
    super("level1");
  }
  // Preload, create, update functions ---------------------------------
  preload() {}

  create() {
    this.createAudio();
    this.squareGameBoard();
    // this.higlightSquares()
    this.events.on("resize", this.resize, this);
    this.createMap();
    this.createSprites();
    this.createGameObjects();
    this.spriteMoveTo();
    this.addCollisions();
  }

  update() {
    this.spriteMoves();
    this.altarPress();
    this.pillarMoves();

    // this.pillarMoves();
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
    let sqX = Math.floor(sprite.x / this.gB.sqW);
    let sqY = Math.floor(sprite.y / this.gB.sqH);
    this.spSq = this.gB.squareMatrix[sqX][sqY];
  }
  pointerXY(sprite, speed) {
    this.input.on(
      "pointerdown",
      function (pointer) {
        if (sprite.body.speed === 0) {
          let sqX = Math.floor(pointer.x / this.gB.sqW);
          let sqY = Math.floor(pointer.y / this.gB.sqH);
          this.sqI = this.gB.squareMatrix[sqX][sqY];
          sprite.target.x = this.gB.sqNum[this.sqI].x + this.gB.sqW / 2;
          sprite.target.y = this.gB.sqNum[this.sqI].y + this.gB.sqH / 2;
          if (sprite.availableMoves.some((x) => x === this.sqI)) {
            this.rockRollSFX.play();
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
  // Game Board Squares Moves Functions -------------------------
  // higlightSquares() {
  //   this.input.on("pointerover", function (event, gameObjects) {
  //     gameObjects[0].setTint(0xff0000);
  //   });
  //   this.input.on("pointerout", function (event, gameObjects) {
  //     gameObjects[0].clearTint();
  //   });
  // }

  squareGameBoard() {
    this.gB = new GameBoard({
      rows: 5,
      cols: 5,
      sqW: 200,
      sqH: 200,
      scene: this,
      exit: 2,
      altar: 11,
    });
    this.gB.squareBoard();

    // for (let i = 0; i < this.gB.sqNum.length; i++) {
    //   this.add
    //     .text(this.gB.sqNum[i].x, this.gB.sqNum[i].y, i, {
    //       color: "#ffffff",
    //       fontSize: "30px",
    //     })
    //     .setDepth(1);
    // }
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
    // this.physics.add.overlap(this.spriteSelection, this.alter, () => {
    //   this.altarPress();
    // })

    this.bounceReset = (object) => {
      let x = (this.gB.sqW / 2) * Math.round(object.x / (this.gB.sqW / 2));
      let y = (this.gB.sqW / 2) * Math.round(object.y / (this.gB.sqW / 2));
      object.body.reset(x, y);
    };
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
        this.impactSFX.play();
      }
    );
    this.physics.add.collider(this.pillars, this.stoneDoor);
    this.physics.add.collider(this.pillars, this.stone);
    this.physics.add.collider(this.pillars, this.door);
    this.physics.add.collider(
      this.spriteSelection,
      this.pillars,
      (sprite, pillar) => {
        console.log(pillar.body);
        if (
          pillar.body.velocity.x !== 0 ||
          (pillar.body.velocity.y !== 0 && pillar.body.speed === 0 && sprite.body.speed !== 0)
        ) {
          this.impactSFX.play();
          this.slideShortSFX.play();
        }

      }
    );
    this.physics.add.collider(this.spriteSelection, this.wall);
    this.physics.add.collider(this.pillars, this.wall, () => {
      this.impactSFX.play();
    });
    this.physics.add.collider(this.pillars, this.alter);
    this.physics.add.overlap(
      this.spriteSelection,
      this.pillars,
      (sprite, pillar) => {
    

        if (
          pillar.body.velocity.x === 0 &&
          pillar.body.velocity.y === 0 
          
        ) {
          this.bounceReset(sprite);
          sprite.moves();
          this.impactSFX.play();
        }
      }
    );
  }

  altarPress() {
    if (
      this.spriteSelection[0].x === 300 &&
      this.spriteSelection[0].y === 500
    ) {
      this.emitter.explode();
      this.emitter.killAll();
      this.stoneDoor.target.x = 750;
      this.stoneDoor.target.y = 125;
      this.physics.moveTo(
        this.stoneDoor,
        this.stoneDoor.target.x,
        this.stoneDoor.target.y,
        200
      );
      this.stoneDoor.play("rollDoor");
    }
  }

  createMap() {
    // //create the tilemap
    const board = this.make.tilemap({ key: "level1GameBoard" });
    //add tileset image
    const tilesPNG = board.addTilesetImage("tiles");
    // create our layers
    this.ground = board.createStaticLayer("ground", tilesPNG, 0, 0);
    this.floor = board.createStaticLayer("floor", tilesPNG, 0, 0);
    this.vinesFloor = board.createStaticLayer("vines floor", tilesPNG, 0, 0);
    this.wall = board.createStaticLayer("wall", tilesPNG, 0, 0);
    this.wall.setCollisionByExclusion([-1]);
    this.door = board.createStaticLayer("Door", tilesPNG, 0, 0).setDepth(6);
    this.door.setCollisionByExclusion([-1]);
    this.vines = board.createStaticLayer("vines", tilesPNG, 0, 0);
    this.otherTree = board
      .createStaticLayer("other tree", tilesPNG, 0, 0)
      .setDepth(3);
    this.trees = board.createStaticLayer("trees", tilesPNG, 0, 0).setDepth(3);
    this.tree1 = board.createStaticLayer("tree1", tilesPNG, 0, 0).setDepth(3);
    this.tree2 = board.createStaticLayer("tree2", tilesPNG, 0, 0).setDepth(3);
    this.tree3 = board.createStaticLayer("tree3", tilesPNG, 0, 0).setDepth(3);
    this.tree4 = board.createStaticLayer("tree4", tilesPNG, 0, 0).setDepth(6);
    this.tree5 = board.createStaticLayer("tree5", tilesPNG, 0, 0).setDepth(7);
    this.tree6 = board.createStaticLayer("tree6", tilesPNG, 0, 0).setDepth(3);
  }

  createAudio() {
    this.music = this.sound.add("level1", { loop: true }).play();
    this.slideSFX = this.sound.add("slide", { volume: 0.2 });
    this.slideShortSFX = this.sound.add("slideShort", { volume: 0.2 });
    this.impactSFX = this.sound.add("impact", { volume: 0.5 });
    this.rockRollSFX = this.sound.add("rockRoll", { volume: 0.5 });
  }
  createSprites() {
    //Sprite animation
    var config = {
      key: "roll",
      frames: this.anims.generateFrameNumbers("circleSheet", {
        start: 0,
        end: 60,
        first: 0,
      }),
      frameRate: 60,
      repeat: -1,
    };
    this.rockMove = this.anims.create(config);
    //Sprite creation
    this.spriteSelection = [
      new CircleSprite({
        scene: this,
        x: 500,
        y: 1500,
        key: "circleSheet",
        gB: this.gB,
      })
        .setDepth(5)
        .setBodySize(150, 150),
    ];
    // Intro movement for sprite
    this.spriteSelection[0].target.x = 500;
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
      x: 500,
      y: 1700,
      key: "stone",
    }).setImmovable(true);
    // Opening Stone movement Intro
    this.stone.target.x = 500;
    this.stone.target.y = 900;
    this.slideSFX.play();
    this.physics.moveTo(
      this.stone,
      this.stone.target.x,
      this.stone.target.y,
      300
    );

    //Door rolling animation
    var config = {
      key: "rollDoor",
      frames: this.anims.generateFrameNumbers("doorSheet", {
        start: 1,
        end: 30,
        first: 1,
      }),
      frameRate: 14,
      repeat: 1,
    };
    this.stoneDoorMove = this.anims.create(config);
    this.stoneDoor = new doorSprite({
      scene: this,
      x: 500,
      y: 125,
      key: "doorSheet",
    })
      .setDepth(7)
      .setScale(1.5)
      .setImmovable(true)
      .setBodySize(100, 100);

    //alter
    this.alter = new Pillar({
      scene: this,
      x: 300,
      y: 500,
      key: "alter",
      gB: this.gB,
      selected: this.selectedSquare,
    }).setImmovable(true);
    let circle = (this.emitter = this.add.particles("grass").createEmitter({
      x: 300,
      y: 500,
      blendMode: "SCREEN",
      scale: { start: 0.03, end: 0 },
      speed: { min: -100, max: 100 },
      quantity: 20,
      emitZone: {
        source: new Phaser.Geom.Circle(0, 0, 100),
        type: "edge",
        quantity: 20,
      },
    }));

    this.pillars = [
      new Pillar({
        scene: this,
        x: 300,
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
      }).setDepth(1),
      new Pillar({
        scene: this,
        x: 300,
        y: 700,
        key: "pillar",
        gB: this.gB,
        selected: this.selectedSquare,
      }).setDepth(1),
    ];
  }
}
