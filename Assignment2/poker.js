window.onload = () => {
  let shuffle = [];
  const deal = document.getElementById('deal');
  const result = document.getElementById('result');
  const bet = document.getElementById('btn');
  shuffleShowCheck();
  //shuffle and show cards when load
  function shuffleShowCheck() {
    shuffle.length = 0;
    deal.innerHTML = "";
    const usedCards = new Set();
    while (shuffle.length < 5) {
      const card = {
        suit: String.fromCharCode(Math.floor(Math.random() * 4) + 97),
        num: Math.floor((Math.random() * 13) + 1)
      };
      // Check if the card is a duplicate
      if (usedCards.has(`${card.num}-${card.suit}`)) {
        console.log('Duplicate found. Starting over...');
        continue;
      }
      // Add the card to the shuffle and the set of used cards
      shuffle.push(card);
      usedCards.add(`${card.num}-${card.suit}`);
    }
    showCards();
  }
  //show cards
  function showCards() {
    const cardTemplate = document.getElementsByTagName('template')[0];
    const cardItem = cardTemplate.content.querySelector('.card');
    let a;
    for (let i = 0; i < shuffle.length; i++) {
      a = document.importNode(cardItem, true);
      a.style.setProperty('--i', i); // set --i variable
      if (i < 2) {
        // Show the first two cards
        Object.assign(a.style, {
          backgroundImage: `url('images/cards/${shuffle[i].num}.png')`,
          visibility: 'visible',
          left: `${i * 150}px`,
          animationDelay: `${0.5 * i}s`
        });
      } else {
        // Hide the remaining three cards
        Object.assign(a.style, {
          backgroundImage: "url('images/rearSideCard.jpg')",
          visibility: "visible",
          left: `${i * 150 - 300}px`,
          animationDelay: `${0.9 * i}s`
        });
      }
      deal.appendChild(a);
    }
  }
  //BET Button
  bet.onclick = () => {
    bet.value = "Bet"
    bet.innerHTML = "Next Game"
    // Get the bet amount from the input field
    const betAmount = parseInt(document.getElementById("bet-amount").value);
    // Validate the bet amount
    if (isNaN(betAmount) || betAmount < 1 || betAmount > 10) {
      alert("Please enter a valid bet amount between 1 and 10.");
      return;
    }
    // Show the remaining three cards
    for (let i = 2; i < shuffle.length; i++) {
      const cardElement = deal.childNodes[i];
      cardElement.style.backgroundImage = `url('images/cards/${shuffle[i].num}.png')`;
    }
    updateScore();
    // Update the player's balance and clear the bet input field
    balance -= betAmount;
    document.getElementById("balance").textContent = balance;
    document.getElementById("bet-amount").value = "";
  }
  //Reset
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", function () {
    location.reload();
  });
  //update score
  function updateScore() {
    let score = 0;
    // Calculate the score for the current hand
    for (let i = 0; i < shuffle.length; i++) {
      const card = shuffle[i];
      if (card.num === 1) {
        score += 11; // Ace
      } else if (card.num >= 10) {
        score += 10; // Face card or 10
      } else {
        score += card.num; // Number card
      }
    }
    // Adjust the score if there is an Ace
    for (let i = 0; i < shuffle.length; i++) {
      if (shuffle[i].num === 1 && score > 21) {
        score -= 10;
      }
    }
    // Update the score in the heading
    document.getElementById("score").textContent = "Score: " + score;
  }
}
