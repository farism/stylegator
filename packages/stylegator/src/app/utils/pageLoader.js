import React from 'react'
import PropTypes from 'prop-types'

import { Page } from '../components'

export default loader => (title, partials) => {
  class PageLoader extends React.Component {
    constructor(props) {
      super(props)
      this.state = { content: '' }
    }

    componentDidMount() {
      loader()
        .then(content => {
          this.setState({ content })
        })
        .catch(e => {
          console.log('fail', e)
        })
    }

    render() {
      return <Page {...{ partials, title, content: this.state.content }} />
    }
  }

  PageLoader.propTypes = {}

  PageLoader.defaultProps = {}

  return PageLoader
}
