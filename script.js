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
            const nameCard = card.getAttribute("name");
            card.classList.add("visible");
            objCompareCards.firstCard == null ? objCompareCards.firstCard = nameCard : objCompareCards.secondCard = nameCard;
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
    if(objCompareCards.firstCard == objCompareCards.secondCard){
      setCardDisabled(objCompareCards.firstCard)
      cardsFinded++;
    }
    
    setTimeout(() => {
        cleanBoarder();
    },200)       
}

const setCardDisabled = (cardDisable) => {
    cards.map(card => {
        if(card.getAttribute("name") == cardDisable){
            card.setAttribute("disabled", "disabled");
        }
    })
}

const cleanBoarder = () => {
    cards.map(card => card.classList.remove("visible"));
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