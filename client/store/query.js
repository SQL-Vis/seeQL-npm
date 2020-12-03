import axios from 'axios'
import history from '../history'

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

//@Natalie - is this the right way to do this (with a post instead of a get)?
export const fetchQueryVis = queryStr => async dispatch => {
  try {
    const {data} = await axios.post('/api/query', {query: queryStr})
    dispatch(getQueryVis(data))
  } catch (err) {
    if (err.response.status === 422) {
      dispatch(setQueryError(err.response.data)) //FINISH HERE
    } else {
      console.error(err)
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
