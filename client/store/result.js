import axios from 'axios'
import {getDatabaseError} from './error'

/**
 * ACTION TYPES
 */
const GET_RESULT = 'GET_RESULT'

/**
 * INITIAL STATE
 */
const defaultResult = {}

/**
 * ACTION CREATORS
 */
const getResult = result => ({type: GET_RESULT, result})

/**
 * THUNK CREATORS
 */

//@Natalie - is this the right way to do this (with a post instead of a get)?
export const fetchResult = queryStr => async dispatch => {
  try {
    const {data} = await axios.post('./api/query/result', {query: queryStr})
    dispatch(getResult(data))
    dispatch(getDatabaseError({}))
  } catch (err) {
    if (err.response.status === 422) {
      dispatch(getDatabaseError(err.response.data)) //FINISH HERE
    } else {
      console.error(err)
      dispatch(
        getDatabaseError({
          error: 'Sorry, there was an error in your query. Try again.'
        })
      )
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultResult, action) {
  switch (action.type) {
    case GET_RESULT:
      return action.result
    default:
      return state
  }
}
