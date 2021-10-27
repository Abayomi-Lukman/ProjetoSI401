"use strict";

let isPlaying = false;
let timeElapsed = 0;
let gameInterval;
let gameConfig = {
  "board": 5,
  "gameMode": 1,
  "bombs": 0
};
let itsOk = false;

const modal1 = new Modal("my-modal-1");
document.getElementById('show-modal-1').addEventListener('click', (e) => {
    modal1.show();
});    

init();

function init() {
  handleRanking();
  loadGameModes();
  loadBoardConfig();
}

function loadGameModes() {
  const gameModes = ['Normal', 'Rivotril 🤪'];
  const selectElement = document.querySelector('#config-mode');

  gameModes.forEach((e, index) => {
    const newOption = document.createElement('option');
    newOption.setAttribute('value', index + 1);
    newOption.textContent = e;
    selectElement.appendChild(newOption);
  });
}

function loadBoardConfig() {
  const boardSizes = [5, 6, 7, 8, 9, 10, 15, 20, 25];

  const selectElement = document.querySelector('#config-tab');

  boardSizes.forEach((e) => {
    const newOption = document.createElement('option');
    newOption.setAttribute('value', e);
    newOption.textContent = `${e}x${e}`;
    selectElement.appendChild(newOption);
  });
}

function handleBombs() {
  const numberBombs = document.querySelector('#config-bombas').value;
  if( numberBombs > (gameConfig.board * gameConfig.board) ) {
    alert('O número de bombas é maior que o tamanho do tabuleiro');
    itsOk = false;
  }else {
    gameConfig.bombs = Number(numberBombs);
    itsOk = true;
  }
}

function handleBoard() {
    const selectElement = document.querySelector('#config-tab');
    var value = selectElement.options[selectElement.selectedIndex].value;
    gameConfig.board = value;
}

function handleMode() {
  const selectElement = document.querySelector('#config-mode');
  var value = selectElement.options[selectElement.selectedIndex].value;
  gameConfig.gameMode = value; 
}

function handleTime() {
  if (!isPlaying && timeElapsed == 0) {
    const timerElement = document.querySelector("#tempo");
    gameInterval = setInterval(function () {
      let minutes = Math.floor(timeElapsed / 60);
      let seconds = timeElapsed % 60;
      timerElement.innerHTML = formatTime(minutes) + ":" + formatTime(seconds);
      timeElapsed++;
    }, 1000);
  } else {
    isPlaying = false;
    timeElapsed = 0;
    clear(gameInterval);
    handleTime();
  }
}

function formatTime(time) {
  let formatedTime = time < 9 ? `0${time}` : new String(time);
  return formatedTime;
}

function clear(interval) {
  clearInterval(interval);
}

function handleNewGame() {
  if(itsOk && gameConfig.board && gameConfig.bombs && gameConfig.gameMode) {
    const configElement = document.querySelector('#info-config');
    const modeElement = document.querySelector('#info-mode');
    modal1.hide();
    const configString = `${gameConfig.board}x${gameConfig.board} - ${gameConfig.bombs} 💣`
    configElement.innerHTML = configString;
    const modeString = gameConfig.gameMode == 1 ? 'Normal' : 'Rivotril 🤪'
    modeElement.innerHTML = modeString;
    handleTime();
    createBoard();
    isPlaying = true;
  }
}

