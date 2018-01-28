import React from 'react'
import PropTypes, { withPropDocs } from 'prop-types-docs'

const MyComponent = ({ children }) => <div>My Component!</div>

export default withPropDocs({
  name: 'MyComponent',
  props: {
    foo: {
      type: PropTypes.string,
      required: false,
      default: 'bar',
      description: 'This is a foo',
    },
    person: PropTypes.shape({
      name: {
        type: PropTypes.string,
        description: 'The name',
      },
      age: PropTypes.shape({
        min: {
          type: PropTypes.number,
          description: 'Min age',
        },
        max: {
          type: PropTypes.number,
          description: 'Max age',
        },
      }),
    }),
    bar: {
      type: PropTypes.oneOf(['red', 'blue']),
      description: 'This should be an enum',
    },
    bing: {
      type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      description: 'This should be a bing',
    },
    ping: {
      type: PropTypes.arrayOf(PropTypes.string),
      description: 'This should be a ping',
    },
    pong: {
      type: PropTypes.objectOf(PropTypes.number),
      description: 'This should be a pong',
    },
  },
})(MyComponent)
