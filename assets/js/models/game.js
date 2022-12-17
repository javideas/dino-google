class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.bg = new Background(ctx);
        this.dino = new Dino(ctx);
        this.enemies = [];
        this.tick = 0;
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
        }, 1000/60)
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
            const colX = (din.x + din.dw) >= e.x && (e.x + e.dw) >= din.x;
            const colY = (e.y + e.dh) >= din.y && e.y <= (din.y + din.dh);
            
            if (colX && colY) {
                this.gameOver();
            }
        })
    }
    initListeners() {
        document.onkeydown = e => {
            game.dino.onKeyDown(e.code, this.spaceBool);
        }
    }
    addEnemy() {
        this.tick++
        if (this.tick >= 90) {
            // this.tick = 200 + Math.random() * 40;
            this.enemies.push(new Enemy(this.ctx));
            this.tick = 0;
        }
    }
    draw() {
        this.bg.draw();
        this.dino.draw();
        this.enemies.forEach(e => e.draw())
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