var handScore, handsWon, activePlayer, cardIndex, hands, numAces, gameIsAfoot;

handsWon = [0, 0];

function handReset () {
  handScore = [0, 0]; // Holds current hand scores
  activePlayer = 0; // Identifies the active player, Player = 0, Dealer = 1
  cardIndex = 0; // Tracks place within the shuffled deck
  hands = [[/*player's hand*/],[/*dealer's hand*/]];
  numAces = [0, 0]; //tracks number of aces counted as 11 in a hand
  gameIsAfoot = true; // tracks game state
  for(var i = 1; i <= 5; i++) {
    document.getElementById('player-0-Card-' + i).classList.remove('blackjack__rotateContainer--visible');
    document.getElementById('player-0-Card-' + i).classList.remove('blackjack__rotateContainer--rotate');
    document.getElementById('player-1-Card-' + i).classList.remove('blackjack__rotateContainer--visible');
    document.getElementById('player-1-Card-' + i).classList.remove('blackjack__rotateContainer--rotate');
  }
}

function resetAll() {
  handsWon = [0, 0];
  handReset();
  for (var i = 0; i < 2; i++) {
    document.getElementById('player-' + i + '-Score').textContent = '0';
    document.getElementById('player-' + i + '-Wins').textContent = '0';
  }
}

var deckObj = {
  suits: ['spades', 'clubs', 'hearts', 'diamonds'],
  faces: ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'],
  deck: [],
  createDeck: function() {
    for (var i = 0; i < this.suits.length; i++) {
      for (var j = 0; j < this.faces.length; j++) {
        this.deck.push([this.faces[j], this.suits[i]]);
      }
    }
  },
  shuffleDeck: function() { //Fisher-Yates shuffle
    var m = this.deck.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = this.deck[m];
      this.deck[m] = this.deck[i];
      this.deck[i] = t;
    }
  },
  deal: function() {
    //reset all variables except handsWon
    handReset();
    //if deck is empty, create and shuffle deck, Else shuffle deck and reset hand variables
    if (this.deck.length === 0) {
      this.createDeck();
      this.shuffleDeck();
    } else {
      this.shuffleDeck();
    }

    // Deal two cards to each player, alternating between player and dealer
    while (cardIndex < 4) {
      dealSingleCard();

    //////////////////////////////////////// Attempt at slowing down deal
    // // Deal two cards to each player, alternating between player and dealer
    // while (cardIndex < 4) {
    //   console.log('Deal while loop executing');
    //   if (cardIndex === 0) {
    //     console.log('card index = 0');
    //     console.log(this);
    //     dealSingleCard();
    //   } else {
    //     console.log('card index > 0');
    //     setTimeout(dealSingleCard(), 900);
    //   }

      //Change Players
      if (activePlayer === 0) {
        activePlayer = 1;
      } else {
        activePlayer = 0;
      }
    };
  }
};

function dealSingleCard() {

  //check to see if game is still afoot
  if(gameIsAfoot) {
    if (hands[activePlayer].length < 5) {

      // Add card to active player's hand
      hands[activePlayer].push(deckObj.deck[cardIndex]);

      //Update player card face image
      document.getElementById('player-' + activePlayer + '-CardImg-' + hands[activePlayer].length).src = './resources/media/images/cards/' + hands[activePlayer][hands[activePlayer].length-1][0] + '_of_' + hands[activePlayer][hands[activePlayer].length-1][1] + '.svg';

      //Make Cards Visible
      document.getElementById('player-' + activePlayer + '-Card-' + hands[activePlayer].length).classList.add('blackjack__rotateContainer--visible');

      //Flip Card Over except dealer's second card
      if (!(activePlayer === 1 && hands[activePlayer].length === 2)) {
      document.getElementById('player-' + activePlayer + '-Card-' + hands[activePlayer].length).classList.add('blackjack__rotateContainer--rotate');
      }

      //update score
      updateScore();

      //move to next card in deck
      cardIndex++;

    }

  }

};


