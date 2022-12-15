const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);

document.getElementById('start-btn').onclick = (e) => {
    if (e.target.innerText === 'START') {
        e.target.innerText = 'STOP';
        game.start();
    } else {
        e.target.innerText = 'START';
        game.stop();
    }
}

document.getElementById('right-btn').onclick = (e) => {
    game.right();
}
document.getElementById('left-btn').onclick = (e) => {
    game.left();
}
document.getElementById('up-btn').onclick = (e) => {
    game.up();
}
document.getElementById('down-btn').onclick = (e) => {
    game.down();
}