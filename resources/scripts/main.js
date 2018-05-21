var deckObj = {
  suits: ['spades', 'clubs', 'hearts', 'diamonds'],
  faces: ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'],
  deck: [],
  createDeck: function() {
    for (var i = 0; i < this.suits.length; i++) {
      for (var j = 0; j < this.faces.length; j++) {
        this.deck.push(this.faces[j] + '_of_' + this.suits[i]);
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
  }
};

deckObj.createDeck();
console.log(deckObj.deck);

deckObj.shuffleDeck();
console.log(deckObj.deck);
