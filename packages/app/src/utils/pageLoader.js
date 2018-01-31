import React from 'react'
import PropTypes from 'prop-types'

import { getContext } from './'

export default loader => title => {
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
      const { Page } = this.props.partials

      return <Page {...{ title, content: this.state.content }} />
    }
  }

  PageLoader.propTypes = {}

  PageLoader.defaultProps = {}

  return getContext(PageLoader)
}
