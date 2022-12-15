class Enemy {
    constructor(ctx, fillStyle) {
        this.ctx = ctx;
        this.w = Math.random() * (100-20);
        this.x1 = Math.random() * (this.ctx.canvas.width - this.w);
        this.x = this.x1 < 60 ? this.x1 + 60 : this.x1;
        this.h = this.w;
        this.y = this.ctx.canvas.height;
        this.vy = -2;
        this.fillStyle = fillStyle;
    }
    draw() {
        const prevFillStyle = this.fillStyle;
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.ctx.fillStyle = prevFillStyle;
    }
    move() {
        this.y += this.vy;
    }
}



