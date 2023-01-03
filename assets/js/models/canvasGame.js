class CanvasGame {
    constructor(ctx) {
        this.ctx = ctx;
        this.whrel = 1920/480;
        this.night = false;
        this.valColor = 255;
        this.progVal = 3;
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
            if (this.valColor >= 0) { // transition from day to night
                this.valColor -= this.progVal;
            }
            this.ctx.fillStyle = `rgb(${this.valColor},${this.valColor},${this.valColor})`;
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        } else if (this.night === false) {
            if (this.valColor < 255) { // transition from night to day
                this.valColor += this.progVal;
            }
            this.ctx.fillStyle = `rgb(${this.valColor},${this.valColor},${this.valColor})`;
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        }
    }
}
