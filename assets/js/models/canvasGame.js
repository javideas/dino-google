class CanvasGame {
    constructor(ctx) {
        this.ctx = ctx;
        this.whrel = 1920/480;
    }
    start() {
        this.ctx.canvas.width = window.innerWidth - 40;
        this.ctx.canvas.height = this.ctx.canvas.width / this.whrel;

        const element = document.querySelector('#divCanvas');
        element.style.top = (window.innerHeight / 2)  - (this.ctx.canvas.height / 2) - 100 + 'px';
        element.style.imageRendering = "pixelated";
    }
}
