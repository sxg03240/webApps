window.onload = () => {
  let shuffle = []
  const deal = document.getElementById('deal')
  const result = document.getElementById('result')
  const bet = document.getElementById('btn')
  const nextGame = document.getElementsByTagName('button')[0]
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
          backgroundImage: "url('images/card_back.jpg')",
          visibility: "visible",
        })
      }
      deal.appendChild(a)
    }
  }


  bet.onclick = () => {
    bet.value = "Bet"
    bet.innerHTML = "Next Game"
    bet.classList.add("nextGame")
    const remainingCards = shuffle.slice(2)
    for (let i = 0; i < remainingCards.length; i++) {
      const cardElement = deal.childNodes[i + 2]
      setTimeout(() => {
        cardElement.classList.add("flipping")
        setTimeout(() => {
          cardElement.style.backgroundImage = "url('images/cards/" + remainingCards[i].suit + "/" + remainingCards[i].num + ".png')"
        }, i * 20)
      }, i * 500)
    }
    updateScore()
  }


  // nextGame.onclick = () => {
  //   bet.value = "Next Game"
  //   bet.innerHTML = "Bet"
  //   const remainingCards = shuffle.slice(5)
  //   shuffle = shuffle.slice(0, 5).concat(shuffleCards(remainingCards))
  //   for (let i = 0; i < 5; i++) {
  //     const cardElement = deal.childNodes[i + 2]
  //     cardElement.style.backgroundImage = "url('images/cards/" + shuffle[i].suit + "/" + shuffle[i].num + ".png')"
  //   }
  //   bet.value = "Bet"
  //   bet.innerHTML = "Bet"
  //   updateScore()
  // }



  const resetButton = document.getElementById("reset")
  resetButton.addEventListener("click", function () {
    location.reload()
  })
  function updateScore() {
    let score = 0
    for (let i = 0; i < shuffle.length; i++) {
      const card = shuffle[i]
      if (card.num === 1) {
        score += 11
      } else if (card.num >= 10) {
        score += 10
      } else {
        score += card.num
      }
    }
    for (let i = 0; i < shuffle.length; i++) {
      if (shuffle[i].num === 1 && score > 21) {
        score -= 10
      }
    }
    document.getElementById("score").textContent = "Score: " + score
  }
  function highlightPointsRow(index) {
    const rows = document.querySelectorAll(".points .hand");
    for (let i = 0; i < rows.length; i += 2) {
      rows[i].classList.remove("highlight");
    }
    if (index >= 0) {
      rows[index].classList.add("highlight");
    }
  }
}
