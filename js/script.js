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
con difficoltà 2 => tra 1 e 50 */

// Funzione numeri random
function rndNum(min, max) {
    return Math.floor(Math.random() * (max- min + 1) + min);
} 

// Funzione controllo duplicato utente
function isDuplicate(array, x) {
    var bool = false;
    for (var i = 0; i < array.length; i++) {
            if (array[i] == x) {
                bool = true;
            }
        }
    return bool;
}


// Funzione genera bombe senza dupicati
function generateBombs(difficulty) {
    var bombArray = [];
    var bombArrayLength = 16;
    for (var i = 0; i < bombArrayLength; i++) {
        var num = rndNum(1, difficulty);
        while (isDuplicate(bombArray, num)) {
            num = rndNum(1, difficulty);
        }
        bombArray.push(num);
    }
    bombArray = bombArray.sort(function (a, b) {
        return a - b;
    });
    return bombArray;
}

var submit = document.getElementById('submit');

submit.addEventListener('click', 
    function() {
        // variabili
        var difficulty = parseInt(document.getElementById('ms_game_difficulty').value);
        console.log('max-random: ' + difficulty);

        var bombArray = generateBombs(difficulty);
        console.log('bombArray: ' + bombArray);

        var userArray = [];
        const userArrayLength = difficulty - 16;
        var counter = -1;

        // inserimento numeri utente
        do {
            var userNum = parseInt(prompt('Inserisci un numero tra 1 e ' + difficulty));
            while (userNum <= 0 || userNum > difficulty || isNaN(userNum)) {
                alert('Inserisci un numero tra 1 e difficulty');
                userNum = parseInt(prompt('Inserisci un numero tra 1 e ' + difficulty));
            }
            while (isDuplicate(userArray, userNum)) {
                alert('Hai già inserito questo numero, ritenta con un altro');
                userNum = parseInt(prompt('Inserisci un numero tra 1 e ' + difficulty));
            }
            userArray.push(userNum);
            counter += 1;
        } while ((userArray.length < userArrayLength) && (isDuplicate(bombArray, userNum) == false));

        console.log('ultimo numero inserito ' + userNum);
        console.log('Array numeri inseriti dall\'utente: ' + userArray);
        console.log('hai colpito una bomba: ' + isDuplicate(bombArray, userNum));
        console.log("hai fatto " + counter);

        // stampa punteggio
        document.getElementById('ms_counter').innerHTML = "Hai fatto: " + counter;
    }
);
