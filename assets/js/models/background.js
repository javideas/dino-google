class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.x0 = 0;
        this.distanceBg = 0;
        this.y = 430;
        this.sx = 2;
        this.sy = 104;
        this.sw = 2400/4; // 118;
        this.sh = 24; // 96;
        this.swhrel = 1.8;
        this.dw = this.sw * this.swhrel + this.sx;
        this.dh = this.sh * this.swhrel;
        this.x1 = this.dw;
        this.x2 = this.dw * 2;
        this.vx = -10; // -10
        this.img = new Image();
        this.img.src = "img/dino-sprites.png";

        this.img.frames = 4;
        this.img.framesIndexA = 0;
        this.img.framesIndexB = 2;
        this.img.framesIndexC = 3;
        this.tick = 0;

        this.night = false;
        this.img.segments = [ //this.sx,
                    2400/4 + this.sx,
                    (2400/4 * 2) + this.sx,
                    (2400/4 * 3) + this.sx
                ];
    }
    invertColor(value) {
        this.night = value;
    }
    draw() {
        if (this.night === true) {
            this.ctx.filter = "invert(100%)";
            this.ctx.drawImage(this.img, 
                this.img.framesIndexA, //inner move x
                this.sy, //inner move y 
                this.sw, this.sh, //size of the cuts 
                this.x0, // x pos
                this.y, // y pos
                this.dw, this.dh //size of the image outer
            );
            this.ctx.drawImage(this.img, 
                this.img.framesIndexB, //inner move x, this.img.segments[0]
                this.sy, //inner move y 
                this.sw, this.sh, //size of the cuts
                this.x1, // x pos
                this.y, // y pos
                this.dw, this.dh //size of the image outer
            );
            this.ctx.drawImage(this.img, 
                this.img.framesIndexC, //inner move x, this.img.segments[0]
                this.sy, //inner move y 
                this.sw, this.sh, //size of the cuts
                this.x2, // x pos
                this.y, // y pos
                this.dw, this.dh //size of the image outer
            );
            this.animate();
            this.ctx.filter = "none";
        } else {
            this.ctx.drawImage(this.img, 
                this.img.framesIndexA, //inner move x
                this.sy, //inner move y 
                this.sw, this.sh, //size of the cuts 
                this.x0, // x pos
                this.y, // y pos
                this.dw, this.dh //size of the image outer
            );
            this.ctx.drawImage(this.img, 
                this.img.framesIndexB, //inner move x, this.img.segments[0]
                this.sy, //inner move y 
                this.sw, this.sh, //size of the cuts
                this.x1, // x pos
                this.y, // y pos
                this.dw, this.dh //size of the image outer
            );
            this.ctx.drawImage(this.img, 
                this.img.framesIndexC, //inner move x, this.img.segments[0]
                this.sy, //inner move y 
                this.sw, this.sh, //size of the cuts
                this.x2, // x pos
                this.y, // y pos
                this.dw, this.dh //size of the image outer
            );
            this.animate();
        }
    }
    animate(){
        if (this.x0 === this.ctx.canvas.width) {
            this.img.framesIndexA = this.img.segments[Math.floor(Math.random() * this.img.segments.length)];
        }
        if (this.x1 === this.ctx.canvas.width) {
            this.img.framesIndexB = this.img.segments[Math.floor(Math.random() * this.img.segments.length)];
        }
        if (this.x2 === this.ctx.canvas.width) {
            this.img.framesIndexC = this.img.segments[Math.floor(Math.random() * this.img.segments.length)];
        }
    }
    move() {
        this.distanceBg += this.vx;
        this.x0 += this.vx;
        this.x1 += this.vx;
        this.x2 += this.vx;
        this.x3 += this.vx;
        if (this.x0 <= -this.dw) {
            this.x0 = this.ctx.canvas.width;
        }
        if (this.x1 <= -this.dw) {
            this.x1 = this.ctx.canvas.width;
        }
        if (this.x2 <= -this.dw) {
            this.x2 = this.ctx.canvas.width;
        }
    }
}


