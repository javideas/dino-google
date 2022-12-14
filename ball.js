class Ball {
    constructor(ctx, x, y, w, h, fillStyle, lightness, hardness, xFriction) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = 1;
        this.vy = 1;
        this.lightness = lightness;
        this.hardness = hardness;
        this.xFriction = xFriction;
        this.fillStyle = fillStyle;
    }
    draw() {
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    move() {
        this.vy += this.hardness;
        this.y += this.vy;
        this.x += this.vx;
        if (this.x + this.w >= this.ctx.canvas.width || this.x <= 0){
            this.vx *= -1;
        }
        if (this.y + this.h >= this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.h;
            this.vy *= this.lightness;
            if(this.vy < 0 && this.vy >- 2.1) {
                this.vy = 0;
            }
            this.friction();
        }
    }
    friction() {
        if(this.vx >= 0) {
            this.vx -= this.xFriction;
        }
        if(this.vx <= 0) {
            this.vx += this.xFriction;
        }   
    }
}