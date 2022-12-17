class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.x0 = 0;
        this.x1 = 0;
        this.x2 = 0;
        this.x3 = 0;
        this.y = 430;
        this.sx = 2;
        this.sy = 104;
        this.sw = 2400/4; // 118;
        this.sh = 24; // 96;
        this.swhrel = 1.8;
        this.dw = this.sw * this.swhrel;
        this.dh = this.sh * this.swhrel;
        this.vx = -10;
        this.img = new Image();
        this.img.src = "img/dino-sprites.png";

        this.img.frames = 4;
        this.img.framesIndexA = 0;
        this.img.framesIndexB = 2;
        this.img.framesIndexC = 3;
        this.img.framesIndexD = 2;
        this.tick = 0;

        this.img.segments = [
                    this.sx,
                    2400/4 + this.sx,
                    (2400/4 * 2) + this.sx,
                    (2400/4 * 3) + this.sx
                ];
    }
    draw() {
        this.ctx.drawImage(this.img, 
            this.img.segments[this.img.framesIndexA], //inner move x
            this.sy, //inner move y 
            this.sw, this.sh, //size of the cuts 
            this.x0, // x pos
            this.y, // y pos
            this.dw, this.dh //size of the image outer
        );
        this.ctx.drawImage(this.img, 
            this.img.segments[this.img.framesIndexB], //inner move x, this.img.segments[0]
            this.sy, //inner move y 
            this.sw, this.sh, //size of the cuts
            this.x1, // x pos
            this.y, // y pos
            this.dw, this.dh //size of the image outer
        );
        this.ctx.drawImage(this.img, 
            this.img.segments[this.img.framesIndexC], //inner move x, this.img.segments[0]
            this.sy, //inner move y 
            this.sw, this.sh, //size of the cuts
            this.x2, // x pos
            this.y, // y pos
            this.dw, this.dh //size of the image outer
        );
        this.ctx.drawImage(this.img, 
            this.img.segments[this.img.framesIndexD], //inner move x, this.img.segments[0]
            this.sy, //inner move y 
            this.sw, this.sh, //size of the cuts
            this.x3, // x pos
            this.y, // y pos
            this.dw, this.dh //size of the image outer
        );
    }
    move() { //TODO: make segments appear random
        this.x0 += this.vx;
        this.x1 = this.x0 + this.dw;
        this.x2 = this.x1 + this.dw;
        this.x3 = this.x2 + this.dw;
        if (this.x0 <= -this.dw) {
            this.x0 = 0;
        }
        // if (this.x1 <= -this.dw) {
            
        // }
        // if (this.x2 <= -this.dw) {
           
        // }
    }
}