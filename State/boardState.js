import { clickManipuations } from '../utils';

const size = 8;
const createArray = (row, col, value) => {
  return [...Array(row)].map(()=>
    [...Array(col)].map(()=>value)
  )
}

const initialState = () => ({
  turn: 0,
  gameEnded: false,
  classification: [],
  currentPlayer: 0,
  players: [
    {
      color: "#ff1744",
      points: 0,
    }, 
    {
      color: "#00E676",
      points: 0,
    },/*
    {
      color: "#FFEA00",
      points: 0,
    },
    {
      color: "#651FFF",
      points: 0,
    },
    {
      color: "#2979FF",
      points: 0,
    }*/
  ],

  hitArea: 25,
  colorTiles: createArray(size, size, "white"),
  tiles: createArray(size, size, 0),
  vertical: createArray(size, size+1, false),
  horizontal: createArray(size+1, size, false),
  clickables: createArray(size+1, size+1, 0),
  clicked: [],
});

export default (state = initialState(), action) => {
  switch (action.type) {
      case 'CLICK':
        return {
          ...state,
          ...clickManipuations(state, action),
        }
    default:
      return state
  }
}