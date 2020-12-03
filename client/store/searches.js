/**
 * ACTION TYPES
 */
const GET_LAST_SEARCHES = 'GET_LAST_SEARCHES'
const GET_CURRENT_SEARCH = 'GET_CURRENT_SEARCH'

/**
 * INITIAL STATE
 */
const defaultSearches = {currentSearch: '', lastSearches: []}

/**
 * ACTION CREATORS
 */
export const getCurrentSearch = currentSearch => ({
  type: GET_CURRENT_SEARCH,
  currentSearch
})
export const getLastSearches = lastSearch => ({
  type: GET_LAST_SEARCHES,
  lastSearch
})

// /**
//  * THUNK CREATORS
//  */

// export const fetchTables = () => async (dispatch) => {
//   try {
//     const {data} = await axios.get('/api/music/models')
//     dispatch(getTables(data))
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultSearches, action) {
  switch (action.type) {
    case GET_CURRENT_SEARCH:
      return {...state, currentSearch: action.currentSearch}
    case GET_LAST_SEARCHES:
      return {
        ...state,
        lastSearches: [...state.lastSearches, action.lastSearch]
      }
    default:
      return state
  }
}
