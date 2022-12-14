class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.interval = null;
        this.player = [] //(ctx, x, y, w, h, fillStyle, lightness, hardness 1-5, xFriction 0.01 - 0.1)
        this.pMarbleBall = new Ball(ctx,200,200,50,50,'blue', -1, 1, 0.01);
        this.pBowlingBall = new Ball(ctx,400,200,50,50,'black', -0.5, 1, 0.01);
    }
    start() {
        this.interval = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
        }, 1000/60)
    }
    marbleBall() {
        this.player = this.pMarbleBall;
    }
    bowling() {
        this.player = this.pBowlingBall;
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
    clear() {
        this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
        )
    }
}