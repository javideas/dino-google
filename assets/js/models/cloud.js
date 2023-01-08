class Cloud { //TODO: include in game.js
    constructor(ctx) {
        this.ctx = ctx
    
        this.x = this.ctx.canvas.width;
        this.y = 0;//350;
        this.sx = 1682;
        this.sy = 2;
        this.sw = 92; // 118;
        this.sh = 27; // 96;
        this.swhrel = 1.8;
        this.dw = this.sw * this.swhrel;
        this.dh = this.sh * this.swhrel;
        this.vx = -10;
        this.y0 = 465.6;

        this.img = new Image();
        this.img.src = "img/dino-sprites.png";

        this.img.frames = 2;
        this.img.framesIndex = 0;
        this.tick = 0;

        this.yPos = [0, 100, 250];
        this.y0 = this.yPos[Math.floor(Math.random() * this.yPos.length)];//350;

        this.night = false;
    }
    invertColor(value) {
        this.night = value;
    }
    draw() {
        if (this.night === true) {

            this.ctx.drawImage(this.img, 
                166, //cut in sx
                this.sy, //cut in sy
                this.sw, this.sh, //size of the image inner
                this.x, // x pos
                this.y0, // y pos
                this.dw, this.dh //size of the image outer
            );

        } else {
            this.ctx.drawImage(this.img, 
                166, //cut in sx
                this.sy, //cut in sy
                this.sw, this.sh, //size of the image inner
                this.x, // x pos
                this.y0, // y pos
                this.dw, this.dh //size of the image outer
            );
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