import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Main, Walkthrough} from './components'

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/walkthrough" component={Walkthrough} />
        <Route component={Main} />
      </Switch>
    )
  }
}
