class Dino {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 300;
        this.sx = 1682;
        this.sy = 0;
        this.sw = 80; // 118;
        this.sh = 92; // 96;
        this.swhrel = 1.8;
        this.dw = this.sw * this.swhrel;
        this.dh = this.sh * this.swhrel;
        this.y0 = 465.6;
        this.vy = 0;
        this.ay = 2;
        this.img = new Image();
        this.img.src = "img/dino-sprites.png";

        this.img.frames = 2;
        this.img.framesIndex = 0;
        this.tick = 0;

        this.img.animations = {
            stopStanding: { //TODO: stand with ground, stand alone, stand blink, stand dead
                sx: [
                    40,
                    1682
                ],
                sy: [
                    0,
                    0
                ],
                sw: [
                    42,
                    80
                ],
                sh: [
                    50,
                    92
                ]
            },
            runningStnd: {
                sx: [
                    1858,
                    1946
                ],
                sy: [
                    0
                ],
                sw: [
                    78
                ],
                sh: [
                    92
                ]
            }
        }   
    }
    reset() {
        this.x = 0;
        this.y = 300;
        this.sx = 1682;
        this.sy = 0;
        this.sw = 80; // 118;
        this.sh = 92; // 96;
        this.swhrel = 1.8;
        this.dw = this.sw * this.swhrel;
        this.dh = this.sh * this.swhrel;
        this.y0 = 465.6;
        this.vy = 0;
        this.ay = 2;
    }
    draw() {
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(this.img, 
            this.sx, //inner move x
            this.sy, //inner move y
            this.sw, this.sh, //size of the cuts
            this.x, // x pos
            this.y, // y pos
            this.dw, this.dh //size of the image outer
        );
        this.animate();
    }
    animate() {
        this.sx = this.img.animations.runningStnd.sx[this.img.framesIndex];
        if (this.tick++ > 7) {
            this.tick = 0;
            this.img.framesIndex++;
            if (this.img.framesIndex > this.img.frames - 1) {
                this.img.framesIndex = 0;
            }
        }
        if (this.y < this.y0 - this.dh) {
            this.sx = this.img.animations.stopStanding.sx[1];
            this.sy = this.img.animations.stopStanding.sy[1];
            this.sw = this.img.animations.stopStanding.sw[1];
            this.sh = this.img.animations.stopStanding.sh[1];
        }
    }
    move() {
        this.vy += this.ay;
        this.y += this.vy;
        if (this.y + this.dh >= this.y0) {
            this.y = this.y0 - this.dh;
            this.vy = 0;
          }
    }
    jump() {
        if (this.y + this.dh === this.y0) {
            this.vy = -35;
        }
    }
    onKeyDown(key, spaceBool) {
        if (spaceBool) {
            switch (key) {
              case "Space": //TODO: fire is "KeyF"
                this.jump();
                break;
          }
        }
    }
}
// // this is dinosaur small
// this.ctx.drawImage(this.img, 
//     40, //cut in x
//     0, //cut in y
//     42, 50, //size of the image inner
//     this.x, // x pos
//     this.y, // y pos
//     42, 50 //size of the image outer
// );