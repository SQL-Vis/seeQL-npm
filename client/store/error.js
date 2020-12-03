import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_INPUT_ERROR = 'GET_INPUT_ERROR'

/**
 * INITIAL STATE
 */
const defaultInputError = {}

/**
 * ACTION CREATORS
 */
export const getInputError = error => ({type: GET_INPUT_ERROR, error})

/**
 * REDUCER
 */
export default function(state = defaultInputError, action) {
  switch (action.type) {
    case GET_INPUT_ERROR:
      return action.error
    default:
      return state
  }
}
