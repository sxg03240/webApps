window.onload = () => {
  let shuffle = []
  const deal = document.getElementById('deal')
  const bet = document.getElementById('btn')
  document.getElementById("score").textContent = "Score: 100";
  const resetButton = document.getElementById("reset");
  const scoreElement = document.getElementById("score");
  const highlightpair = 'highlight-pair'
  const highlighttwopair = 'highlight-two-pair'
  const highlightthreekind = 'highlight-three-kind'
  const highlightflush = 'highlight-straight-flush'
  const highlightstraight = 'highlight-straight'
  const highlightfullhouse = 'highlight-full-house'
  const highlightfourkind = 'highlight-four-kind'
  const highlightroyalflush = 'highlight-royal-flush'
  const royalflush = 'hand grey royalflush'
  const fourkind = 'hand white fourkind'
  const fullhouse = 'hand grey fullhouse'
  const flush = 'hand white flush'
  const straight = 'hand grey straight'
  const threekind = 'hand white threekind'
  const twopair = 'hand grey twopair'
  const pair = 'hand white pair'
  shuffleShowCheck()
  function shuffleShowCheck() {
    shuffle.length = 0
    deal.innerHTML = ""
    const usedCards = new Set()
    while (shuffle.length < 5) {
      const card = {
        suit: String.fromCharCode(Math.floor(Math.random() * 4) + 97),
        num: Math.floor((Math.random() * 13) + 1)
      }
      if (usedCards.has(`${card.num}-${card.suit}`)) {
        console.log('Duplicate found. Starting over...')
        continue
      }
      shuffle.push(card)
      usedCards.add(`${card.num}-${card.suit}`)
    }
    showCards()
  }
  function showCards() {
    const cardTemplate = document.getElementsByTagName('template')[0]
    const cardItem = cardTemplate.content.querySelector('.card')
    let a
    for (let i = 0; i < shuffle.length; i++) {
      a = document.importNode(cardItem, true)
      if (i < 2) {
        Object.assign(a.style, {
          backgroundImage: "url('images/cards/" + shuffle[i].suit + "/" + shuffle[i].num + ".png')",
          visibility: 'visible',
        })
      } else {
        Object.assign(a.style, {
          backgroundImage: "url('images/rearSideCard.jpg')",
          visibility: "visible",
        })
      }
      deal.appendChild(a)
    }
  }
  let isNextGame = false;
  bet.onclick = () => {
    if (isNextGame) {
      shuffleShowCheck();
      isNextGame = false;
      bet.value = "Bet";
      bet.innerHTML = "Bet";
      bet.classList.remove("nextGame");
    } else {
      const remainingCards = shuffle.slice(2);
      for (let i = 0; i < remainingCards.length; i++) {
        const cardElement = deal.childNodes[i + 2];
        setTimeout(() => {
          cardElement.classList.add("flipping");
          setTimeout(() => {
            cardElement.style.backgroundImage = "url('images/cards/" + remainingCards[i].suit + "/" + remainingCards[i].num + ".png')";
          }, i * 20);
        }, i * 500);
      }
      bet.value = "Next Game";
      bet.innerHTML = "Next Game";
      bet.classList.add("nextGame");
      isNextGame = true;
      const betAmount = parseInt(document.getElementById('bet-amount').value);
      const points = calculatePoints(shuffle)
      const score = parseInt(scoreElement.textContent.split(": ")[1])
      let newScore;
      if (points > 0) {
        newScore = score + points * betAmount;
      } else {
        newScore = score - betAmount;
      }
      scoreElement.textContent = `Score: ${newScore}`
      const pointDivs = document.querySelectorAll('.points > .hand')
      pointDivs.forEach(div => {
        if (div.className === royalflush && parseInt(div.innerHTML) === points) {
          const royalflushes = document.querySelectorAll('.royalflush');
          royalflushes.forEach(royalflushing => {
            royalflushing.classList.add(highlightroyalflush);
            setTimeout(() => {
              royalflushing.classList.remove(highlightroyalflush);
            }, 2500);
          });
        } if (div.className === fourkind && parseInt(div.innerHTML) === points) {
          const fourpairs = document.querySelectorAll('.fourkind');
          fourpairs.forEach(fourpair => {
            fourpair.classList.add(highlightfourkind);
            setTimeout(() => {
              fourpair.classList.remove(highlightfourkind);
            }, 2500);
          });
        } if (div.className === fullhouse && parseInt(div.innerHTML) === points) {
          const fullhouses = document.querySelectorAll('.fullhouse');
          fullhouses.forEach(house => {
            house.classList.add(highlightfullhouse);
            setTimeout(() => {
              house.classList.remove(highlightfullhouse);
            }, 2500);
          });
        } if (div.className === flush && parseInt(div.innerHTML) === points && div.innerHTML === 'Flush') {
          const flushes = document.querySelectorAll('.flush');
          flushes.forEach(flushing => {
            flushing.classList.add(highlightstraight);
            setTimeout(() => {
              flushing.classList.remove(highlightstraight);
            }, 2500);
          });
        } if (div.className === straight && parseInt(div.innerHTML) === points && div.innerHTML === 'Straight') {
          const straights = document.querySelectorAll('.straight');
          straights.forEach(straighting => {
            straighting.classList.add(highlightflush);
            setTimeout(() => {
              straighting.classList.remove(highlightflush);
            }, 2500);
          });
        } if (div.className === threekind && parseInt(div.innerHTML) === points) {
          const threepairs = document.querySelectorAll('.threekind');
          threepairs.forEach(threepair => {
            threepair.classList.add(highlightthreekind);
            setTimeout(() => {
              threepair.classList.remove(highlightthreekind);
            }, 2500);
          });
        } if (div.className === twopair && parseInt(div.innerHTML) === points) {
          const twopairs = document.querySelectorAll('.twopair');
          twopairs.forEach(twopairing => {
            twopairing.classList.add(highlighttwopair);
            setTimeout(() => {
              twopairing.classList.remove(highlighttwopair);
            }, 3500);
          });
        } if (div.className === pair && parseInt(div.innerHTML) === points) {
          const pairs = document.querySelectorAll('.pair');
          pairs.forEach(pair => {
            pair.classList.add(highlightpair);
            setTimeout(() => {
              pair.classList.remove(highlightpair);
            }, 3500);
          });
        }
      })
    }
  }
  function calculatePoints(cards) {
    // Check for Royal Flush
    let isRoyalFlush = true
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].num !== 10 + i && 1) {
        isRoyalFlush = false
        break
      }
    }
    if (isRoyalFlush && isSameSuit(cards)) {
      return 10
    }
    // Check for Straight Flush
    if (isStraight(cards) && isSameSuit(cards)) {
      return 9
    }
    // Check for Four of a Kind
    if (isSameValue(cards, 4)) {
      return 8
    }
    // Check for Full House
    if (isSameValue(cards, 3) && isTwoPair(cards)) {
      return 7
    }
    // Check for Flush
    if (isSameSuit(cards)) {
      return 5
    }
    // Check for Straight
    if (isStraight(cards)) {
      return 5
    }
    // Check for Three of a Kind
    if (isSameValue(cards, 3)) {
      return 3
    }
    // Check for Two Pair
    if (isTwoPair(cards)) {
      return 2
    }
    // Check for Pair
    if (isSameValue(cards, 2)) {
      return 1
    }
    // No matches, return 0
    return 0
  }
  function isSameSuit(cards) {
    const suit = cards[0].suit
    return cards.every(card => card.suit === suit)
  }
  function isStraight(cards) {
    // Check for Ace low straight
    if (cards[0].num === 1 && cards[1].num === 10 && cards[2].num === 11 && cards[3].num === 12 && cards[4].num === 13) {
      return true
    }
    // Check for other straights
    for (let i = 0; i < cards.length - 1; i++) {
      if (cards[i].num !== cards[i + 1].num - 1) {
        return false
      }
    }
    return true
  }
  function isSameValue(cards, count) {
    for (let i = 0; i < cards.length; i++) {
      let matches = 1
      for (let j = i + 1; j < cards.length; j++) {
        if (cards[j].num === cards[i].num) {
          matches++
        }
      }
      if (matches === count) {
        return true
      }
    }
    return false
  }
  function isTwoPair(cards) {
    let pairCount = 0
    for (let i = 0; i < cards.length; i++) {
      let matches = 1
      for (let j = i + 1; j < cards.length; j++) {
        if (cards[j].num === cards[i].num) {
          matches++
        }
      }
      if (matches === 2) {
        pairCount++
      }
    }
    return pairCount === 2
  }
  resetButton.addEventListener("click", function () {
    document.getElementById("score").textContent = "Score: 100";
    location.reload();
  })
}
