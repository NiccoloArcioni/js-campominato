/*  Il computer deve generare 16 numeri casuali tra 1 e 100.
I numeri non possono essere duplicati
In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
L’utente non può inserire più volte lo stesso numero.
Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
BONUS: (da fare solo se funziona tutto il resto)
all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
con difficoltà 0 => tra 1 e 100
con difficoltà 1 =>  tra 1 e 80
con difficoltà 2 => tra 1 e 50 */

function rndNum(min, max) {
    return Math.floor(Math.random() * (max- min + 1) + min);
} 

function isDuplicate(array, x) {
    var bool = false;
    for (var i = 0; i < array.length; i++) {
            if (array[i] == x) {
                bool = true;
            }
        }
    return bool;
}

function removeArrayDuplicate(array) {
    //ordinamento array
    array = array.sort(function(a, b){
        return a - b;
    });

    for (var i = 0, j = 1; i < array.length; i++, j++) {
        if (array[i] == array[j]) {
            array[j] = (rndNum(1, 100));
            array = array.sort(function (a, b) {
                return a - b;
            });
            i--;
            j--;
        }
    }
    return array;
}

function generateBombs() {
    var bombArray = [];
    var bombArrayLength = 16;
    for (var i = 0; i < bombArrayLength; i++) {
        bombArray.push(rndNum(1, 100));
    }
    return bombArray;
}

var bombArray = generateBombs();
console.log(bombArray);

var bombArrayNoDup = removeArrayDuplicate(bombArray);
console.log(bombArrayNoDup);

var userArray = [];
const userArrayLength = 100 - 16;
var counter = -1;
var topscore = 0;

do {
    var userNum = parseInt(prompt('Inserisci un numero tra 1 e 100'));
    while (userNum <= 0 || userNum > 100 || isNaN(userNum)) {
        alert('Inserisci un numero tra 1 e 100');
        userNum = parseInt(prompt('Inserisci un numero tra 1 e 100'));
    }
    while (isDuplicate(userArray, userNum)) {
        alert('Hai già inserito questo numero, ritenta con un altro');
        userNum = parseInt(prompt('Inserisci un numero tra 1 e 100'));
    }
    userArray.push(userNum);
    counter += 1;
} while ((userArray.length < userArrayLength) && (isDuplicate(bombArray, userNum) == false));

console.log(userNum);
console.log(userArray);
console.log(isDuplicate(bombArray, userNum));
console.log("hai fatto " + counter);

document.getElementById('ms_counter').innerHTML = "Hai fatto: " + counter;