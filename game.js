class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.interval = null;
        this.player = new Player(ctx, 5, 250, 50, 50, 'red'); //(ctx, x, y, w, h, fillStyle, lightness, hardness 1-5, xFriction 0.01 - 0.1)
        this.enemy = new Enemy(ctx, 'black');
        this.enemies = [];
    }
    start() {
        this.interval = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
        }, 1000/60)
        setInterval(() => {
            this.enemies.push(
                new Enemy(ctx)
                );
        }, 1000)
    }
    stop() {
        clearInterval(this.interval);
    }
    draw() {
        this.player.draw();
        this.enemies.forEach(enemy => enemy.draw());
    }
    move() {
        this.player.move();
        this.enemies.forEach(enemy => enemy.move());
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
        this. enemies = this.enemies.filter(e => (e.y + e.h) > 0);
        this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
        )
    }
}