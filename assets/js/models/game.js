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
    }
    start() { //TODO: check addMoon; inmunity; fireball;
        this.moon.restart();
        this.initListeners();
        this.spaceBool = true;
        this.interval = setInterval(() => {
            this.clear();
            this.isDay();
            this.draw();
            this.getDistance();
            this.uiPanel();
            this.uiDistShow(this.uiBlinkBool);
            this.uiDistBlink(this.uiBlinkBool);
            this.checkDistance();
            this.checkCollisions();
            this.addCloud();
            this.addEnemy();
            this.move();
        }, 1000/60)
    }
    getDistance() {
        this.distanceDino = Math.floor(this.bg.distanceBg / 100) * -1;
    }
    uiPanel() {
        this.ctx.font = '38px "Press Start 2P"'; //ctx.save() ctx.scale(2, 2); ctx.restore()
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "grey";
        this.ctx.fillText("HI", canvas.width * 0.68, 80);
        this.ctx.fillText(this.addLeadingZeros(this.higherDist, 5), canvas.width * 0.78, 80);
        
        if (this.distanceDino >= this.uiCheckPoint &&
            this.distanceDino % this.uiCheckPoint === 0) {
                this.uiBlinkDist = this.distanceDino;
                this.audioCheck.play();
                this.uiBlinkBool = true;
            }
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
                    console.log(this.tickBlinkUiOf);
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
        if (this.distanceDino % 400 === 0 && this.distanceDino > 100) {
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
            this.setSpeed(-20)
            this.enemLevel = 1;
        } else if (this.distanceDino > 54 && this.distanceDino < 100) {
    
            this.distanceEnem = 100;
            this.distanceCloud = 100;
            this.setSpeed(-20)
            this.enemLevel = 2;
        } else if (this.distanceDino > 99 && this.distanceDino < 150) {
            const disRandEnem = Math.floor(Math.random() * (90-50) + 50);
            const disRandCloud = Math.floor(Math.random() * (90-50) + 50);
            this.distanceEnem = disRandEnem;
            this.distanceCloud = disRandCloud;
            this.setSpeed(-25);
            this.enemLevel = 2;
        } else if (this.distanceDino > 149 && this.distanceDino < 200) {
            const disRandEnem = Math.floor(Math.random() * (90-40) + 40);
            const disRandCloud = Math.floor(Math.random() * (90-30) + 30);
            this.distanceEnem = disRandEnem;
            this.distanceCloud = disRandCloud;
            this.setSpeed(-30);
            this.enemLevel = 2;
        } else if (this.distanceDino > 199 && this.distanceDino < 250) {
            const disRandEnem = Math.floor(Math.random() * (90-40) + 40);
            const disRandCloud = Math.floor(Math.random() * (90-30) + 30);
            this.distanceEnem = disRandEnem;
            this.distanceCloud = disRandCloud;
            this.setSpeed(-35);
            this.enemLevel = 2;
        } else if (this.distanceDino > 249) {
            const disRandEnem = Math.floor(Math.random() * (90-40) + 40);
            const disRandCloud = Math.floor(Math.random() * (90-30) + 30);
            this.distanceEnem = disRandEnem;
            this.distanceCloud = disRandCloud;
            this.setSpeed(-45);
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
        this.moon.vx = speedVal / 5;
    }  
    gameOver() {
        if (this.distanceDino > this.higherDist) {
            this.higherDist = this.distanceDino;
        }    
        this.stop();
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
            y, // y pos
            762, 100 //size of the image outer
        );
        this.loadingImg = {
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
        clearInterval(this.interval);
        let tickGameOver = 0;
        let frameLoadingImg = 0;
        this.interval2 = setInterval(() => {
            console.log("ey")
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
        if (frameLoadingImg >= this.loadingImg.sx.length) {
            clearInterval(this.interval2);
        }
        setTimeout(() => {
            document.onkeydown = e => {
                this.spaceBool = false
                game.dino.onKeyDown(e.code, this.spaceBool);
                clearInterval(this.interval2);
                this.restart();
            }
        }, 300);
    }
    restart() {
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
        this.start();
    }
    clear() {
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

            din.boundingBoxes.forEach(db => {
                const colX = (db.x + db.w) >= e.x && (e.x + e.dw) >= db.x;
                const colY = (db.y + db.h) >= e.y && db.y <= (e.y + e.dh);
    
                if (colX && colY) {
                    this.gameOver();
                }
            });
        });
    }
    initListeners() {
        document.onkeydown = e => {
            game.dino.onKeyDown(e.code, this.spaceBool);
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