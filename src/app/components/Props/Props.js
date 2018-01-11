import React from 'react'
import PropTypes from 'prop-types'

import styles from './props.scss'

const Props = ({ component, props }) => (
  <table>
    <tr>
      <td>Name</td>
      <td>Description</td>
      <td>Type</td>
      <td>Required</td>
      <td>Default</td>
    </tr>
    {Object.keys(props).map(key => (
      <tr>
        <td>{key}</td>
        <td>{props[key].description}</td>
        <td>{props[key].type.name}</td>
        <td>{props[key].required ? 'true' : 'false'}</td>
        <td>{props[key].default}</td>
      </tr>
    ))}
  </table>
)

Props.propTypes = {
  component: PropTypes.string,
  props: PropTypes.object,
}

Props.defaultProps = {
  component: '',
  props: {},
}

export default Props
