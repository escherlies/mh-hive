import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import ReactCountryFlag from 'react-country-flag'
import Linkify from './general/Linkify'
import slugify from 'slugify';
import BackButton from './general/BackButton'

class SingleView extends Component {

  renderItem = (header, index, headersArray) => {

    const item = this.props.item.fields

    let content = item[header]
    if (!content) return null


    if (_.isArray(content) && _.isObject(content[0])) content = <Visual file={content[0]} />
    if (_.isObject(content) && _.isObject(content[0])) return null
    if (_.isArray(content) && !_.isObject(content[0])) content = _.reduce(content, (item, acc) => acc += ', ' + item)

    // format or exclude some fields
    switch (header) {
      case "Country": content = item.isoCountryCode ? <span><ReactCountryFlag code={item.isoCountryCode} />{' ' + content}</span> : content
      default: break
    }

    // format certain fields
    switch (content) {
      case true: content = '✅ Yes'; break
      case false: content = 'No'; break
    }

    switch (header) {
      case 'Visual': header = ''
      case 'Logo': header = ''
        break

      default:
        break
    }

    return (<div
      className="mh-single-view__item"
      key={index}
      style={{
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 20,
        width: '100%',
        paddingLeft: 5,
        borderLeft: "2px solid #db5644"
      }}>
      <div
        className="mh-single-view__header"
        style={{
          fontSize: 17,
          fontWeight: 'bold',
          lineHeight: 1.5,
          color: '#db5644',
          flex: 1,
        }}>{header}</div>
      <div
        className="mh-single-view__content"
        style={{
          flex: 2,
          width: "calc(100vw - 20px)",
          fontSize: header === 'Title' ? 17 : 15,
          fontWeight: header === 'Title' ? 'bold' : '',
          color: '#666666',
          whiteSpace: 'wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',

        }}
      >{content}</div>
    </div>)

  }


  render() {
    window.scrollTo(0, 0)

    const { item, match } = this.props

    const tableNameSlug = item && item.tableName && slugify(item.tableName, { lower: true })
    const pillar = match.params.pillar || tableNameSlug

    if (!item) return null


    return (
      <div style={{ margin: 10, marginTop: 20, width: "calc(100vw - 20px)" }} >
        <Linkify>
          {
            _.map(headers[pillar], this.renderItem)
          }
        </Linkify>
        <BackButton />
      </div>
    )
  }
}

const SingleViewWithRouter = withRouter(SingleView)

export default SingleViewWithRouter

const Visual = props => {

  const file = props.file
  const mediaLink = file.thumbnails ? file.thumbnails.large.mediaLink : file.mediaLink

  return <img style={{ maxHeight: 250, maxWidth: "100%" }} src={mediaLink} alt="" />
}



const headers = {
  "education-and-learning": [
    "Title",
    "Visual",
    "Authors",
    "Organization",
    "Link",
    "About",
    "Relevant locations",
    "Category",
    "Description",
    "Date or year",
    "Keywords",
    "Comments",
  ],
  innovation: [
    "Title",
    "Logo",
    "Category",
    "Link",
    "Description",
  ],
  research: [
    "Title",
    "Authors",
    "Year",
    "Citation",
    "Url",
    "Open acess",
    "Location of study",
    "About",
    "Best suited for",
    "Keywords",
    "Type of research",
    "Comments",
  ],
  policy: [
    "Title",
    "Category",
    "Country",
    "Region or city",
    "Coordinates",
    "Type of policy",
    "Description",
    "Date of introduction",
    "Is menstruation specifically referenced?",
    "How is menstruation specifically referenced?",
    "Sector driving policy",
    "Ministry group driving policy",
    "Specific persons",
    "Status of policy",
    "Links",
  ],
}
