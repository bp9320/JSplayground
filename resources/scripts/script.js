var handScore = [0, 0]; // Holds current hand scores
var handsWon = [0, 0]; // Holds number of hands won
var activePlayer = 0; // Identifies the active player, Player = 0, Dealer = 1
var cardIndex = 0; // Tracks place within the shuffled deck
var hands = [[/*player's hand*/],[/*dealer's hand*/]];
var numAces = 0;

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
    //if deck is empty, create and shuffle deck, Else shuffle deck and reset hand variables
    if (this.deck.length === 0) {
      this.createDeck();
      this.shuffleDeck();
    } else {
      numAces = 0;
      hands = [[],[]];
      cardIndex = 0;
      handScore = [0, 0];
      this.shuffleDeck();
    }

    // Deal two cards to each player, alternating between player and dealer
    while (cardIndex < 4) {

      // Add card to active player's hand
      hands[activePlayer].push(this.deck[cardIndex]);

      //Update player card face image
      document.getElementById('player-' + activePlayer + '-CardImg-' + hands[activePlayer].length).src = './resources/media/images/cards/' + hands[activePlayer][hands[activePlayer].length-1][0] + '_of_' + hands[activePlayer][hands[activePlayer].length-1][1] + '.svg';

      //Make Cards Visible
      document.getElementById('player-' + activePlayer + '-Card-' + hands[activePlayer].length).classList.add('blackjack__rotateContainer--visible');

      //Flip Card Over except dealer's second card
      if (!(activePlayer === 1 && hands[activePlayer].length === 2)) {
      document.getElementById('player-' + activePlayer + '-Card-' + hands[activePlayer].length).classList.add('blackjack__rotateContainer--rotate');
      };

      //Update Score except dealer's second card
      updateScore();

      //Move to next card in deck
      cardIndex++;

      //Change Players
      if (activePlayer === 0) {
        activePlayer = 1;
      } else {
        activePlayer = 0;
      }
    };
  }
};

function updateScore() {
  switch (hands[activePlayer][hands[activePlayer].length-1][0]) { //could also use deckObj.deck[cardIndex][0]
    case 'ace':
      //if the current score + 11 is less than 21, add 11 and increment numAces by 1, else add 1 to current score and no increase to numAces
      if (handScore[activePlayer] + 11 <= 21) {
        handScore[activePlayer] += 11;
        numAces++;
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
  if (handScore[activePlayer] > 21 && numAces === 0) {
    handScore[activePlayer] = 'BUST!';
  } else if (handScore[activePlayer] > 21 && numAces > 0) { //if score > 21 but player has aces that were counted as 11 subtract 10 and decrease numAces by 1
    handScore[activePlayer] -= 10;
    numAces--;
  } //no action needed if score is less than 21

  //Update scores in DOM Except score for dealer's second card on deal
  if (!(activePlayer === 1 && hands[activePlayer].length === 2)) {
  document.getElementById('player-' + activePlayer + '-Score').textContent = handScore[activePlayer];
  };

};

document.getElementById('btnDeal').addEventListener('click', deckObj.deal.bind(deckObj));

// deckObj.deal();
// console.log(deckObj.deck);
// console.log();
// console.log(playerHand);
// console.log();
// console.log(dealerHand);
//
// deckObj.deal();
// console.log(deckObj.deck);
// console.log();
// console.log(playerHand);
// console.log();
// console.log(dealerHand);
