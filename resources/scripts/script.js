var handScore = [0, 0]; // Holds current hand scores
var handsWon = [0, 0]; // Holds number of hands won
var activePlayer = 0; // Identifies the active player, Player = 0, Dealer = 1
var cardIndex = 0; // Tracks place within the shuffled deck
var playerHand = []; // Holds Player's hand
var dealerHand = []; // Holds Dealer's hand

var deckObj = {
  suits: ['spades', 'clubs', 'hearts', 'diamonds'],
  faces: ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'],
  deck: [],
  createDeck: function() {
    for (var i = 0; i < this.suits.length; i++) {
      for (var j = 0; j < this.faces.length; j++) {
        // this.deck.push(this.faces[j] + '_of_' + this.suits[i]);
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
    // console.log(this.deck.length);
    if (this.deck.length === 0) {
      this.createDeck();
      this.shuffleDeck();
    } else {
      playerHand = [], dealerHand = [];
      cardIndex = 0;
      handScore = [0, 0];
      this.shuffleDeck();
    }

    // Deal two cards to each player, alternating between player and dealer
    while (cardIndex < 4) {
      if (cardIndex === 0 || cardIndex === 2) {

        //Add card to Player's hand
        playerHand.push(this.deck[cardIndex]);

        //Update player card face image
        document.getElementById('pCardImg-' + playerHand.length).src = './resources/media/images/cards/' + playerHand[playerHand.length-1][0] + '_of_' + playerHand[playerHand.length-1][1] + '.svg';

        //Make Cards Visible
        document.getElementById('pCard-' + playerHand.length).classList.add('blackjack__rotateContainer--visible');

        //Flip Card Over
        document.getElementById('pCard-' + playerHand.length).classList.add('blackjack__rotateContainer--rotate');

        //Move to next card in deck
        cardIndex++;
      } else {

        //Add card to Dealer's hand
        dealerHand.push(this.deck[cardIndex]);

        //Update Dealer card face image
        document.getElementById('dCardImg-' + dealerHand.length).src = './resources/media/images/cards/' + dealerHand[dealerHand.length-1][0] + '_of_' + dealerHand[dealerHand.length-1][1] + '.svg';

        //Make cards Visible
        document.getElementById('dCard-' + dealerHand.length).classList.add('blackjack__rotateContainer--visible');


        //Flip only first dealer card
        if(dealerHand.length === 1) {
          document.getElementById('dCard-' + dealerHand.length).classList.add('blackjack__rotateContainer--rotate');
        }

        //Move to next card in deck
        cardIndex++;
      }
    };
  }
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
