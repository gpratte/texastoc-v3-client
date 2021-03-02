import {createStore} from 'redux'
import leagueReducer from './leagueReducer'

export const seed = {
  players: [],
  game: {
    data: null,
    showAddPlayer: false,
    showConfigureSeating: false,
    showConfigureSeatingKey: 1,
    editGamePlayerId: null,
    gettingCurrentGame: false,
    currentGameNotFound: false
  },
  season: {
    data: null,
    gettingSeason: false,
    seasonNotFound: false
  },
  token: null,
  apiError: null
}

const store = createStore(leagueReducer, seed);

export default store;
