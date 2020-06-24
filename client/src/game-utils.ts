import { MAX_POKEMON_INDEX, GAMEBOARD_CELL_DATA_TYPES, POKEBALL_SPRITE_URL } from '@/constants';

/**
 * 
 * @param numRows 
 * @param numCols 
 */
const initializeEmptyGameboard = (numRows: number, numCols: number) => {
  const gameboard = [];

  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push({
        row: i,
        col: j,
        data: {
          type: '',
          ownerSessionToken: '', // only if POKEMON type
          ability: {}, // only if POWER_UP type
          url: '',
        },
      });
    }
    gameboard.push(row);
  }

  return gameboard;
}

/**
 * 
 * @param numRows 
 * @param numCols 
 * @param ownerSessionToken 
 */
export const createInitialGameboard = (numRows: number, numCols: number, ownerSessionToken: string) => {
  // Get empty gameboard
  const gameboard = initializeEmptyGameboard(numRows, numCols);

  // Set initial POKEMON cell type
  const initialX = Math.floor(Math.random() * numRows); // initial X for POKEMON
  const initialY = Math.floor(Math.random() * numRows); // initial Y for POKEMON

  const randomPokemonIndex = Math.floor(Math.random() * MAX_POKEMON_INDEX);
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemonIndex}.png`

  gameboard[initialX][initialY].data = {
    type: GAMEBOARD_CELL_DATA_TYPES.POKEMON,
    ownerSessionToken: ownerSessionToken,
    ability: {},
    url: spriteUrl,
  };

  // Set initial POWER_UP cell types
  const powerUpX = Math.floor(Math.random() * numRows); // initial X for POWER_UP
  const powerUpY = Math.floor(Math.random() * numRows); // initial Y for POWER_UP

  gameboard[powerUpX][powerUpY].data = {
    type: GAMEBOARD_CELL_DATA_TYPES.POWER_UP,
    ownerSessionToken: '',
    ability: {}, // TODO
    url: POKEBALL_SPRITE_URL,
  };

  // Set initial BLOCKER
  const blockerX = Math.floor(Math.random() * numRows); // initial X for POWER_UP
  const blockerY = Math.floor(Math.random() * numRows); // initial Y for POWER_UP

  gameboard[blockerX][blockerY].data = {
    type: GAMEBOARD_CELL_DATA_TYPES.BLOCKER,
    ownerSessionToken: '',
    ability: {},
    url: '',
  };

  return {
    initialX: initialX,
    initialY: initialY,
    gameboard: convertGameboardToObject(gameboard),
    powerUps: { [ownerSessionToken]: [], },
  };
};

/**
 * 
 * @param gameboard 
 */
export const convertGameboardToObject = (gameboard: any[][]) => {
  const gameboardObject: any = {};

  for (let i = 0; i < gameboard.length; i++) {
    gameboardObject[i] = gameboard[i];
  }

  return gameboardObject;
};

/**
 * 
 * @param oldPosition 
 * @param increment 
 * @param numRows 
 */
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