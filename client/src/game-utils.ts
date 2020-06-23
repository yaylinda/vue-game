import {MAX_POKEMON_INDEX} from '@/constants';

export const createInitialGameboard = (numRows: number, numCols: number) => {
    const gameboard = [];

    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        row.push({
          row: i,
          col: j,
          url: ""
        });
      }
      gameboard.push(row);
    }
    
    const initialX = Math.floor(Math.random() * numRows);
    const initialY = Math.floor(Math.random() * numRows);
    
    const randomPokemonIndex = Math.floor(Math.random() * MAX_POKEMON_INDEX);
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemonIndex}.png`

    gameboard[initialX][initialY].url = spriteUrl;

    return {
      initialX: initialX,
      initialY: initialY,
      gameboard: convertGameboardToObject(gameboard)
    };
};

export const convertGameboardToObject = (gameboard: any[][]) => {
  const gameboardObject: any = {};

  for (let i = 0; i < gameboard.length; i++) {
    gameboardObject[i] = gameboard[i];
  }

  return gameboardObject;
};

export const calculateNewPosition = (oldPosition: number, increment: number, numRows: number): number => {
  let newPosition: number = oldPosition + increment; // pass in -1 for Left and Down

  if (newPosition < 0) {
    return numRows - 1;
  }

  if (newPosition === numRows) {
    return 0;
  }

  return newPosition;
};