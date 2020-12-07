import {expect} from 'chai'
import {fetchResult} from './result'
import {fetchQueryVis} from './query'
import {fetchTables} from './searchvis'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

// TESTS THUNKS FOR EACH ITEM IN STORE
describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    tables: [],
    queryVis: {},
    result: {}
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchResult', () => {
    it('eventually dispatches the GET RESULT action', async () => {
      const fakeQuery = {query: 'SELECT title from Albums'}
      mockAxios.onPost('/api/query/result').replyOnce(200, fakeQuery)
      await store.dispatch(fetchResult())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_RESULT')
      expect(actions[0].result).to.be.deep.equal(fakeQuery)
    })
  })

  describe('fetchQueryVis', () => {
    it('eventually dispatches the GET QUERY VIS action', async () => {
      const fakeQuery = {query: 'SELECT title from Albums'}
      mockAxios.onPost('/api/query').replyOnce(200, fakeQuery)
      await store.dispatch(fetchQueryVis())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_QUERY_VIS')
      expect(actions[0].queryVis).to.be.deep.equal(fakeQuery)
    })
  })

  describe('fetchTables', () => {
    it('eventually dispatches the GET TABLES action', async () => {
      const fakeTable = ['tableColumn', 'tableColumn', 'tableColumn']
      mockAxios.onGet('/api/models').replyOnce(200, fakeTable)
      await store.dispatch(fetchTables())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_TABLES')
      expect(actions[0].tables).to.be.deep.equal(fakeTable)
    })
  })
})
