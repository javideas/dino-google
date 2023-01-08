class Dino {
    constructor(ctx) {
        this.ctx = ctx;
        this.audioJump = new Audio("audio/dinoJump.mp3");
        this.audioShoot = new Audio("audio/fireball.mp3");
        this.x = 0;
        this.resizeY = 300;
        this.sx = 1682;
        this.sy = 0;
        this.sw = 80;
        this.sh = 92;
        this.swhrel = 1.8;
        this.dw = this.sw * this.swhrel;
        this.dh = this.sh * this.swhrel;
        this.y = (this.ctx.canvas.height * 0.6383);
        this.y0 = 475.6;
        this.vy = 0;
        this.ay = 2;
        this.jumpFactor = 1.5;
             
        this.img = new Image();
        this.img.src = "img/dino-sprites.png";
        this.img.frames = 2;
        this.img.framesIndex = 0;
        this.tick = 0;
        this.night = false;
        this.devCol = false;

        this.tickJump = 0;
        this.isRunningDown = false;
        
        this.img.animations = {
            stopStanding: { //TODO: stand with ground, stand alone, stand blink, stand dead
                sx: 1682,
                sy: 6,
                sw: 78,
                sh: 96,
                y0: 475.6
            },
            runningStnd: {
                sx: [
                    1858,
                    1946
                ],
                sy: 6,
                sw: 78,
                sh: 96,
                dw: this.sw * this.swhrel,
                dh: this.sh * this.swhrel,
                y0: 475.6
            },
            runningDown: {
                sx: [
                    2210,
                    2328
                ],
                sy: 40,
                sw: 110,
                sh: 52,
                dw: 110 * this.swhrel,
                dh: 52 * this.swhrel,
                y0: 465.6
            }
        }
        this.bullets = [];

        this.xB = 0;
        this.yB = 0;
    }
    shoot() {
        this.audioShoot.play();
        this.xB = this.x + this.dw - 20;
        this.yB = this.y + 42;
        const bullet = new Bullet(this.ctx, this.xB, this.yB, "red", -1, 1, 0.01);
        this.bullets.push(bullet);
    }
    clearBullets() {
        // this.bullets = this.bullets.filter(e => (e.x + e.w) > 0);
        this.bullets = this.bullets.filter((e) => e.x < this.ctx.canvas.width && e.x > 0);
    }
    move() {
        this.vy += this.ay;
        this.y += this.vy;
        if (this.y + this.dh > this.y0) {
            this.y = this.y0 - this.dh;
            this.vy = 0;
        }
        this.bullets.forEach((b) => b.move());
    }
    invertColor(value) {
        this.night = value;
    }
    draw() {
        this.canvasHeight = this.ctx.canvas.height;
        // this.boundingBoxes = [
        //     { style: "red", x: this.x + 36, y: this.y + 120, w: this.dw/3 + 8, h: this.dh/6 },
        //     { style: "blue", x: this.x + 72, y: this.y, w: this.dw/3 + 24, h: this.dh/3 - 1 },
        //     { style: "green", x: this.x + 0, y: this.y + 52, w: this.dw/2 + 34, h: this.dh/3 + 14 }
        // ];
        // if (this.devCol) {
        //     this.ctx.fillStyle = this.boundingBoxes[0].style;
        //     this.ctx.fillRect(this.boundingBoxes[0].x, this.boundingBoxes[0].y, this.boundingBoxes[0].w, this.boundingBoxes[0].h);
        //     this.ctx.fillStyle = this.boundingBoxes[1].style;
        //     this.ctx.fillRect(this.boundingBoxes[1].x, this.boundingBoxes[1].y, this.boundingBoxes[1].w, this.boundingBoxes[1].h);
        //     this.ctx.fillStyle = this.boundingBoxes[2].style;
        //     this.ctx.fillRect(this.boundingBoxes[2].x, this.boundingBoxes[2].y, this.boundingBoxes[2].w, this.boundingBoxes[2].h);
        // }
        this.ctx.imageSmoothingEnabled = false;
        if (this.night === true) { //night mode
            this.ctx.filter = "invert(100%)";

            if (this.isRunningDown === false && this.y >= this.y0 - this.dh) {
                this.y0 = 475.6;
                this.ctx.drawImage(this.img, 
                    this.img.animations.runningStnd.sx[this.img.framesIndex], //inner move x
                    this.img.animations.runningStnd.sy, //inner move y
                    this.img.animations.runningStnd.sw, this.img.animations.runningStnd.sh, //size of the cuts
                    this.x, // x pos
                    this.y, // y pos
                    this.img.animations.runningStnd.dw, this.img.animations.runningStnd.dh //size of the image outer
                );  
                this.animate();
                this.dw = this.img.animations.runningStnd.dw;
                this.dh = this.img.animations.runningStnd.dh;
            } else if (this.isRunningDown === true && (this.y >= this.y0 - this.img.animations.runningStnd.dh || this.y >= this.y0 - this.img.animations.runningDown.dh)
                 ) {
                this.y0 = 465.6;
                this.dw = this.img.animations.runningStnd.dw;
                this.dh = this.img.animations.runningStnd.dh;
                this.y += 63;
                this.ctx.drawImage(this.img, 
                    this.img.animations.runningDown.sx[this.img.framesIndex], //inner move x
                    this.img.animations.runningDown.sy, //inner move y
                    this.img.animations.runningDown.sw, this.img.animations.runningDown.sh, //size of the cuts
                    this.x, // x pos
                    this.y, // y pos
                    this.img.animations.runningDown.dw, this.img.animations.runningDown.dh //size of the image outer
                );
                this.animate();
            } else if (this.y < this.y0 - this.dh) {
                this.ctx.drawImage(this.img, 
                    this.img.animations.stopStanding.sx, //inner move x
                    this.img.animations.stopStanding.sy, //inner move y
                    this.img.animations.stopStanding.sw, this.img.animations.stopStanding.sh, //size of the cuts
                    this.x, // x pos
                    this.y, // y pos
                    this.img.animations.runningStnd.dw, this.img.animations.runningStnd.dh //size of the image outer
                );
                this.dw = this.img.animations.runningStnd.dw;
                this.dh = this.img.animations.runningStnd.dh;
            }
            this.ctx.filter = "none";
        } else { // day mode
            if (this.isRunningDown === false && this.y >= this.y0 - this.dh) {
                this.y0 = 475.6;
                this.ctx.drawImage(this.img, 
                    this.img.animations.runningStnd.sx[this.img.framesIndex], //inner move x
                    this.img.animations.runningStnd.sy, //inner move y
                    this.img.animations.runningStnd.sw, this.img.animations.runningStnd.sh, //size of the cuts
                    this.x, // x pos
                    this.y, // y pos
                    this.img.animations.runningStnd.dw, this.img.animations.runningStnd.dh //size of the image outer
                );  
                this.animate();
                this.dw = this.img.animations.runningStnd.dw;
                this.dh = this.img.animations.runningStnd.dh;
            } else if (this.isRunningDown === true && (this.y >= this.y0 - this.img.animations.runningStnd.dh || this.y >= this.y0 - this.img.animations.runningDown.dh)
                 ) {
                this.y0 = 465.6;
                this.dw = this.img.animations.runningStnd.dw;
                this.dh = this.img.animations.runningStnd.dh;
                this.y += 63;
                this.ctx.drawImage(this.img, 
                    this.img.animations.runningDown.sx[this.img.framesIndex], //inner move x
                    this.img.animations.runningDown.sy, //inner move y
                    this.img.animations.runningDown.sw, this.img.animations.runningDown.sh, //size of the cuts
                    this.x, // x pos
                    this.y, // y pos
                    this.img.animations.runningDown.dw, this.img.animations.runningDown.dh //size of the image outer
                );
                this.animate();
            } else if (this.y < this.y0 - this.dh) {
                this.ctx.drawImage(this.img, 
                    this.img.animations.stopStanding.sx, //inner move x
                    this.img.animations.stopStanding.sy, //inner move y
                    this.img.animations.stopStanding.sw, this.img.animations.stopStanding.sh, //size of the cuts
                    this.x, // x pos
                    this.y, // y pos
                    this.img.animations.runningStnd.dw, this.img.animations.runningStnd.dh //size of the image outer
                );
                this.dw = this.img.animations.runningStnd.dw;
                this.dh = this.img.animations.runningStnd.dh;
            }
        }
        this.bullets.forEach((b) => b.draw());
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
    jump() {
        this.audioJump.play();
        // if (this.y + this.dh === this.y0) {
        //     this.vy = -35;
        // }

        if (this.y + this.img.animations.runningStnd.dh === this.y0 || this.y + this.img.animations.runningDown.dh === this.y0) {
            this.vy = -36;
        }
    }
    onKeyDown(key, spaceBool) { // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        if (spaceBool) {
            switch (key) {
                case "Space": //TODO: fire is "KeyF"
                    this.jump();
                    break;
                case "ArrowDown":
                    this.tickJump = 0;
                    this.isRunningDown = true;
                    break;
                case "KeyF":
                    this.shoot();
                    break;
          }
        }
    }
    onKeyUp(key, spaceBool) { // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        if (spaceBool) {
            switch (key) {
                case "ArrowDown":
                    this.tickJump = 0;
                    this.isRunningDown = false;
                    break;
          }
        }
    }
}
// reset() {
    //     this.x = 0;
    //     this.y = 300;
    //     this.sx = 1682;
    //     this.sy = 0;
    //     this.sw = 80; // 118;
    //     this.sh = 92; // 96;
    //     this.swhrel = 1.8;
    //     this.dw = this.sw * this.swhrel;
    //     this.dh = this.sh * this.swhrel;
    //     this.y0 = 465.6;
    //     this.vy = 0;
    //     this.ay = 2;
    // }
// // this is dinosaur small
// this.ctx.drawImage(this.img, 
//     40, //cut in x
//     0, //cut in y
//     42, 50, //size of the image inner
//     this.x, // x pos
//     this.y, // y pos
//     42, 50 //size of the image outer
// );