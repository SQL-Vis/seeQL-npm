import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Main} from './components'

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route component={Main} />
      </Switch>
    )
  }
}