function handleRanking() {
  const MOCK_VALUES = [
    {
      "name": "John Doe", 
      "config": "10x10",
      "bombs": "1",
      "gameMode": "Rivotril",
      "time": "1:00",
      "result": "Vitória",
      "dateTime": "22/09/2021 - 11:00"
    },
    {
      "name": "John Doe", 
      "config": "10x10",
      "bombs": "1",
      "gameMode": "Rivotril",
      "time": "1:00",
      "result": "Vitória",
      "dateTime": "22/09/2021 - 11:00"
    },
    {
      "name": "John Doe", 
      "config": "10x10",
      "bombs": "1",
      "gameMode": "Rivotril",
      "time": "1:00",
      "result": "Vitória",
      "dateTime": "22/09/2021 - 11:00"
    },
    {
      "name": "John Doe", 
      "config": "10x10",
      "bombs": "1",
      "gameMode": "Rivotril",
      "time": "1:00",
      "result": "Vitória",
      "dateTime": "22/09/2021 - 11:00"
    },
    {
      "name": "John Doe", 
      "config": "10x10",
      "bombs": "1",
      "gameMode": "Rivotril",
      "time": "1:00",
      "result": "Vitória",
      "dateTime": "22/09/2021 - 11:00"
    },
    {
      "name": "John Doe", 
      "config": "10x10",
      "bombs": "1",
      "gameMode": "Rivotril",
      "time": "1:00",
      "result": "Vitória",
      "dateTime": "22/09/2021 - 11:00"
    },
    {
      "name": "John Doe", 
      "config": "10x10",
      "bombs": "1",
      "gameMode": "Rivotril",
      "time": "1:00",
      "result": "Vitória",
      "dateTime": "22/09/2021 - 11:00"
    }
  ]
  let index = 0;

  const tableElement = document.querySelector("#ranking-body");
  const aux = MOCK_VALUES.map(e => {
    if(index < 5){
      const newRow = document.createElement('tr');
      for(let prop in e) {
        const cellData = document.createElement('td');
        cellData.textContent = e[prop];
        newRow.appendChild(cellData);
      };
      tableElement.appendChild(newRow);
      index++;
    }
  });
}

function createBoard() {
  const boardElement = document.querySelector('#board');
  clearBoard(boardElement);
  const bombCells = createBombsCells();
  console.log(`Valor em bombList:`);
  console.log(bombCells);

  for(let i = 0 ; i < gameConfig.board ; i++) {
    const newRow = document.createElement('div');
    newRow.classList.add('board-line');
    
    for(let j = 0 ; j < gameConfig.board ; j++) {
      
      const newCell = document.createElement('div');
      newCell.classList.add('board-cell');
      
      const cellContent = document.createElement('span');
      if(isBomb(bombCells, [i, j])){
        cellContent.textContent = '💣';
      };
      cellContent.classList.add('invisible');

      newCell.appendChild(cellContent);
      newCell.addEventListener('click', (event) => handleClick(event));
      newRow.appendChild(newCell);
    }
    
    boardElement.appendChild(newRow);
  }


}

function isBomb(bombList, cell) {
  for(let i = 0 ; i < bombList.length ; i++) {
    if(bombList[i].x === cell[0] && bombList[i].y === cell[0]){
      console.log('Bomba encontrada !!!');
      return true;
    }
  }

  return false;
}

function clearBoard(boardElement) {
  while(boardElement.firstChild){
    boardElement.removeChild(boardElement.firstChild);
  }
}

function createBombsCells() {
  let bombCells = new Set();

  while ( bombCells.size !== gameConfig.bombs){
    let x = getRandomInt(0, gameConfig.board);
    let y = getRandomInt(0, gameConfig.board);      
    const bomb = {'x': x, 'y': y};
    bombCells.add(bomb);
  };
  console.log('Valor do SET:');
  console.log(bombCells);
  return [...bombCells.values()];
}

function howManyNeighbor(cell, bombList){
  console.log(cell);
  console.log(bombList);
  return 'DEV';
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function handleTrapaca() {
  if(!isPlaying){
    alert('Jogo ainda não iniciado');
    return;
  }

  const boardElement = document.querySelectorAll('.board-cell');

  boardElement.forEach(element => {
    const cellElement = element.children[0];
    if(cellElement.classList.contains('invisible')){
      cellElement.classList.toggle('invisible');
      setTimeout(() => {
        element.children[0].classList.toggle('invisible');
      }, 5000);
    }
  });

}

function handleClick(event) {
  event.path[0].children[0].classList.remove('invisible');
}

function generateBombs(numBombs) {

}