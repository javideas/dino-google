class Enemy { //TODO: adapt bounding box tpedoractyl
    constructor(ctx) {
        this.ctx = ctx
    
        this.x = this.ctx.canvas.width;
        this.yPos = [170, 270, 330];
        this.y = this.yPos[Math.floor(Math.random() * this.yPos.length)];//350;
        this.y0 = 0;
        this.img = new Image();
        this.img.src = "img/dino-sprites.png";
        this.img.enemies = {
            pterodactyl: {
                sx: [
                    260,
                    352
                ],
                sy: [
                    14,
                    2
                ],
                sw: [
                    92,
                    92
                ],
                sh: [
                    68,
                    60
                ],
                y: [
                    this.y + 0,
                    this.y - 29
                ]
            },
        }
        this.img.frames = 2;
        this.img.framesIndex = 0;
        this.tick = 0;
        this.sx = this.img.enemies.pterodactyl.sx[this.img.framesIndex];
        this.sy = this.img.enemies.pterodactyl.sy[this.img.framesIndex];
        this.sw = this.img.enemies.pterodactyl.sw[this.img.framesIndex]; // 118;
        this.sh = this.img.enemies.pterodactyl.sh[this.img.framesIndex]; // 96;
        this.swhrel = 1.8;
        this.dw = this.sw * this.swhrel;
        this.dh = this.sh * this.swhrel;
        this.vx = -10;
        this.y0 = 465.6;
    }
    draw() {
        this.ctx.drawImage(this.img, 
            this.img.enemies.pterodactyl.sx[this.img.framesIndex], //cut in x
            this.img.enemies.pterodactyl.sy[this.img.framesIndex], //cut in y
            this.img.enemies.pterodactyl.sw[this.img.framesIndex],
            this.img.enemies.pterodactyl.sh[this.img.framesIndex], //size of the image inner
            this.x, // x pos
            this.img.enemies.pterodactyl.y[this.img.framesIndex], // y pos 
            this.dw, this.dh //size of the image outer
        );
        this.animate();
    }
    animate() {
        if (this.tick++ > 7) {
            this.tick = 0;
            this.img.framesIndex++;
            if (this.img.framesIndex > this.img.frames - 1) {
                this.img.framesIndex = 0;
            }
        }
    }
    move() {
        this.x += this.vx;
        if (this.x <= -this.dw) {
            this.x = 0;
        }
    }
    isVisible() {
      return this.x >= 0;
    }
  }