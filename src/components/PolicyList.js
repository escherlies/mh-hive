import React, { Component } from 'react'
import _ from 'lodash'
import ReactCountryFlag from 'react-country-flag'
import { Switch, Link, Route, withRouter } from 'react-router-dom'
import slugify from 'slugify'

import SecondarySearchBar from './SecondarySearchBar'

import SingleView from './SingleView'

class PolicyList extends Component {

  state = {

  }

  filterByCategory = (items, category) => {
    if  (category==='all') return items

    return _.filter(items, item => {
      const itemCategory = slugify(item.fields.Category, {lower: true})
      return itemCategory === category
    })
  }

  render() {

    const { items } = this.props

    return (
      <div>
        <Switch>
          <Route exact path={`${this.props.match.url}/:category`} render={({ match }) => _.map(this.filterByCategory(items, match.params.category), (e, i) => <Item match={match} key={i} item={e} />)} />
          <Route exact path={`${this.props.match.url}/:category/:id`} render={({ match }) => <SingleView item={_.get(items, `${match.params.id}.fields`)} />} />
        </Switch>
      </div>
    )
  }
}

const PolicyListWithRouter = withRouter(PolicyList)

export default PolicyListWithRouter


const Item = props => {

  if (!_.has(props, 'item.fields.Title')) return null

  const { isoCountryCode, Title, } = props.item.fields

  return <Link to={`${props.match.url}/${props.item.id}`}  >
    <div style={{
      display: 'flex',
      flexFlow: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontFamily: 'OpenSans',
      fontSize: 15,
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#666666',
      height: 70,
      borderBottom: "1px solid grey",
      marginLeft: 10,
      marginBottom: 5,
      cursor: 'pointer',


    }} >
      <div style={{ marginRight: 10 }}><ReactCountryFlag code={isoCountryCode} /></div>
      <div
        className="truncate"
        style={{
          flex: 'auto',
          overflow: 'hidden',
          lineHeight: '1.2em',
          maxHeight: '3.6em',
          marginRight: 10,
        }}>{Title}</div>
      <div style={{ marginRight: 10 }}>▶️</div>
    </div>
  </Link>

}