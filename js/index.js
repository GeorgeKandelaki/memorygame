const icons = [
    "fas fa-sun",
    "fas fa-bicycle",
    "fas fa-bolt",
    "fas fa-bomb",
    "fas fa-cube",
    "fas fa-leaf",
    "fas fa-paper-plane",
    "fas fa-star",
];

const board = document.querySelector(".game_board");
const cards = [...icons, ...icons];
let firstCard, secondCard;
let flippedCards = 0;
let lockBoard = false;

function shuffleBoard(arr) {
    for (let i = 0; i < arr.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

function createCard(icon) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="card--inner">
            <div class="card__front"><i class="${icon}"></i></div>
            <div class="card__back"></div>
        </div>
    `;
    card.addEventListener("click", flipCard);
    return card;
}

function flipCard(el) {
    if (lockBoard) return false;
    if (this === firstCard) return false;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return true;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.querySelector(".card__front i").className === secondCard.querySelector(".card__front i").className) {
        disableCards();
        return true;
    }

    unflipCards();
    return false;
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        resetBoard();
    }, 1000);

    return true;
}

function init() {
    const shuffledCards = shuffleBoard(cards);
    shuffledCards.forEach((icon) => {
        const card = createCard(icon);
        board.appendChild(card);
    });
}
init();
