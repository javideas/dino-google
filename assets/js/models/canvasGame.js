class CanvasGame {
    constructor(ctx) {
        this.ctx = ctx;
        this.whrel = 1920/480;
        this.night = false;
    }
    start() {
        this.ctx.canvas.width = window.innerWidth - 40;
        this.ctx.canvas.height = this.ctx.canvas.width / this.whrel;

        const element = document.querySelector('#divCanvas');
        element.style.top = (window.innerHeight / 2)  - (this.ctx.canvas.height / 2) - 100 + 'px';
        element.style.imageRendering = "pixelated";
    }
    invertColor(value) {
        this.night = value;
    }
    draw() {
        if (this.night === true) {
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        } else {
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        }
    }
}
