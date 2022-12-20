class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.bg = new Background(ctx);
        this.dino = new Dino(ctx);
        this.cloud = new Cloud(ctx);
        this.enemies = [];
        this.tick = 0;
        this.tickDistance = 0;
        this.distanceDino = 0;
        this.enemLevel = 1;
        this.distanceEnem = 100;
        this.vx = 0;
    }
    start() { //TODO: clouds not included
        this.initListeners();
        this.spaceBool = true;
        this.interval = setInterval(() => {
            this.clear();
            this.draw();
            this.checkCollisions()
            this.addEnemy();
            this.move();
            this.getDistance();
            this.checkDistance();
            this.uiDistance();
        }, 1000/60)
    }
    getDistance() {
        this.tickDistance++;
        if (this.tickDistance > 6) {
            this.distanceDino++;
            this.tickDistance = 0;
        }
        // this.checkDistance(this.distanceDino);
    }
    uiDistance() { // TODO: High puntuation
        this.ctx.font = '48px "Press Start 2P"'; //ctx.save() ctx.scale(2, 2); ctx.restore()
        this.ctx.fillStyle = "#505050";
        this.ctx.textAlign = "center";
        function addLeadingZeros(num, totalLength) {
            return String(num).padStart(totalLength, '0');
        }
        this.ctx.fillText(addLeadingZeros(this.distanceDino, 5), canvas.width * 0.9, 50);
    }
    checkDistance() {
        if (this.distanceDino < 35) {
            this.distanceEnem = 100;
            this.setSpeed(-15);
            this.enemLevel = 1;
        } else if (this.distanceDino > 34 && this.distanceDino < 100) {
            this.distanceEnem = 100;
            this.setSpeed(-20)
            this.enemLevel = 2;
        } else if (this.distanceDino > 99 && this.distanceDino < 150) {
            const randomsito = Math.floor(Math.random() * (90-50) + 50);
            this.distanceEnem = randomsito;
            console.log(randomsito);
            this.setSpeed(-25);
            this.enemLevel = 2;
        } else if (this.distanceDino > 149 && this.distanceDino < 200) {
            const randomsito = Math.floor(Math.random() * (90-40) + 40);
            this.distanceEnem = randomsito;
            console.log(randomsito);
            this.setSpeed(-30);
            this.enemLevel = 2;
        } else if (this.distanceDino > 199) {
            const randomsito = Math.floor(Math.random() * (90-40) + 40);
            this.distanceEnem = randomsito;
            console.log(randomsito);
            this.setSpeed(-35);
            this.enemLevel = 2;
        }
    }
    setSpeed(speedVal) {
        this.bg.vx = speedVal;
        this.enemies.forEach(e => {
            e.enemyId === 0 ?  e.vx = speedVal : e.vx = speedVal;
            });
    }
    night() {
        this.ctx.filter = 'invert(1)';
    }
    gameOver() {
        this.stop()
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
        this.tick = 0;
        this.start();
        this.tickDistance = 0;
        this.distanceDino = 0; 
    }
    clear() {
        this.enemies = this.enemies.filter(e => e.isVisible())
        this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
            )
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
        this.tick++
        if (this.tick >= this.distanceEnem) { //90
            const enem = new Enemy(this.ctx);
            switch(this.enemLevel) {
                case 1:
                    enem.enemyId = 0;
                    break;
                case 2:
                    enem.enemyId = Math.floor(Math.random() * 2);
                    break;
            }
            this.enemies.push(enem);
            this.tick = 0;
        }
    }
    draw() {
        this.bg.draw();
        this.dino.draw();
        this.enemies.forEach(e => e.draw())
        // this.cloud.draw();
    }
    move() {
        this.bg.move();
        this.dino.move();
        this.enemies.forEach(e => e.move())
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