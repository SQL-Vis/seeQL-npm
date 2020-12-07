import {mount, shallow} from 'enzyme'
import {QueryInput} from './queryInput'
import React from 'react'
import {spy} from 'sinon'
import chai, {expect} from 'chai'
import {fetchQueryVis} from '../store/query'
import {fetchResult} from '../store/result'
import {getCurrentSearch, getLastSearches} from '../store/searches'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('input query form', () => {
  it('form submits event when submit is clicked', () => {
    const erorrObj = {parser: {error: 'error'}, database: {error: 'error'}}
    const callback = spy()
    const wrapper = mount(
      <QueryInput
        setCurrentSearch={getCurrentSearch}
        setLastSearches={getLastSearches}
        getResult={fetchResult}
        getQueryVis={fetchQueryVis}
        error={erorrObj}
        onSubmit={callback}
      />
    )
    wrapper.find('form').simulate('submit')
    // wrapper.find('form').simulate('submit')
    // wrapper.find('[type="submit"]').get(0).click()
    // wrapper.find('[type="submit"]').get(0).click()
    expect(callback).to.have.been.called()
  })
})
