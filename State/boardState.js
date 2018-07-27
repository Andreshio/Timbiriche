import { clickManipuations } from '../utils';
import { getClassification } from '../utils/clickFunctions/getClassification';

const size = 4;
const createArray = (row, col, value) => {
  return [...Array(row)].map(()=>
    [...Array(col)].map(()=>value)
  )
}

const initialState = () => ({
  turn: 0,
  playedTiles: 0,
  gameEnded: false,
  classification: [],
  currentPlayer: 0,
  players: [
    {
      color: "#00E676",
      points: 0,
      isBot: false,
    }, 
    {
      color: "#ff1744",
      points: 0,
      isBot: true,
    },
  ],

  hitArea: 25,
  lastPlayed: {type: null, col: null, row: null, playerColor: "white"},
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
      case 'CHANGE_COLOR':
        return {
          ...state, 
          players: state.players.map((player, i)=>{
            if(i === action.i){
              player.color = action.color;
            }
            return player;
          })
        }
      case 'END_GAME':
        return {
          ...state,
          gameEnded: true,
          lastPlayed: {type: null, col: null, row: null, playerColor: "white"},
          classification: getClassification(action.players)
        }
      case 'RESET':
        console.log("\nOn Reset\n");
        return initialState()
    default:
      return state
  }
}
