class Moon {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = this.ctx.canvas.width * 0.95;
        this.y = 100;//350;
        this.sx = 954;
        this.sy = 2;
        this.sw = 40; // 118;
        this.sh = 80; // 96;
        this.swhrel = 1.8;
        this.dw = this.sw * this.swhrel;
        this.dh = this.sh * this.swhrel;
        this.vx = -5;
        this.img = new Image();
        this.img.src = "img/dino-sprites.png";

        this.img.framesIndex = 0;
        this.tick = 0;

        this.yPos = [0, 100, 250];
        this.addMoon = false;

        this.mPhases = {
                sx: [
                    956,
                    996,
                    1036,
                    1076,
                    1156,
                    1196,
                    1236
                ],
                sw: [
                    38,
                    38,
                    38,
                    78,
                    38,
                    38,
                    38
                ],
                x: [
                    0,
                    0,
                    0,
                    0,
                    60,
                    60,
                    60
                ],
                dw: [
                    60,
                    60,
                    60,
                    144,
                    60,
                    60,
                    60
                ]
            };
        this.img.frames = this.mPhases.sx.length;
    }
    restart() {
        this.addMoon = false;
        if (this.addMoon === false) {
            this.x = this.ctx.canvas.width * 0.95;
            this.img.framesIndex = 0;
            this.vx = -5;
            this.tick = 0;
        }
    }
    draw() {
        if (this.addMoon === true) {
            this.ctx.drawImage(this.img, 
                this.mPhases.sx[this.img.framesIndex], //cut in sx
                this.sy, //cut in sy
                this.mPhases.sw[this.img.framesIndex], this.sh, //size of the image inner
                this.x + this.mPhases.x[this.img.framesIndex], // x pos
                this.y, // y pos
                this.mPhases.dw[this.img.framesIndex], this.dh //size of the image outer
            );
            this.move();
            this.animate();
        }
    }
    animate() {
        if (this.tick++ > 60) {
            this.tick = 0;
            this.img.framesIndex++;
            if (this.img.framesIndex > this.img.frames - 1) {
                this.restart();
            }
        }
    }
    move() {
        this.x += this.vx;
        if (this.x <= -this.dw) {
            this.x = this.ctx.canvas.width;
        }
    }
    isVisible() {
      return this.x >= 0;
    }
  }