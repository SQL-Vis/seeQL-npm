import axios from 'axios'
// import history from '../history'
import {getParserError} from './error'

/**
 * ACTION TYPES
 */
const GET_QUERY_VIS = 'GET_QUERY_VIS'

/**
 * INITIAL STATE
 */
const defaultQueryVis = {}

/**
 * ACTION CREATORS
 */
const getQueryVis = queryVis => ({type: GET_QUERY_VIS, queryVis})

/**
 * THUNK CREATORS
 */

export const fetchQueryVis = queryStr => async dispatch => {
  try {
    const {data} = await axios.post('./api/query', {query: queryStr})
    dispatch(getQueryVis(data))
    // The dispatch below resets the error to none
    dispatch(getParserError({}))
  } catch (err) {
    if (err.response.status === 422) {
      dispatch(getParserError(err.response.data)) //FINISH HERE
    } else {
      console.error(err)
      dispatch(
        getParserError({
          error: 'Sorry, there was an error in your query. Try again.'
        })
      )
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultQueryVis, action) {
  switch (action.type) {
    case GET_QUERY_VIS:
      return action.queryVis
    default:
      return state
  }
}
