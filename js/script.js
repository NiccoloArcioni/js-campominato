/*  Il computer deve generare 16 numeri casuali tra 1 e 100.
I numeri non possono essere duplicati
In seguito deve chiedere all’utente (100- 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
L’utente non può inserire più volte lo stesso numero.
Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
BONUS: (da fare solo se funziona tutto il resto)
all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
con difficoltà 0 => tra 1 e 100
con difficoltà 1 =>  tra 1 e 80
con difficoltà 2 => tra 1 e 50 
----------------------------------------------------------------------------------------------------------------------------------------------------*/

// Funzione numeri random
function rndNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
} 

// Funzione controllo duplicato utente
function isInArray(array, x) {
    var bool = false;
    for (var i = 0; ((i < array.length) && (bool == false)); i++) {
            if (array[i] == x) {
                bool = true;
            }
        }
    return bool;
}

// Funzione genera bombe senza dupicati
function generateBombs(minRndNum, difficulty) {
    var bombArray = [];
    for (var i = 0; i < bombArrayLength; i++) {
        var num = rndNum(minRndNum, difficulty);
        while (isInArray(bombArray, num)) {
            num = rndNum(minRndNum, difficulty);
        }
        bombArray.push(num);
    }
    bombArray = bombArray.sort(function (a, b) { // ordina array con ordine crescente
        return a - b;
    });
    return bombArray;
}

function isBomb(li) {
    if ((!isInArray(bombArray, li.value)) && (userArray.length < userArrayMaxLength - 1)) {
        if (isInArray(userArray, li.value)) {
            alert('Hai già cliccato questa casella!');
        } else {
            document.getElementById(li.id).className = "ms_success";
            userArray.push(li.value);
            scoreCounter += 1;
            document.getElementById('ms_counter').innerHTML = "Score: " + scoreCounter;
        }
    } else {
        gameOver(li.value);
    }
}

function gameOver(num) {
    if (isInArray(bombArray, num)) {
        alert('You stepped on a land mine!');
        
    } else {
        alert('You Win! Max Score!!')
        scoreCounter = "Max Score!!";
    }

    // rende visibili le bombe
    for (var i = 0; i < bombArrayLength; i++) {
        document.getElementById('cell' + bombArray[i]).className = "ms_bomb";
    }

    // stampa punteggio
    document.getElementById('ms_counter').innerHTML = "Score: " + scoreCounter;

    // modifica top score
    if ((topScore < scoreCounter) || (scoreCounter == "Max Score!!")) {
        topScore = scoreCounter;
    }

    // stampa top score
    document.getElementById('ms_top_score').innerHTML = "Top Score: " + topScore;
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */

// const
const minRndNumGenerate = 1;
const bombArrayLength = 16;

// top score
var topScore = 0;
document.getElementById('ms_top_score').innerHTML = "Top Score: " + topScore;

// variabile submit
var submit = document.getElementById('submit');


// evento al click submit
submit.addEventListener('click', 
    function() {
        // difficoltà partita
        var difficulty = document.getElementById('ms_game_difficulty').value;
        switch(difficulty) {
            case "easy":
                difficulty = 100;
                break;
            case "normal":
                difficulty = 80;
                break;
            case "hard":
                difficulty = 50;
                break;
        }
        console.log('max-random: ' + difficulty);

        document.getElementById('ms_cell_container').innerHTML = "";

        for (var i = 1; i <= difficulty; i++) {
            document.getElementById('ms_cell_container').innerHTML += '<li id=cell' + i + ' value=' + i + ' onclick="isBomb(this)"></li>';
        }

        // genera array
        userArrayMaxLength = difficulty - bombArrayLength;
        bombArray = generateBombs(minRndNumGenerate ,difficulty);
        console.log('bombArray: ' + bombArray);

        // array utente e contatore
        userArray = [];
        scoreCounter = 0;
    }
);
