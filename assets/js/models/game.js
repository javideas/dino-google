class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.higherDist = 0;
        this.imgOver = new Image();
        this.imgOver.src = "img/dino-sprites.png";
        this.audioCheck = new Audio("audio/checkPoint.mp3");
        this.audioOver = new Audio("audio/gameOver.mp3");
        this.canvasGame = new CanvasGame(ctx);
        this.bg = new Background(ctx);
        this.dino = new Dino(ctx);
        this.clouds= [];
        this.moon = new Moon(ctx);
        this.enemies = [];
        this.tickEnem = 0;
        this.tickCloud = 0;
        this.tickMoon = 0;
        this.tickBlinkRound = 0;
        this.tickBlinkUiOf = 0;
        this.uiBlinkBool = false;
        this.uiCheckPoint = 100;
        this.uiBlinkDist = 0;
        this.distanceDino = 0;
        this.distanceEnem = 100;
        this.distanceCloud = 100;
        this.enemLevel = 1;
        this.vx = 0;
        this.stopBool = false;

        this.setScore = false;

        this.letters = [];
        this.initials = "";
        this.usePHP = false;
        this.currentScore = 0;
        
    }
    start() { // inmunity; fireball;
        this.currentScore = 0;
        this.moon.restart();
        this.initListeners();
        this.spaceBool = true;
        this.interval = setInterval(() => {
            this.clear();
            this.isDay();
            this.draw();
            this.getDistance();
            this.uiDistShow(this.uiBlinkBool);
            this.uiDistBlink(this.uiBlinkBool);
            this.checkDistance();
            this.checkCollisions();
            this.addCloud();
            this.addEnemy();
            this.move();
            this.uiPanel();
        }, 1000/60)
    }
    getDistance() {
        this.distanceDino = Math.floor(this.bg.distanceBg / 100) * -1;
    }
    updateScores(highScores) {
        if (highScores && this.usePHP) {
            ctx.textAlign = "center";
            for (var i = 0; i < highScores.length; i++) {
              var text = highScores[i]['initials'] + ' ' + highScores[i]['distance'];
              ctx.fillText(text, canvas.width / 2, 50 + (i * 40));
           }
        }
    }
    uiDistances() {
        this.ctx.font = '38px "Press Start 2P"';
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "grey";
        this.ctx.fillText("HI", canvas.width * 0.68, 80);
        this.ctx.fillText(this.addLeadingZeros(this.higherDist, 5), canvas.width * 0.78, 80);
    }    
    uiPanel(highScores) {
        this.uiDistances();
        this.updateScores(highScores);
        
        if (this.distanceDino >= this.uiCheckPoint && this.distanceDino % this.uiCheckPoint === 0) {
            this.uiBlinkDist = this.distanceDino;
            this.audioCheck.play();
            this.uiBlinkBool = true;
    }
    }
    gameOver() {
        // if (this.usePHP === false) {
        //     this.uiDistances();
        // }
        this.setScore = true;
        this.currentScore = this.distanceDino;
        if (this.distanceDino > this.higherDist) {
            this.higherDist = this.distanceDino;
            this.showKeyboard(true);
        }
        this.stop();
    }
    showKeyboard(value){
        document.querySelector('.keyboard').style.display = this.usePHP && value ? 'block' : 'none';
    }
    stop() {
        this.audioOver.play();
        const x = this.ctx.canvas.width/2;
        const y = this.ctx.canvas.height/2 - 100/2;
        this.ctx.drawImage(this.imgOver, //Game Over message
            1294, //cut in sx
            29, //cut in sy
            381, 50, //size of the image inner
            x  - 762/2, // x pos
            y + 50, // y pos
            762, 100 //size of the image outer
        );
        this.loadingImg = { // draw info of loading animation
            sx: [
                75.5,
                147.5,
                220,
                292,
                364,
                436,
                508
            ]
        };
        clearInterval(this.interval); //stop this.start()
        let tickGameOver = 0;
        let frameLoadingImg = 0;
        this.interval2 = setInterval(() => { // animation of loading
            if (frameLoadingImg < this.loadingImg.sx.length) {
                tickGameOver++;
                if (tickGameOver >= 10) {
                    this.ctx.drawImage(this.imgOver, //Game Over message 55
                        this.loadingImg.sx[frameLoadingImg], //cut in sx
                        132, //cut in sy
                        68, 60, //size of the image inner
                        x - 100/2, // x pos
                        this.ctx.canvas.height/1.6, // y pos
                        136, 120 //size of the image outer
                    );
                    frameLoadingImg++;
                    tickGameOver = 0;
                }
            }
        }, 1000/60);
        this.getInitialsBtns();
        if (frameLoadingImg >= this.loadingImg.sx.length) { // stop anim of loading
            clearInterval(this.interval2);
        }
        setTimeout(() => {
            document.onkeydown = e => {
                this.spaceBool = false
                game.dino.onKeyDown(e.code, this.spaceBool);
                this.restart();
            }
        }, 1000);
    }
    restart() {
        this.letters = [];
        this.setScore = false;
        this.distanceDino = 0;
        this.tickBlinkRound = 0;
        this.tickBlinkUiOf = 0;
        this.uiBlinkBool = false;
        this.bg = new Background(ctx);
        this.dino = new Dino(ctx);
        this.enemies = [];
        this.clouds = [];
        this.tickEnem = 0;
        this.moon.restart();
        this.showKeyboard(false);
        this.start();
    }
    clear() {
        this.dino.clearBullets();
        this.enemies = this.enemies.filter(e => e.isVisible());
        this.clouds = this.clouds.filter(c => c.isVisible());
        this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
            );
    }
    checkCollisions() {
        const din = this.dino;
        this.enemies.forEach(e => {
            let colEnemX = (din.x + din.dw) >= e.x && (e.x + e.dw) >= din.x;
            let colEnemY = (din.y + din.dh) >= e.y && din.y <= (e.y + e.dh);

            if (colEnemX && colEnemY) {
                this.gameOver();
            }
          din.bullets.forEach(b => {
            // Check if the bullet is still on the screen
            if (b.ballBoundingBox.x < this.ctx.canvas.width && b.ballBoundingBox.x > 0) {
              // Check the flag before executing the collision detection logic
              if (!b.hasCollided) {
                let colBulEnemX = (b.ballBoundingBox.x + b.ballBoundingBox.w) >= e.x && (e.x + e.dw) >= b.ballBoundingBox.x;
                let colBulEnemY = (b.ballBoundingBox.y + b.ballBoundingBox.h) >= e.y && b.ballBoundingBox.y <= (e.y + e.dh);
                if (colBulEnemX && colBulEnemY) {
                  if (this.enemyId === 0) {
                    this.enemies = this.enemies.filter(e => {
                      e.isVisible()});
                  }
                  if (e.enemyId > 0) {
                    b.vx *= -3;
                    // setTimeout(() => {
                    //   b.vx = 10;
                    // }, 1000);
                  }
                  // Set the flag to true to indicate that the bullet and enemy have collided
                  b.hasCollided = true;
                } 
              }
            }
            // Reset the flag when the bullet is no longer on the screen
            else {
              b.hasCollided = false;
            }
            if (e.enemyId > 0 && b.vx < 0) {
                let colBulDinX = (b.ballBoundingBox.x + b.ballBoundingBox.w) >= din.x && (din.x + din.dw) >= b.ballBoundingBox.x;
                let colBulDinY = (b.ballBoundingBox.y + b.ballBoundingBox.h) >= din.y && b.ballBoundingBox.y <= (din.y + din.dh);
                if (colBulDinX && colBulDinY) {
                  this.gameOver();
                }
              }
          });
        });
      }
      
    addLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0');
    }
    uiDistShow(uiBlinkBool) {
        if (uiBlinkBool === false) {
            this.ctx.fillStyle = "#505050";
            this.ctx.fillText(this.addLeadingZeros(this.distanceDino, 5), canvas.width * 0.9, 80);
        }
    }
    uiDistBlink(uiBlinkBool) {
        if (uiBlinkBool){
            this.tickBlinkUiOf++;
            if (this.tickBlinkUiOf >= 25) {
                this.ctx.fillStyle = "#505050";
                this.ctx.fillText(this.addLeadingZeros(this.uiBlinkDist, 5), canvas.width * 0.9, 80);
                if (this.tickBlinkUiOf >= 50) {
                    this.tickBlinkRound++;
                    this.tickBlinkUiOf = 0;
                }
            }
            if (this.tickBlinkRound > 2) {
                this.uiBlinkBool = false;
                this.tickBlinkRound = 0;
            }
        }
    }
    checkDistance() {
        if (this.distanceDino % 150 === 0 && this.distanceDino > 100 && this.distanceDino < 300) {
            this.isNight();
        }
        if (this.distanceDino % 400 === 0 && this.distanceDino > 350) {
            this.isNight();
        }
        if (this.distanceDino < 15) {
            this.distanceEnem = 100;
            this.distanceCloud = 100;
            this.setSpeed(-15);
            this.enemLevel = 1;
        } else if (this.distanceDino > 14 && this.distanceDino < 55) {
            this.distanceEnem = 100;
            this.distanceCloud = 100;
            this.setSpeed(-17)
            this.enemLevel = 1;
        } else if (this.distanceDino > 54 && this.distanceDino < 100) {
            this.distanceEnem = 100;
            this.distanceCloud = 100;
            this.setSpeed(-22)
            this.enemLevel = 2;
        } else if (this.distanceDino > 99) {
            const disRandEnem = Math.floor(Math.random() * (90-50) + 50);
            const disRandCloud = Math.floor(Math.random() * (90-50) + 50);
            this.distanceEnem = disRandEnem;
            this.distanceCloud = disRandCloud;
            this.setSpeed(-27);
            this.enemLevel = 2;
        }
    }
    isNight() {
        this.moon.addMoon = true;
        this.canvasGame.invertColor(true);
        this.clouds.forEach(c => c.invertColor(true));
        this.bg.invertColor(true);
        this.dino.invertColor(true);
        this.enemies.forEach(e => e.invertColor(true));
    }
    isDay() {
        if (this.moon.addMoon === false) {
            this.canvasGame.invertColor(false);
            this.clouds.forEach(c => c.invertColor(false));
            this.bg.invertColor(false);
            this.dino.invertColor(false);
            this.enemies.forEach(e => e.invertColor(false));
        }
    }
    setSpeed(speedVal) {
        this.bg.vx = speedVal;
        this.enemies.forEach(e => {
            e.enemyId === 0 ?  e.vx = speedVal : e.vx = speedVal;
        });
        this.clouds.forEach(c => {
            c.vx = speedVal / 2;
        });
        this.moon.vx = speedVal / 8;
    }  
    initListeners() {
        document.onkeydown = e => {
            game.dino.onKeyDown(e.code, this.spaceBool);
        };
        document.onkeyup = e => {
            game.dino.onKeyUp(e.code, this.spaceBool);
        };
    }
    getInitialsBtns() {
        const buttons = document.querySelectorAll('.kbc-button');
        let clicks = 0;
    
        for (const button of buttons) {
            button.addEventListener('click', () => {
                clicks++;
                if (clicks <= 3) {
                this.letters.push(button.innerHTML);
                }
                if (clicks === 3) {
                this.initials = this.letters.join('');
                console.log(`Initials: ${this.initials}`);
                }
            });
        }
    }
    addEnemy() {
        this.tickEnem++;
        if (this.tickEnem >= this.distanceEnem) {
            const enem = new Enemy(this.ctx);
            switch(this.enemLevel) {
                case 1: // beginning of game, only minicactus
                    enem.enemyId = 1;
                    break;
                case 2: // after beginning choose random(pterodactyl, random(bigCactus))
                    const idCactus = Math.floor(Math.random() * (enem.img.enemies.length - 1) + 1);
                    const enemiesIds = [0, idCactus];
                    enem.enemyId = enemiesIds[Math.floor(Math.random() * enemiesIds.length)];
                    break;
            }
            this.enemies.push(enem);
            this.tickEnem = 0;
            this.enemyId = enem.enemyId;
        }
    }
    addCloud() {
        this.tickCloud++;
        if (this.tickCloud >= this.distanceCloud) { // this.distanceEnem 100
            const cloud = new Cloud(this.ctx);
            this.clouds.push(cloud);
            this.tickCloud = 0;
        }
    } 
    draw() {
        this.canvasGame.draw();
        this.bg.draw();
        this.moon.draw();
        this.clouds.forEach(c => c.draw());
        this.dino.draw();
        this.enemies.forEach(e => e.draw());
    }
    move() {
        this.bg.move();
        this.dino.move();
        this.enemies.forEach(e => e.move());
        this.clouds.forEach(c => c.move());
    }
}