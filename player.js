class Player {
    constructor(ctx, x, y, w, h, fillStyle) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = 0;
        this.vy = 0;
        this.fillStyle = fillStyle;
    }
    draw() {
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x + this.w >= this.ctx.canvas.width){
            this.vx = 0;
            this.x = this.ctx.canvas.width - this.w; 
        }
        if (this.x <= 0){
            this.vx = 0;
            this.x = 0;
        }
        if (this.y + this.h >= this.ctx.canvas.height){
            this.vy = 0;
            this.y = this.ctx.canvas.width - this.w; 
        }
        if (this.y <= 0){
            this.vy = 0;
            this.y = 0;
        }
    }
    right() {
        this.vx += 0.2
        this.x += this.vx;   
    }
    left() {
        this.vx += -0.2
        this.x += this.vx;
    }
    up() {
        this.vy += -0.2
        this.y += this.vy;
    }
    down() {
        this.vy += 0.2
        this.y += this.vy;   
    }
}



