import {expect} from 'chai'
import sinon from 'sinon'
import {mount, shallow, configure} from 'enzyme'
import {SearchVis} from './searchVis'
const {JSDOM} = require('jsdom')
import mockAxios from './mock-axios'
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const {window} = jsdom
global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
configure({adapter: new Adapter()})

describe('searchVis component', () => {
  const getSearchVisSpy = sinon.spy()
  const queryArr = [
    {songs: ['artistId', 'length', 'title']},
    {albums: ['genre', 'title', 'label']},
    {
      artists: ['id', 'name', 'age']
    }
  ]
  beforeEach(() => {
    mockAxios.onGet('/api/music/models').replyOnce(200, queryArr)
  })

  describe('can render based on passed props', () => {
    afterEach(() => {
      getSearchVisSpy.resetHistory()
    })

    it('renders the models as tables', () => {
      const wrapper = shallow(
        <SearchVis getModels={getSearchVisSpy} tables={queryArr} />
      )
      expect(wrapper.find('table')).to.have.length(3)
      expect(wrapper.text()).to.include('genre')
      expect(wrapper.text()).to.include('title')
    })

    it('highlights column name cell when a simple select query is inputted', () => {
      const sampleQueryVis = {select: ['albumslabel']}
      const wrapper = shallow(
        <SearchVis
          queryVis={sampleQueryVis}
          getModels={getSearchVisSpy}
          tables={queryArr}
        />
      )
      expect(wrapper.find('.highlighted')).to.have.length(1)
      expect(wrapper.find('.highlighted').text()).to.equal('label')
      expect(wrapper.find('.highlighted').text()).to.not.equal('age')
    })
  })

  it('highlights column name cells when a join query is inputted', () => {
    const sampleQueryVis = {
      join: {left: 'songsartistId', right: 'artistsId', type: 'RIGHT JOIN'},
      select: ['albumslabel', 'artistsage']
    }
    const wrapper = shallow(
      <SearchVis
        queryVis={sampleQueryVis}
        getModels={getSearchVisSpy}
        tables={queryArr}
      />
    )
    expect(wrapper.find('.highlighted')).to.have.length(2)
  })
})
