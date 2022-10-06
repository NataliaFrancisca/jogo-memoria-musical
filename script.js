import { generatePieces, numberOfPieces } from "./assets/scripts/generatePiecesGame.js";
import { start, stop, reset} from "./assets/scripts/timer.js";

const buttonRestartGame = document.getElementById("button-restart-game");
let firstClick = true;

let objCompareCards = { firstCard: null, secondCard: null};
let cards = [];
let cardsFinded = 0;

const startGame = () => {
    cards = [...document.querySelectorAll(".card-image")];
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const cardInfo = {
                nameCard: card.getAttribute("name"),
                idCard: card.getAttribute("key")
            };

            card.classList.add("visible");
            objCompareCards.firstCard == null ? objCompareCards.firstCard = cardInfo : objCompareCards.secondCard = cardInfo;
            Object.values(objCompareCards).every(card => card && true) ? compareCards() : false;
            controlGame();
        })
    })
}

startGame();

const controlGame = () => {
    if(firstClick){
        start();
        firstClick = false;
    }

    if(cardsFinded == numberOfPieces){
        stop();    
    }
}

const compareCards = () => {
    const valuesFirstCard = Object.values(objCompareCards.firstCard);
    const valuesSecondCard = Object.values(objCompareCards.secondCard);

    if(valuesFirstCard[0] == valuesSecondCard[0] && valuesFirstCard[1] !== valuesSecondCard[1]){
        setCardDisabled(objCompareCards.firstCard)
        cardsFinded++;
    }

    setTimeout(() => {
        cleanBoarder();
    },200)       
}

const setCardDisabled = (cardDisable) => {
    cards.map(card => {
        if(card.getAttribute("name") == cardDisable.nameCard){
            card.setAttribute("disabled", "disabled");
        }
    })
}

const cleanBoarder = () => {
    cards.map(card => {
        card.classList.remove("visible");
    });
    objCompareCards = {firstCard: null, secondCard: null}
}

buttonRestartGame.addEventListener("click", () => {
    stop();
    cleanBoarder();
    cards.map(card => card.removeAttribute("disabled"));
    generatePieces();
    reset();
    firstClick = true;
    cardsFinded = 0;
    startGame();
})