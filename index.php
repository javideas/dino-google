<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <!-- <meta name='viewport' content='width=device-width, initial-scale=1.0'> -->
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1.0' />
    <title>Dino by Javideas</title>
    <link rel="shortcut icon" href="#">
    <link rel="stylesheet" href="https://unpkg.com/keyboard-css@1.2.4/dist/css/main.min.css" />
    <link rel='stylesheet' href='assets/css/main.css'>
</head>
<body>
    <div class="keyboard">
            <div>
                <button class="kbc-button Q">Q</button>
                <button class="kbc-button W">W</button>
                <button class="kbc-button E">E</button>
                <button class="kbc-button R">R</button>
                <button class="kbc-button T">T</button>
                <button class="kbc-button Y">Y</button>
                <button class="kbc-button U">U</button>
                <button class="kbc-button I">I</button>
                <button class="kbc-button O">O</button>
                <button class="kbc-button P">P</button>
            </div>
            <div>
                <button class="kbc-button A">A</button>
                <button class="kbc-button S">S</button>
                <button class="kbc-button D">D</button>
                <button class="kbc-button F">F</button>
                <button class="kbc-button G">G</button>
                <button class="kbc-button H">H</button>
                <button class="kbc-button J">J</button>
                <button class="kbc-button K">K</button>
                <button class="kbc-button L">L</button>
            </div>
            <div>
                <button class="kbc-button Z">Z</button>
                <button class="kbc-button X">X</button>
                <button class="kbc-button C">C</button>
                <button class="kbc-button V">V</button>
                <button class="kbc-button B">B</button>
                <button class="kbc-button N">N</button>
                <button class="kbc-button M">M</button>
            </div>
        </div>
    <!-- <div class="ranking">
            <ol>
            </ol>
    </div> -->
    <div id='divCanvas'>
        <!-- start little size is  width='550px' height='150px'-->
        <canvas id='canvas'></canvas>
        <div class="instructions">
            <h1>Press space bar to play and to jump 🦘.
                <br>
                ⬇ Down Arrow to crouch!
                <br>
                F key to shoot Fireballs! 🔥
                <br>
                (carefull, the are hot)
            </h1>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src='assets/js/models/constants.js'></script>
    <script src="assets/js/models/bullet.js"></script>
    <script src='assets/js/models/canvasGame.js'></script>
    <script src='assets/js/models/background.js'></script>
    <script src='assets/js/models/moon.js'></script>
    <script src='assets/js/models/cloud.js'></script>
    <script src='assets/js/models/enemy.js'></script>
    <script src='assets/js/models/dino.js'></script>
    <script src='assets/js/models/game.js'></script>
    <script> //game.start and ajax php
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        const game = new Game(ctx);
        const canvasGame = new CanvasGame(ctx);
        game.usePHP = true;
        canvasGame.start();
        game.start();

        setInterval(function() { 
        if (game.setScore === true) {
            // Send an AJAX request to the PHP script with the "higherDist" value as the data
                $.ajax({
                    type: 'POST',
                    url: 'getScore.php',
                    data: { higherDist: game.currentScore }, // TODO: can add game.initials ?
                    success: function(response) {
                        // // $('ol').html(response);
                        // var scores = JSON.parse(response);
                        // game.uiPanel(scores);
                        var highScores = JSON.parse(response);
                        game.uiPanel(highScores);
                    }
                });
            game.setScore = false;
            }
        }, 1000/60); 
    </script>
    <!-- <script src='assets/js/main.js'></script> -->
</body>
</html>