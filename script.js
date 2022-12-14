const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);

document.getElementById('marble-btn').onclick = () => {
    game.marbleBall();
    game.start();
}

document.getElementById('bowling-btn').onclick = () => {
    game.bowling();
    game.start();
}

document.getElementById('stop-btn').onclick = () => {
    game.stop();
}