import React from 'react'
import PropTypes from 'prop-types'

import styles from './props.scss'

const padLeft = depth => ({ paddingLeft: `${depth * 20}px` })

const oneOfVal = val => (typeof val === 'string' ? `'${val}'` : `${val}`)

const oneOfTypeVal = type => type.name

const metaArr = (arr, fn) => `[${arr.map(fn).join(', ')}]`

const ColName = ({ children, depth = 0 }) => (
  <td className={styles['name']} style={padLeft(depth)}>
    {children}
  </td>
)

const ColType = ({ type }) => <td className={styles['type']}>{type.name}</td>

const ColRequired = ({ required }) => (
  <td className={styles['required']}>{required ? 'true' : 'false'}</td>
)

const ColDefault = ({ default: defaultValue }) => {
  let renderedVal = ''

  if (typeof children === 'function') {
    renderedVal = defaultValue.toString()
  } else if (typeof defaultValue === 'boolean') {
    renderedVal = defaultValue ? 'true' : 'false'
  } else if (typeof defaultValue === 'string') {
    renderedVal = defaultValue ? defaultValue : "''"
  } else if (typeof defaultValue === 'number') {
    renderedVal = defaultValue
  } else if (Array.isArray(defaultValue)) {
    renderedVal = `[${defaultValue.map(oneOfVal).join(', ')}]`
  } else {
    renderedVal = JSON.stringify(defaultValue)
  }

  return <td className={styles['default']}>{renderedVal}</td>
}

const ColDescription = ({ prop }) => (
  <td className={styles['description']}>
    {prop.deprecated && (
      <div className={styles['deprecated']}>[DEPRECATED] {prop.deprecated}</div>
    )}
    <div className={styles['text']}>{prop.description}</div>
    <Meta {...{ prop }} />
  </td>
)

const BaseColumns = ({ name, prop, depth = 0 }) => (
  <React.Fragment>
    <ColName {...{ depth }}>{name}</ColName>
    <ColType {...prop} />
    <ColRequired {...prop} />
    <ColDefault {...prop} />
  </React.Fragment>
)

const Meta = ({ prop }) => {
  let meta = ''

  if (prop.type.name === 'oneOf') {
    meta = `oneOf: ${metaArr(prop.type.arr, oneOfVal)}`
  } else if (prop.type.name === 'oneOfType') {
    meta = `oneOf: ${metaArr(prop.type.types, oneOfTypeVal)}`
  } else if (prop.type.name === 'arrayOf') {
    meta = `arrayOf: [${prop.type.type.name}]`
  } else if (prop.type.name === 'objectOf') {
    meta = `objectOf: ${[prop.type.type.name]}`
  }

  return meta && <div className={styles['meta']}>{meta}</div>
}

const ShapeRow = ({ name, prop, depth = 0 }) => (
  <React.Fragment>
    <tr>
      <BaseColumns {...{ name, prop, depth }} />
    </tr>
    {Object.keys(prop.props).map((name, i) => (
      <Row key={i} depth={depth + 1} name={name} prop={prop.props[name]} />
    ))}
  </React.Fragment>
)

const Row = ({ name, prop, depth = 0 }) => {
  return prop.type.name === 'shape' ? (
    <ShapeRow {...{ name, prop, depth }} />
  ) : (
    <tr>
      <BaseColumns {...{ name, prop, depth }} />
      <ColDescription {...{ prop }} />
    </tr>
  )
}

const Props = ({ props }) => (
  <div className={styles['props']}>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Required</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(props).map((name, i) => (
          <Row key={i} name={name} prop={props[name]} />
        ))}
      </tbody>
    </table>
  </div>
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
