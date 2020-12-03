/**
 * ACTION TYPES
 */
const GET_PARSER_ERROR = 'GET_PARSER_ERROR'
const GET_DATABASE_ERROR = 'GET_DATABASE_ERROR'

/**
 * INITIAL STATE
 */
const defaultInputError = {parser: {}, database: {}}

/**
 * ACTION CREATORS
 */
export const getParserError = error => ({type: GET_PARSER_ERROR, error})
export const getDatabaseError = error => ({type: GET_DATABASE_ERROR, error})

/**
 * REDUCER
 */
export default function(state = defaultInputError, action) {
  switch (action.type) {
    case GET_PARSER_ERROR:
      return {...state, parser: action.error}
    case GET_DATABASE_ERROR:
      return {...state, database: action.error}
    default:
      return state
  }
}
