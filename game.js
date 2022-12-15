class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.interval = null;
        this.player = new Player(ctx, 50, 50, 50, 50, 'red'); //(ctx, x, y, w, h, fillStyle, lightness, hardness 1-5, xFriction 0.01 - 0.1)
    }
    start() {
        this.interval = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
        }, 1000/60)
    }
    stop() {
        clearInterval(this.interval);
    }
    draw() {
        this.player.draw();
    }
    move() {
        this.player.move();
    }
    right() {
        this.player.right();
    }
    left() {
        this.player.left();
    }
    up() {
        this.player.up();
    }
    down() {
        this.player.down();
    }
    clear() {
        this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
        )
    }
}