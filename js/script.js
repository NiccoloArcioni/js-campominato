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

        // genera array
        const userArrayMaxLength = difficulty - bombArrayLength;
        var bombArray = generateBombs(minRndNumGenerate ,difficulty);
        console.log('bombArray: ' + bombArray);

        // array utente e contatore
        var userArray = [];
        var scoreCounter = -1;

        // inserimento numeri utente
        do {
            var userNum = parseInt(prompt('Pick a number between ' + minRndNumGenerate + ' and ' + difficulty));
            while ((userNum < minRndNumGenerate) || (userNum > difficulty) || (isNaN(userNum))) {  //controllo se il numero è compreso nel range
                alert('Pick a number between ' + minRndNumGenerate + ' and ' + difficulty);
                userNum = parseInt(prompt('Pick a number between ' + minRndNumGenerate + ' and ' + difficulty));
            }
            while (isInArray(userArray, userNum)) {  // controllo duplicati numero utente
                alert('Hai già inserito questo numero, ritenta con un altro');
                userNum = parseInt(prompt('Pick a number between ' + minRndNumGenerate + ' and ' + difficulty));
            }
            userArray.push(userNum);
            scoreCounter += 1;
        } while ((userArray.length < userArrayMaxLength) && (!(isInArray(bombArray, userNum)))); // controllo vittoria o bomba presa

        // se esce da while per isInArray true 
        if (isInArray(bombArray, userNum)) {
            alert('You stepped on a land mine!');
        }

        // se esce da while per lunghezza userArray 
        if (userArray.length == userArrayMaxLength) {
            scoreCounter = "Max Score!!";
        }

        console.log('ultimo numero inserito ' + userNum);
        console.log('Array numeri inseriti dall\'utente: ' + userArray);
        console.log('hai colpito una bomba: ' + isInArray(bombArray, userNum));
        console.log("hai fatto " + scoreCounter);

        // stampa punteggio
        document.getElementById('ms_counter').innerHTML = "Score: " + scoreCounter;

        // modifica top score
        if((topScore < scoreCounter) || (scoreCounter == "Max Score!!")) {
            topScore = scoreCounter;
        }

        // stampa top score
        document.getElementById('ms_top_score').innerHTML = "Top Score: " +topScore;
    }
);
