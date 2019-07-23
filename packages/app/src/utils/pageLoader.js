import React from 'react'
import * as R from 'ramda'

import { getContext } from './'

export default (loader, transform = R.identity) => props => {
  class PageLoader extends React.Component {
    constructor(props) {
      super(props)
      this.state = { content: '' }
    }

    componentDidMount() {
      loader()
        .then(content =>
          this.setState({
            content: transform(content.default),
          })
        )
        .catch(e => {
          console.log('fail', e)
        })
    }

    render() {
      const { Page } = this.props.partials

      return <Page {...props} content={this.state.content} />
    }
  }

  return getContext(PageLoader)
}
