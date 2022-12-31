class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.canvasGame = new CanvasGame(ctx);
        this.bg = new Background(ctx);
        this.dino = new Dino(ctx);
        this.clouds= [];
        this.moon = new Moon(ctx);
        this.isMoonBool = false;
        this.enemies = [];
        this.tick = 0;
        this.tickCloud = 0;
        this.tickMoon = 0;
        this.distanceDino = 0;
        this.enemLevel = 1;
        this.distanceEnem = 100;
        this.distanceCloud = 100;
        this.vx = 0;
        this.canvasGame = new CanvasGame(ctx);
    }
    start() { //TODO: clouds not included
        this.initListeners();
        this.spaceBool = true;
        this.interval = setInterval(() => {
            this.clear();
            this.draw();
            this.addMoon(this.isMoonBool);
            this.checkDistance();
            this.checkCollisions();
            this.addCloud();
            this.addEnemy();
            this.move();
            this.getDistance();
            this.uiDistance();
        }, 1000/60)
    }
    getDistance() {
        this.distanceDino = Math.floor(this.bg.distanceBg / 100) * -1;
    }
    uiDistance() { // TODO: High puntuation
        this.ctx.font = '48px "Press Start 2P"'; //ctx.save() ctx.scale(2, 2); ctx.restore()
        this.ctx.fillStyle = "#505050";
        this.ctx.textAlign = "center";
        function addLeadingZeros(num, totalLength) {
            return String(num).padStart(totalLength, '0');
        }
        this.ctx.fillText(addLeadingZeros(this.distanceDino, 5), canvas.width * 0.86, 50);
    }
    checkDistance() {
        if (this.distanceDino < 15) {
            this.isDay()
            this.distanceEnem = 100;
            this.distanceCloud = 100;
            this.setSpeed(-15);
            this.enemLevel = 1;
        } else if (this.distanceDino > 14 && this.distanceDino < 100) {
            this.isNight();
            this.distanceEnem = 100;
            this.distanceCloud = 100;
            this.setSpeed(-20)
            this.enemLevel = 2;
        } else if (this.distanceDino > 99 && this.distanceDino < 150) {
            this.isDay()
            const randomEnem = Math.floor(Math.random() * (90-50) + 50);
            const randomCloud = Math.floor(Math.random() * (90-50) + 50);
            this.distanceEnem = randomEnem;
            this.distanceCloud = randomCloud;
            this.setSpeed(-25);
            this.enemLevel = 2;
        } else if (this.distanceDino > 149 && this.distanceDino < 200) {
            this.isNight();
            const randomEnem = Math.floor(Math.random() * (90-40) + 40);
            const randomCloud = Math.floor(Math.random() * (90-30) + 30);
            this.distanceEnem = randomEnem;
            this.distanceCloud = randomCloud;
            this.setSpeed(-30);
            this.enemLevel = 2;
        } else if (this.distanceDino > 199 && this.distanceDino < 250) {
            this.isDay()
            const randomEnem = Math.floor(Math.random() * (90-40) + 40);
            const randomCloud = Math.floor(Math.random() * (90-30) + 30);
            this.distanceEnem = randomEnem;
            this.distanceCloud = randomCloud;
            this.setSpeed(-35);
            this.enemLevel = 2;
        } else if (this.distanceDino > 249) {
            const randomEnem = Math.floor(Math.random() * (90-40) + 40);
            const randomCloud = Math.floor(Math.random() * (90-30) + 30);
            this.distanceEnem = randomEnem;
            this.distanceCloud = randomCloud;
            this.setSpeed(-45);
            this.enemLevel = 2;
        }
    }
    isNight() {
        this.isMoonBool = true;
        this.canvasGame.invertColor(true);
        this.clouds.forEach(c => c.invertColor(true));
        this.bg.invertColor(true);
        this.dino.invertColor(true);
        this.enemies.forEach(e => e.invertColor(true));
    }
    isDay() {
        this.isMoonBool = false;
        this.canvasGame.invertColor(false);
        this.clouds.forEach(c => c.invertColor(false));
        this.bg.invertColor(false);
        this.dino.invertColor(false);
        this.enemies.forEach(e => e.invertColor(false));
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
        this.stop();
    }
    stop() {
        clearInterval(this.interval);
        setTimeout(() => {
            document.onkeydown = e => {
                this.spaceBool = false
                game.dino.onKeyDown(e.code, this.spaceBool);
                this.restart();
            }
        }, 300);
    }
    restart() { 
        this.bg = new Background(ctx);
        this.dino = new Dino(ctx);
        this.enemies = [];
        this.clouds = [];
        this.tick = 0;
        this.start();
        this.distanceDino = 0; 
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
        this.tick++;
        if (this.tick >= this.distanceEnem) { //(this.tick >= this.distanceEnem)
            const enem = new Enemy(this.ctx);
            switch(this.enemLevel) {
                case 1:
                    enem.enemyId = 0;
                    break;
                case 2:
                    enem.enemyId = Math.floor(Math.random() * enem.img.enemies.length);
                    break;
            }
            this.enemies.push(enem);
            this.tick = 0;
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
    addMoon(value) {
        if (value === true) {
            this.moon.draw(value);
            this.moon.move(value);
            value = this.moon.moonFinish;
        } else {
            this.moon.draw(value);
            this.moon.move(value);
            value = this.moon.moonFinish;
        }
    }
    draw() {
        this.canvasGame.draw();
        this.bg.draw();
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
    // resize() {
    //     addEventListener("resize", (event) => {
    //         // Get the current width and height of the canvas
    //         // Update the dino's dimensions based on the canvas size
    //         const canvasWidth = window.innerWidth;
    //         const canvasHeight = window.innerHeight;
    //         dino.resize(canvasWidth, canvasHeight);
    //     });
    // }
}