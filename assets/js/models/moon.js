class Moon {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = this.ctx.canvas.width;
        this.y = 100;//350;
        this.sx = 954;
        this.sy = 2;
        this.sw = 40; // 118;
        this.sh = 80; // 96;
        this.swhrel = 1.8;
        this.dw = this.sw * this.swhrel;
        this.dh = this.sh * this.swhrel;
        this.vx = -10;
        this.y0 = 465.6;

        this.img = new Image();
        this.img.src = "img/dino-sprites.png";

        this.img.frames = 6;
        this.img.framesIndex = 0;
        this.tick = 0;

        this.yPos = [0, 100, 250];
        this.y0 = this.yPos[Math.floor(Math.random() * this.yPos.length)];//350;


        this.mPhases = {
                sx: [
                    954,
                    994,
                    1034,
                    1074,
                    1154,
                    1194,
                    1234
                ],
                sw: [
                    40,
                    40,
                    40,
                    80,
                    40,
                    40,
                    40
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
                    120,
                    60,
                    60,
                    60
                ]
            };
    }
    draw(value) {
        console.log("this.x: ", this.x);
        console.log("this.mPhases.x[this.img.framesIndex]: ", this.mPhases.x[this.img.framesIndex]);
        if ( value === true) {
            this.ctx.drawImage(this.img, 
                this.mPhases.sx[this.img.framesIndex], //cut in sx
                this.sy, //cut in sy
                this.mPhases.sw[this.img.framesIndex], this.sh, //size of the image inner
                this.x + this.mPhases.x[this.img.framesIndex], // x pos
                this.y, // y pos
                this.mPhases.dw[this.img.framesIndex], this.dh //size of the image outer
            );
            this.animate(value);
        } else {
            this.x = this.ctx.canvas.width;
        }
    }
    animate(value) {
            if (this.tick++ > 70 && value === true) { //50
                this.tick = 0;
                this.img.framesIndex++;
                this.moonFinish(true);
                if (this.img.framesIndex > this.img.frames - 1) {
                    this.img.framesIndex = 0;
                    this.moonFinish(false);
                }
            }
    }
    moonFinish(value) {
        return value;
    }
    move(value) {
        if (value === true) {
            this.x += this.vx;
            if (this.x <= -this.dw) {
                this.x = this.ctx.canvas.width;
            }
        }
    }
    isVisible() {
      return this.x >= 0;
    }
  }