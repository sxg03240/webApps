window.onload = () => {
    let shuffle = [];
    // const deck = document.getElementById('deck');
    const deal = document.getElementById('deal');
    const result = document.getElementById('result');
    const bet = document.getElementById('btn');

    shuffleShowCheck();

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


    function showCards() {
        const cardTemplate = document.getElementsByTagName('template')[0];
        const cardItem = cardTemplate.content.querySelector('span');
        let a;
        for (let i = 0; i < shuffle.length; i++) {
            a = document.importNode(cardItem, true);
            if (i < 2) {
                // Show the first two cards
                Object.assign(a.style, {
                    backgroundImage: "url('images/cards/" + shuffle[i].suit + "/" + shuffle[i].num + ".png')",
                    visibility: "visible"
                });
            } else {
                // Hide the remaining three cards
                Object.assign(a.style, {
                    backgroundImage: "url('images/rearSideCard.jpg')",
                    visibility: "visible"
                });
            }
            deal.appendChild(a);
        }
    }


    bet.onclick = () => {
        bet.value = "Bet"
        bet.innerHTML = "Next Game"

        const betButton = document.getElementById("btn");
        betButton.addEventListener("click", function () {
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
                cardElement.style.backgroundImage = "url('images/cards/" + shuffle[i].suit + "/" + shuffle[i].num + ".png')";
            }
            check();

            // Update the score
            updateScore();

            // Update the player's balance and clear the bet input field
            balance -= betAmount;
            document.getElementById("balance").textContent = balance;
            document.getElementById("bet-amount").value = "";
        });
    }

    function updateScore() {
        // Calculate the score based on the hand and the bet amount
        // ...
      }

    const check = () => {
        let flush, straight, hand;
        let sameOfKind = 0;
        let suits = shuffle.map(x => x.suit);
        let nums = shuffle.map(x => x.num).sort((a, b) => { return a - b });

        const checkFlush = (value, i, array) => {
            return array[0] === value;
        }
        flush = suits.every(checkFlush);

        const checkStraight = (value, i, array) => {
            if (array[i] == array[i + 1] - 1 || array[i + 1] == null) {
                return true;
            } else {
                return false;
            }
        }
        straight = nums.every(checkStraight);

        const checkSameOfKind = (array) => {
            let ofKinds = [];
            let x = 1;
            while (x < 14) {
                let count = 0;
                for (let i = 0; i < array.length; i++) {
                    array[i] == x ? count++ : count = count;
                }
                if (count >= 2) {
                    let kind = { num: x, count: count }
                    ofKinds.push(kind);
                }
                x++;
            }
            ofKinds.forEach((element) => { sameOfKind += element.count * ofKinds.length; });
        }
        checkSameOfKind(nums);

        flush === true && straight === true ? hand = "straight flush" :
            sameOfKind == 4 ? hand = "four of a kind" :
                sameOfKind == 10 ? hand = "full house" :
                    flush === true && straight === false ? hand = "flush" :
                        flush === false && straight === true ? hand = "straight" :
                            sameOfKind == 3 ? hand = "three of a kind" :
                                sameOfKind == 8 ? hand = "two pairs" :
                                    sameOfKind == 2 ? hand = "one pair" : hand = "none";

        switch (hand) {
            case "straight flush":
                result.innerHTML = "It's a straight flush!";
                break;
            case "four of a kind":
                result.innerHTML = "It's a four of a kind!";
                break
            case "full house":
                result.innerHTML = "It's a full house!";
                break
            case "flush":
                result.innerHTML = "It's a flush!";
                break;
            case "straight":
                result.innerHTML = "It's a straight!";
                break;
            case "three of a kind":
                result.innerHTML = "It's a three of a kind!";
                break;
            case "two pairs":
                result.innerHTML = "It's two pairs";
                break;
            case "one pair":
                result.innerHTML = "It's a pair!";
                break;
            default:
                result.innerHTML = "You've got nothing.";
        }
    }
}

