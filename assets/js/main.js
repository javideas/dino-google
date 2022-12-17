const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);
const canvasGame = new CanvasGame(ctx);
const dino = new Dino(ctx);
canvasGame.start();
game.start();
// document.addEventListener("keydown", (event) => {
//     if(event.keyCode === 32) {
//         const canvasWidth = window.innerWidth;
//         const canvasHeight = window.innerHeight;
//         dino.resize(canvasWidth, canvasHeight);
//     }
// })
// addEventListener("resize", (event) => {
//     // Get the current width and height of the canvas
//     // Update the dino's dimensions based on the canvas size
//     const canvasWidth = window.innerWidth;
//     const canvasHeight = window.innerHeight;
//     dino.resize(canvasWidth, canvasHeight);
// });

// img.addEventListener("load", (e) => {
//     //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
//     ctx.drawImage(img, 
//         0, //cut in x
//         0, //cut in y
//         1233, 100, //size of the image inner
//         0, // x pos
//         0, // y pos
//         1233, 100 //size of the image outer
//     );
// });