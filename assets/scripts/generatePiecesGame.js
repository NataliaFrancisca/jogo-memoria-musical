import {array_images} from "../data/db.js"

export const numberOfPieces = 6;
const boardGame = document.getElementById("board-game");

const getRandomNumber = () => Math.floor(Math.random() * numberOfPieces);

const generateRandomArrayOfPieces = () => {
    let arrayPiecesRandom = [];

    while(arrayPiecesRandom.length < numberOfPieces * 2){
        const randomPiece = getRandomNumber();
        const checkHaveAlreadyAdded = arrayPiecesRandom.filter(number => number == randomPiece);

        if(checkHaveAlreadyAdded.length < 2){
            arrayPiecesRandom.push(randomPiece);
        }
    }

    return arrayPiecesRandom;
}

const createLines = (arrayPieces) => {
    let piecesArr = [];

    arrayPieces.map(number => {
        const image = array_images.find(image => image.id == number);
        piecesArr.push(image);
    })

    const line = document.createElement("section");
    line.classList.add("line");

    piecesArr.forEach(piece => {
        const cardImage = document.createElement("button")
        cardImage.classList.add("card-image");
        cardImage.setAttribute('name', piece.artist)

        const image = document.createElement("img");
        image.src = `./assets/${piece.image}`;

        cardImage.appendChild(image);
        line.appendChild(cardImage)
    })

    boardGame.appendChild(line);
}

export const generatePieces = () => {

    while(boardGame.firstChild){
        boardGame.removeChild(boardGame.firstChild);
    }

    const newArrayPieces = generateRandomArrayOfPieces();
    
    const firstLinePieces = newArrayPieces.slice(0, 4);
    const secondLinePieces = newArrayPieces.slice(4, 8);
    const thirdLinePieces = newArrayPieces.slice(8, 12);

    createLines(firstLinePieces)
    createLines(secondLinePieces)
    createLines(thirdLinePieces)
}

generatePieces();