function updateScore() {
  switch (hands[activePlayer][hands[activePlayer].length-1][0]) { //could also use deckObj.deck[cardIndex][0]
    case 'ace':
      //if the current score + 11 is less than 21, add 11 and increment numAces by 1, else add 1 to current score and no increase to numAces
      if (handScore[activePlayer] + 11 <= 21) {
        handScore[activePlayer] += 11;
        numAces[activePlayer]++;
      } else {
        handScore[activePlayer] += 1;
      }
      break;

    case '2':
      handScore[activePlayer] += 2;
      break;

    case '3':
      handScore[activePlayer] += 3;
      break;

    case '4':
      handScore[activePlayer] += 4;
      break;

    case '5':
      handScore[activePlayer] += 5;
      break;

    case '6':
      handScore[activePlayer] += 6;
      break;

    case '7':
      handScore[activePlayer] += 7;
      break;

    case '8':
      handScore[activePlayer] += 8;
      break;

    case '9':
      handScore[activePlayer] += 9;
      break;

    default:
      handScore[activePlayer] += 10;
  }

  //check to see if player busts
  if (handScore[activePlayer] > 21 && numAces[activePlayer] === 0) {
    handScore[activePlayer] = 'BUST!';
    gameIsAfoot = false;
    dealerTurn();
  } else if (handScore[activePlayer] > 21 && numAces[activePlayer] > 0) { //if score > 21 but player has aces that were counted as 11 subtract 10 and decrease numAces by 1
    handScore[activePlayer] -= 10;
    numAces[activePlayer]--;
  } //no action needed if score is less than 21

  //Update scores in DOM Except score for dealer's second card on deal
  if (!(activePlayer === 1 && hands[activePlayer].length === 2)) {
  document.getElementById('player-' + activePlayer + '-Score').textContent = handScore[activePlayer];
  }

};

function dealerTurn() {

  // make dealer active player
  activePlayer = 1;

  //check if game is still afoot
  if(gameIsAfoot) {

    //flip second dealer card and update dealer score
    document.getElementById('player-1-Card-2').classList.add('blackjack__rotateContainer--rotate');
    document.getElementById('player-1-Score').textContent = handScore[activePlayer];

    // draw cards while dealer score is less than 17
    while(handScore[activePlayer] < 17) {
      dealSingleCard();
    }
    console.log('check for winner: dealer turn');
    gameIsAfoot = false;

  }

  checkForWinner();

}

function checkForWinner() {
  //Identify insta-winner or insta-loser
  var winner = handScore.indexOf('WINNER!');
  var loser = handScore.indexOf('BUST!');

  //if nobody insta-wins or busts determine who has higher score
  if (winner === -1 && loser === -1) {
    console.log('calculate winner through scores');
    if (handScore[0] > handScore[1]) {
      console.log('scoring: player wins');
      handsWon[0]++;
      handScore[0] = 'WINNER!';
      handScore[1] = 'LOSER!';
    } else if (handScore[0] < handScore[1]) {
      console.log('scoring: dealer wins');
      handsWon[1]++;
      handScore[1] = 'WINNER!';
      handScore[0] = 'LOSER!';
    } else {
      console.log('scoring: push');
      handScore[0] = 'PUSH!';
      handScore[1] = 'PUSH!';
    }
  } else { //Assign winner and loser
    if (winner > -1) {
      console.log('insta-winner scoring');
      handsWon[winner]++;
      handScore[1 - winner] = 'LOSER!';
    } else {
      console.log('insta-loser scoring');
      handsWon[1 - loser]++;
      handScore[1 - loser] = 'WINNER!';
      handScore[loser] = 'LOSER!';
    }
  }

  //display updated scores and wins
  for (var i = 0; i < 2; i++) {
    document.getElementById('player-' + i + '-Score').textContent = handScore[i];
    document.getElementById('player-' + i + '-Wins').textContent = handsWon[i];
  }

}

document.getElementById('btnDeal').addEventListener('click', deckObj.deal.bind(deckObj));
document.getElementById('btnHit').addEventListener('click', dealSingleCard.bind(deckObj));
document.getElementById('btnStand').addEventListener('click', dealerTurn.bind(deckObj));
document.getElementById('btnReset').addEventListener('click', resetAll.bind(deckObj));
