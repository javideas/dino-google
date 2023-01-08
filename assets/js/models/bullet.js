class Bullet {
    constructor (ctx, x, y, fillStyle, lightness, hardness, xFriction) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.y0 = 450;
        this.r = 25; 
        this.w = this.r;
        this.h = this.r;
        this.vx = 10;
        this.vy = 1;
        this.ax = 0;
        this.ay = 0.5;
        this.lightness = lightness;
        this.hardness = hardness;
        this.xFriction = xFriction;
        this.fillStyle = fillStyle;
        this.wRect = this.r / 10;
        this.hRect = this.r / 5;
    }
    draw() {
        // // Bounding Box FireBall
        this.ballBoundingBox = {
            x: this.x - this.wRect,
            y: this.y - this.hRect,
            w: this.w + (this.wRect * 2),
            h: this.h + (this.hRect * 2)
        };
        // this.ctx.fillStyle = "blue";
        // this.ctx.fillRect(this.ballBoundingBox.x, this.ballBoundingBox.y, this.ballBoundingBox.w, this.ballBoundingBox.h);

        // Bounding Box FireBall
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(this.x, this.y, this.r, this.r);
        this.ctx.fillRect(this.x - this.wRect, this.y + this.hRect, this.wRect, this.hRect * 3); // left
        this.ctx.fillRect(this.x + this.w, this.y + this.hRect, this.wRect, this.hRect * 3); // right
        this.ctx.fillRect(this.x + this.hRect, this.y - this.wRect, this.hRect * 3, this.wRect); // up
        this.ctx.fillRect(this.x + this.hRect, this.y + this.h, this.hRect * 3, this.wRect); // down

    }
    move() {
        this.vx += this.ax;
        this.vy += this.hardness;
        this.x += this.vx;
        this.y += this.vy;
        // if (this.x + this.w >= this.ctx.canvas.width || this.x <= 0){
        //     this.vx *= -1;
        // }
        if (this.y + this.h >= this.y0) {
            this.y = this.y0 - this.h;
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