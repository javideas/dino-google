class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.x0 = 0;
        this.distanceBg = 0;
        this.y = 430;
        this.sx = 2;
        this.sy = 104;
        this.sw = 2400 / 4; //
        this.sh = 24; //
        this.swhrel = 1.8;
        this.dw = this.sw * this.swhrel;
        this.dh = this.sh * this.swhrel;
        this.x1 = this.dw;
        this.x2 = this.dw * 2;
        this.vx = -10; // -10
        this.img = new Image();
        this.img.src = "img/dino-sprites.png";

        this.img.frames = 4;
        this.img.sxA = this.sw;
        this.img.sxB = (this.sw  * 2);
        this.img.sxC = (this.sw  * 3);
        this.tick = 0;

        this.night = false;
        this.img.segments = [ //this.sx,
                    this.sw,
                    (this.sw  * 2),
                    (this.sw  * 3)
                ];
    }
    invertColor(value) {
        this.night = value;
    }
    draw() {
        if (this.night === true) { // Night Mode
            this.ctx.filter = "invert(100%)";
            this.ctx.drawImage(this.img, 
                this.img.sxA, //inner move x
                this.sy, //inner move y 
                this.sw, this.sh, //size of the cuts 
                this.x0, // x pos
                this.y, this.dw, this.dh //size of the image outer
            );
            this.ctx.drawImage(this.img, 
                this.img.sxB,
                this.sy, this.sw, this.sh, 
                this.x1, 
                this.y,this.dw, this.dh
            );
            this.ctx.drawImage(this.img, 
                this.img.sxC,
                this.sy,
                this.sw, this.sh, 
                this.x2, 
                this.y, this.dw, this.dh
            );
            this.animate();
            this.ctx.filter = "none";
        } else { // Day Mode
            // this.ctx.fillStyle = "red";
            // this.ctx.fillRect(
            //     this.x0, // x pos
            //     this.y, // y pos
            //     this.dw + 50, this.dh //size of the image outer
            // );
            this.ctx.drawImage(this.img, //section A
                this.img.sxA, //inner move x
                this.sy, //inner move y 
                this.sw, this.sh, //size of the cuts 
                this.x0, // x pos
                this.y, // y pos
                this.dw + 50, this.dh //size of the image outer
            );
            // this.ctx.fillStyle = "blue";
            // this.ctx.fillRect(
            //     this.x1, // x pos
            //     this.y, // y pos
            //     this.dw, this.dh //size of the image outer
            // );
            this.ctx.drawImage(this.img, //section B
                this.img.sxB, //inner move x
                this.sy, //inner move y 
                this.sw, this.sh, //size of the cuts
                this.x1, // x pos
                this.y, // y pos
                this.dw, this.dh //size of the image outer
            );
            // this.ctx.fillStyle = "green";
            // this.ctx.fillRect(
            //     this.x2, // x pos
            //     this.y, // y pos
            //     this.dw, this.dh //size of the image outer
            // );
            this.ctx.drawImage(this.img, //section C
                this.img.sxC, //inner move x
                this.sy, //inner move y 
                this.sw, this.sh, //size of the cuts
                this.x2, // x pos
                this.y, // y pos
                this.dw, this.dh //size of the image outer
            );
            this.animate();
        }
    }
    animate(){ //if background part is in the right of the screen (out), load a random segment
        if (this.x0 === this.ctx.canvas.width) {
            this.img.sxA = this.img.segments[Math.floor(Math.random() * this.img.segments.length)];
        }
        if (this.x1 === this.ctx.canvas.width) {
            this.img.sxB = this.img.segments[Math.floor(Math.random() * this.img.segments.length)];
        }
        if (this.x2 === this.ctx.canvas.width) {
            this.img.sxC = this.img.segments[Math.floor(Math.random() * this.img.segments.length)];
        }
    }
    move() {
        this.distanceBg += this.vx; // this line measure the total distance for the UI score
        this.x0 += this.vx; // from here, every
        this.x1 += this.vx;
        this.x2 += this.vx;
        if (this.x0 <= -(this.dw)) {
            this.x0 = this.ctx.canvas.width;
        }
        if (this.x1 <= -(this.dw)) {
            this.x1 = this.ctx.canvas.width;
        }
        if (this.x2 <= -(this.dw)) {
            this.x2 = this.ctx.canvas.width;
        }
    }
}


