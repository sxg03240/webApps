// Initialize variables
let shuffle = [];
let balance = 100;
const deal = document.getElementById('deal');
const result = document.getElementById('result');
const betBtn = document.getElementById('btn');
const betAmountInput = document.getElementById("bet-amount");
const scoreText = document.getElementById("score");
const resetButton = document.getElementById("reset");
const cardTemplate = document.getElementsByTagName('template')[0];
const cardItem = cardTemplate.querySelector('span');

// Function to shuffle and deal cards
function shuffleAndDeal() {
  // Reset variables and UI elements
  shuffle.length = 0;
  deal.innerHTML = "";
  result.textContent = "";
  scoreText.textContent = "Score: ";
  betAmountInput.value = "";

  const usedCards = new Set();
  // Generate 5 unique cards
  while (shuffle.length < 5) {
    const card = {
      suit: String.fromCharCode(Math.floor(Math.random() * 4) + 97),
      num: Math.floor((Math.random() * 13) + 1)
    };
    // Check if the card is a duplicate
    if (usedCards.has(`${card.num}-${card.suit}`)) {
      continue;
    }
    // Add the card to the shuffle and the set of used cards
    shuffle.push(card);
    usedCards.add(`${card.num}-${card.suit}`);
  }

  // Display the cards
  for (let i = 0; i < shuffle.length; i++) {
    const cardElement = document.importNode(cardItem, true);
    // Show the first two cards
    if (i < 2) {
      Object.assign(cardElement.style, {
        backgroundImage: "url('images/cards/"  + shuffle[i].num + ".png')",
        visibility: "visible"
      });
    } else {
      // Hide the remaining three cards
      Object.assign(cardElement.style, {
        backgroundImage: "url('images/rearSideCard.jpg')",
        visibility: "visible"
      });
    }
    deal.appendChild(cardElement);
  }
}

// Function to update the score
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
  scoreText.textContent = `Score: ${score}`;
}

// Function to handle bet button click
function handleBetButtonClick() {
  const betAmount = parseInt(betAmountInput.value);
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
}