function getDeck() {
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const nums = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
    const deck = [];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < nums.length; j++) {
        const card = { suit: suits[i], num: nums[j] };
        deck.push(card);
      }
    }
    return deck;
  }
  // Define the getHand function
  function getHand() {
    const deck = getDeck();
    const hand = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck.splice(randomIndex, 1)[0];
      hand.push(card);
    }
    return hand;
  }
  function isRoyalFlush(hand) {
    const flush = isFlush(hand);
    const hasTen = hand.some(card => card.num === "10");
    const hasJack = hand.some(card => card.num === "J");
    const hasQueen = hand.some(card => card.num === "Q");
    const hasKing = hand.some(card => card.num === "K");
    const hasAce = hand.some(card => card.num === "A");
    return flush && hasTen && hasJack && hasQueen && hasKing && hasAce;
  }
  // Check if the hand is a Royal Flush
  function isRoyalFlush(hand) {
    return isStraightFlush(hand) && hand[0].value === 10;
  }
  // Check if the hand is a straight flush
  function isStraightFlush(hand) {
    return isFlush(hand) && isStraight(hand);
  }
  // Check if the hand is a four of a kind
  function isFourOfAKind(hand) {
    return countOfAKind(hand, 4);
  }
  // Check if the hand is a full house
  function isFullHouse(hand) {
    return isThreeOfAKind(hand) && isPair(hand);
  }
  // Check if the hand is a flush
  function isFlush(hand) {
    const suit = hand[0].suit;
    return hand.every(card => card.suit === suit);
  }
  // Check if the hand is a straight
  function isStraight(hand) {
    for (let i = 0; i < 4; i++) {
      if (hand[i].value + 1 !== hand[i + 1].value) {
        return false;
      }
    }
    return true;
  }
  // Check if the hand is three of a kind
  function isThreeOfAKind(hand) {
    return countOfAKind(hand, 3);
  }
  // Check if the hand has two pairs
  function isTwoPair(hand) {
    let pairs = 0;
    for (let i = 0; i < 4; i++) {
      if (hand[i].value === hand[i + 1].value) {
        pairs++;
        i++; // skip to the next card after the pair
      }
    }
    return pairs === 2;
  }
  // Check if the hand has one pair
  function isPair(hand) {
    return countOfAKind(hand, 2);
  }
  // Count how many cards are of the same rank
  function countOfAKind(hand, count) {
    for (let i = 0; i < hand.length; i++) {
      let matches = 1;
      for (let j = i + 1; j < hand.length; j++) {
        if (hand[j].value === hand[i].value) {
          matches++;
          if (matches === count) {
            return true;
          }
        } else {
          break; // the cards are sorted by value so we can exit early
        }
      }
    }
    return false;
  }

  function updateScores() {
    let points = 0;
    const hand = getHand();
    const sortedHand = hand.sort((a, b) => b.num - a.num);
    if (isRoyalFlush(sortedHand)) {
      points = 10;
      highlightPointsRow(2);
    } else if (isFourOfAKind(sortedHand)) {
      points = 8;
      highlightPointsRow(4);
    } else if (isFullHouse(sortedHand)) {
      points = 7;
      highlightPointsRow(6);
    } else if (isFlush(sortedHand)) {
      points = 5;
      highlightPointsRow(8);
    } else if (isStraight(sortedHand)) {
      points = 5;
      highlightPointsRow(10);
    } else if (isThreeOfAKind(sortedHand)) {
      points = 3;
      highlightPointsRow(12);
    } else if (isTwoPair(sortedHand)) {
      points = 2;
      highlightPointsRow(14);
    } else if (isPair(sortedHand)) {
      points = 1;
      highlightPointsRow(16);
    } else {
      highlightPointsRow(-1);
    }
    document.getElementById("score").textContent = "Score: " + points;
  }
  function highlightPointsRow(index) {
    const rows = document.querySelectorAll(".points  .hand");
    for (let i = 0; i < rows.length; i += 2) {
      rows[i].classList.remove("highlight");
    }
    if (index >= 0) {
      rows[index].classList.add("highlight");
    }
  }


  

  // function updateScore() {
  //   let score = 0;
  //   // Calculate the score for the current hand
  //   for (let i = 0; i < shuffle.length; i++) {
  //     const card = shuffle[i];
  //     if (card.num === 1) {
  //       score += 11; // Ace
  //     } else if (card.num >= 10) {
  //       score += 10; // Face card or 10
  //     } else {
  //       score += card.num; // Number card
  //     }
  //   }
  //   // Adjust the score if there is an Ace
  //   for (let i = 0; i < shuffle.length; i++) {
  //     if (shuffle[i].num === 1 && score > 21) {
  //       score -= 10;
  //     }
  //   }
  //   // Update the score in the heading
  //   document.getElementById("score").textContent = "Score: " + score;
  // }
  // Define the getDeck function

  // const check = () => {
  //   let flush, straight, hand;
  //   let sameOfKind = 0;
  //   let suits = shuffle.map(x => x.suit);
  //   let nums = shuffle.map(x => x.num).sort((a, b) => { return a - b });

  //   const checkFlush = (value, i, array) => {
  //     return array[0] === value;
  //   }
  //   flush = suits.every(checkFlush);

  //   const checkStraight = (value, i, array) => {
  //     if (array[i] == array[i + 1] - 1 || array[i + 1] == null) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  //   straight = nums.every(checkStraight);

  //   const checkSameOfKind = (array) => {
  //     let ofKinds = [];
  //     let x = 1;
  //     while (x < 14) {
  //       let count = 0;
  //       for (let i = 0; i < array.length; i++) {
  //         array[i] == x ? count++ : count = count;
  //       }
  //       if (count >= 2) {
  //         let kind = { num: x, count: count }
  //         ofKinds.push(kind);
  //       }
  //       x++;
  //     }
  //     ofKinds.forEach((element) => { sameOfKind += element.count * ofKinds.length; });
  //   }
  //   checkSameOfKind(nums);

  //   flush === true && straight === true ? hand = "straight flush" :
  //     sameOfKind == 4 ? hand = "four of a kind" :
  //       sameOfKind == 10 ? hand = "full house" :
  //         flush === true && straight === false ? hand = "flush" :
  //           flush === false && straight === true ? hand = "straight" :
  //             sameOfKind == 3 ? hand = "three of a kind" :
  //               sameOfKind == 8 ? hand = "two pairs" :
  //                 sameOfKind == 2 ? hand = "one pair" : hand = "none";

  //   switch (hand) {
  //     case "straight flush":
  //       result.innerHTML = "It's a straight flush!";
  //       break;
  //     case "four of a kind":
  //       result.innerHTML = "It's a four of a kind!";
  //       break
  //     case "full house":
  //       result.innerHTML = "It's a full house!";
  //       break
  //     case "flush":
  //       result.innerHTML = "It's a flush!";
  //       break;
  //     case "straight":
  //       result.innerHTML = "It's a straight!";
  //       break;
  //     case "three of a kind":
  //       result.innerHTML = "It's a three of a kind!";
  //       break;
  //     case "two pairs":
  //       result.innerHTML = "It's two pairs";
  //       break;
  //     case "one pair":
  //       result.innerHTML = "It's a pair!";
  //       break;
  //     default:
  //       result.innerHTML = "You've got nothing.";
  //   }
  // }

