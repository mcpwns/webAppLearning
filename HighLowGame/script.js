var myDollars = 0;
var count = 0;
var firstRun = true;

var cards = [];
var suits = ["diams", "clubs", "hearts", "spades"];
var numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

var cardOutput = document.getElementById("cards");
var message = document.getElementById('message');
var scoreOutput = document.getElementById('score');
var highLowOutput = document.getElementById('highLow');
var startOutput = document.getElementById('start');
var myDol = document.getElementById('dollars');
var myB = document.getElementById('myBet');

myB.addEventListener("change", checkMe);
myB.addEventListener("blur", checkMe);


function checkMe() {

    if (this.value > myDollars) {
        this.value = myDollars;
    }
    if (this.value < 0) {
        this.value = 0;
    }
    message.innerHTML = "Bet changed to $" + this.value;
}

function gameStart() {
    myDollars = 100;
    count = 0;
    message.innerHTML = "Game Started!";
    document.getElementById('cards').innerHTML = "";
    startOutput.style.display = 'none';
    highLowOutput.style.display = 'block';
    myDol.innerHTML = myDollars;
    myB.value = 0;
    scoreOutput.style.display = 'block';

    //Save memory so we dont need to create more arrays
    if (firstrun) {
        buildCards();
    }

    shuffleArray(cards);
    cardOutput.innerHTML += showCard();
}

function hilo(a) {
    //calculate winner
    var win = false;
    var oldCard = cards[count].cardValue;
    var oldSuit = cards[count].suitValue;
    var myBetAmount = parseInt(myB.value);
    count++;
    cardOutput.innerHTML += showCard();
    var newCard = cards[count].cardValue;
    var newSuit = cards[count].suitValue;
    //check if user guessed right
    if ((a == 'high' && oldCard <= newCard) || (a == 'low' && oldCard >= newCard)) {
        if (oldCard == newCard) {
            if ((oldSuit < newSuit) || (oldSuit > newSuit)) {
                win = true;
            }
        } else {
            win = true;
        }
    }

    if (win) {
        message.innerHTML = "You were RIGHT! :) You made $" + myBetAmount;
        myDollars = myDollars + myBetAmount;
        // score++;
    } else {
        message.innerHTML = "You were WRONG! :( You lost $" + myBetAmount;
        myDollars = myDollars - myBetAmount
        // lives--;

        // if(lives <1) {
        // 	endPlay();
        // }
    }
    var currentBet = parseInt(myB.value);
    if (myDollars < 1) {
        myB.value = 0;
    }

    if (currentBet > myDollars) {
        myB.value = myDollars;
    }
    myB.max = myDollars;
    myDol.innerHTML = myDollars;
    if (count > 3) {
        endPlay();
    }
    //scoreOutput.innerHTML = "SCORE: "+score+" LIVES:("+lives+")";

}

function endPlay() {
    highLowOutput.style.display = 'none';
    scoreOutput.style.display = 'none';
    // message.innerHTML = "Game over your score was " +score+".";
    message.innerHTML = "GAME OVER. You have $" + myDollars;
    startOutput.style.display = 'block';

}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var holder = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[holder];
        array[holder] = temp;
    }
    return array;
}

function showCard() {
    var c = cards[count];
    var cardDist = (count > 0) ? count * 80 + 30 : 30;
    return '<div class="icard ' + c.suit + '" style="left:' + cardDist + 'px;"> <div class="cardtop suit">' + c.num + '<br></div> <div class="cardmid suit"></div> <div class="cardbottom suit">' + c.num + '<br></div> </div>';
}

function buildCards() {
    cards = [];
    for (s in suits) {
        var suit = suits[s][0].toUpperCase();
        for (n in numbers) {
            var card = {
                suit: suits[s],
                num: numbers[n],
                cardValue: parseInt(n) + 2,
                suitValue: parseInt(s) + 1,
                icon: suit
            };
            cards.push(card);
        }
    }
    console.log(cards);
}