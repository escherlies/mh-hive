import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom'

import firebase from './firebase'

import _ from 'lodash'

import BackButton from './components/BackButton'
import Categories from './components/Categories'
import ListWithCategory from './components/ListWithCategory'
import Header from './components/Header'
import InnovationList from './components/InnovationList'
import PillarButton from './components/PillarButton'
import SingleView from './components/SingleView'
import PrimarySearchBar from './components/PrimarySearchBar'
import SecondarySearchBar from './components/SecondarySearchBar'


import { datadump } from './datadump'

class App extends Component {

  state = {
    data: datadump,
    isLoading: false,
  }

  componentDidMount() {
    // firebase.database().ref().once('value').then(snap => {
    //   this.setState({ data: snap.val(), isLoading: false })
    // })
  }

  render() {

    const { data, isLoading } = this.state

    return (
      <div className="App">
        <div style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
        }}>
          <Header onClick={() => null} />
          <div style={{ margin: 10,}}>
            <Route path='/policy' render={({ match, history }) => <Categories match={match} history={history} items={getCategories(_.get(data, 'Policy'))} />} />
            <Route path='/education' render={({ match, history }) => <Categories match={match} history={history} items={getCategories(_.get(data, 'Education'))} />} />
            <Route path='/innovation' render={({ match, history }) => <Categories match={match} history={history} items={getCategories(_.get(data, 'Innovation'))} />} />
          </div>

        </div>

        {
          isLoading ?
            'loading...' :
            <div>
              <Route path='/policy' render={() => <ListWithCategory items={_.get(data, 'Policy')} />} />
              <Route path='/education' render={() => <ListWithCategory items={_.get(data, 'Education')} />} />
              <Route path='/innovation' render={() => <ListWithCategory items={_.get(data, 'Innovation')} />} />

            </div>
        }
      </div>
    );
  }
}

export default App;



const getCategories = table => {
  const categories = {}

  _.map(table, row => {
    const category = _.get(row, 'fields.Category')
    if (category) categories[category] = true
  })
  return _.map(categories, (cat, key) => key)
}
