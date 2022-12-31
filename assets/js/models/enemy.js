class Enemy { //TODO: adapt bounding box tpedoractyl
    constructor(ctx) {
        this.ctx = ctx;
        this.x = this.ctx.canvas.width;
        this.y = 0;
        this.yPos = [170, 270, 330];
        this.y0 = this.yPos[Math.floor(Math.random() * this.yPos.length)];//350;
        this.img = new Image();
        this.img.src = "img/dino-sprites.png";
        this.img.enemies = [
            { //0 miniCactus
                sx: [448],
                sy: [4],
                sw: [30],
                sh: [70],
                dw: [60],
                dh: [127],
                y: [345]
            },
            { //1 pterodactyl
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
                dw: [
                    92 * 1.8,
                    92 * 1.8
                ],
                dh: [
                    68 * 1.8,
                    60 * 1.8
                ],
                y: [
                    this.y0  + 0,
                    this.y0 - 29
                ]
            },
            { //2 miniCactus
                sx: [482],
                sy: [4],
                sw: [64],
                sh: [70],
                dw: [128],
                dh: [127],
                y: [345]
            },
            { //3 miniCactus
                sx: [550],
                sy: [4],
                sw: [98],
                sh: [70],
                dw: [236],
                dh: [127],
                y: [345]
            },
            { //4 1BigCactus
                sx: [654],
                sy: [4],
                sw: [46],
                sh: [96],
                dw: [110],
                dh: [244],
                y: [230]
            },
            { //5 2BigCactus
                sx: [704],
                sy: [4],
                sw: [96],
                sh: [96],
                dw: [160],
                dh: [244],
                y: [230]
            },
            { //5 3BigCactus
                sx: [804],
                sy: [4],
                sw: [146],
                sh: [96],
                dw: [260],
                dh: [244],
                y: [230]
            }  
        ]
        this.enemyId = 0;
        this.img.frames = 2;
        this.img.framesIndex = 0;
        this.tick = 0;
        this.sx = this.img.enemies[0].sx[this.img.framesIndex];
        this.sy = this.img.enemies[0].sy[this.img.framesIndex];
        this.sw = this.img.enemies[0].sw[this.img.framesIndex]; // 118;
        this.sh = this.img.enemies[0].sh[this.img.framesIndex]; // 96;
        this.swhrel = 1.8;
        this.dw = this.sw * this.swhrel;
        this.dh = this.sh * this.swhrel;
        this.vx = -10;

        this.night = false;
        this.devCol = false;
    }
    invertColor(value) {
        this.night = value;
    }
    draw() {
        this.y = this.img.enemies[this.enemyId].y[this.img.framesIndex];
        this.dw = this.img.enemies[this.enemyId].dw[this.img.framesIndex];
        this.dh = this.img.enemies[this.enemyId].dh[this.img.framesIndex];

        if (this.devCol) { // developer mode to show colored boundinx boxes for collisions
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.x,
                this.img.enemies[1].y[this.img.framesIndex],
                this.img.enemies[1].dw[this.img.framesIndex], 
                this.img.enemies[1].dh[this.img.framesIndex]
                );
        }
        if (this.night === true) {
            this.ctx.filter = "invert(100%)";
            this.ctx.drawImage(this.img, 
                this.img.enemies[this.enemyId].sx[this.img.framesIndex], //cut in x
                this.img.enemies[this.enemyId].sy[this.img.framesIndex], //cut in y
                this.img.enemies[this.enemyId].sw[this.img.framesIndex], //w size of the image inner
                this.img.enemies[this.enemyId].sh[this.img.framesIndex], //h size of the image inner
                this.x, // x pos
                this.img.enemies[this.enemyId].y[this.img.framesIndex], // y pos
                this.img.enemies[this.enemyId].dw[this.img.framesIndex], //w size of the image outer
                this.img.enemies[this.enemyId].dh[this.img.framesIndex] //h size of the image outer
            );
            this.ctx.filter = "none";
        } else {
            this.ctx.drawImage(this.img, 
                this.img.enemies[this.enemyId].sx[this.img.framesIndex], //cut in x
                this.img.enemies[this.enemyId].sy[this.img.framesIndex], //cut in y
                this.img.enemies[this.enemyId].sw[this.img.framesIndex], //w size of the image inner
                this.img.enemies[this.enemyId].sh[this.img.framesIndex], //h size of the image inner
                this.x, // x pos
                this.img.enemies[this.enemyId].y[this.img.framesIndex], // y pos
                this.img.enemies[this.enemyId].dw[this.img.framesIndex], //w size of the image outer
                this.img.enemies[this.enemyId].dh[this.img.framesIndex] //h size of the image outer
            );
        }
        this.animate();
    }
    animate() {
        if (this.enemyId === 1) { //if enemyId is pterodactyl then animate
            if (this.tick++ > 7) {
                this.tick = 0;
                this.img.framesIndex++;
                if (this.img.framesIndex > this.img.frames - 1) {
                    this.img.framesIndex = 0;
                }
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