import React from 'react'
import PropTypes from 'prop-types'

import styles from './props.scss'

const padLeft = depth => ({ paddingLeft: `${depth * 20}px` })

const oneOfVal = val => (typeof val === 'string' ? `'${val}'` : `${val}`)

const oneOfTypeVal = type => type.name

const ColName = ({ children, depth = 0 }) => (
  <td className={styles['name']} style={padLeft(depth)}>
    {children}
  </td>
)

const ColType = ({ type }) => <td className={styles['type']}>{type.name}</td>

const ColRequired = ({ required }) => (
  <td className={styles['required']}>{required ? 'true' : 'false'}</td>
)

const ColDefault = ({ type, default: defaultValue }) => {
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

const ColDescription = ({ children }) => (
  <td className={styles['description']}>{children}</td>
)
const ColDeprecated = ({ deprecated }) => (
  <td className={styles['deprecated']}>{deprecated}</td>
)

const BaseColumns = ({ name, prop, depth = 0 }) => [
  <ColName key="name" {...{ depth }}>
    {name}
  </ColName>,
  <ColType key="type" {...prop} />,
  <ColRequired key="required" {...prop} />,
  <ColDeprecated key="deprecrated" {...prop} />,
  <ColDefault key="default" {...prop} />,
]

const Primitive = ({ name, prop, depth = 0 }) => (
  <tr>
    <BaseColumns {...{ name, prop, depth }} />
    <ColDescription>{prop.description}</ColDescription>
  </tr>
)

const OneOf = ({ name, prop, depth = 0 }) => (
  <tr>
    <BaseColumns {...{ name, prop, depth }} />
    <ColDescription>
      {prop.description}
      <div className={styles['meta']}>
        <span>oneOf: [{prop.type.arr.map(oneOfVal).join(', ')}]</span>
      </div>
    </ColDescription>
  </tr>
)

const OneOfType = ({ name, prop, depth = 0 }) => (
  <tr>
    <BaseColumns {...{ name, prop, depth }} />
    <ColDescription>
      {prop.description}
      <div className={styles['meta']}>
        <span>oneOfType: [{prop.type.types.map(oneOfTypeVal).join(', ')}]</span>
      </div>
    </ColDescription>
  </tr>
)

const ArrayOf = ({ name, prop, depth = 0 }) => (
  <tr>
    <BaseColumns {...{ name, prop, depth }} />
    <ColDescription>
      {prop.description}
      <div className={styles['meta']}>
        <span>arrayOf [{prop.type.type.name}]</span>
      </div>
    </ColDescription>
  </tr>
)

const ObjectOf = ({ name, prop, depth = 0 }) => (
  <tr>
    <BaseColumns {...{ name, prop, depth }} />
    <ColDescription>
      {prop.description}
      <div className={styles['meta']}>
        <span>objectOf [{prop.type.type.name}]</span>
      </div>
    </ColDescription>
  </tr>
)

const Shape = ({ name, prop, depth = 0 }) =>
  [<Primitive key="primitive" {...{ name, prop, depth }} />].concat(
    Object.keys(prop.props).map((name, i) => (
      <Row key={i} depth={depth + 1} name={name} prop={prop.props[name]} />
    ))
  )

const Row = ({ name, prop, depth = 0 }) => {
  switch (prop.type.name) {
    case 'oneOf':
      return <OneOf {...{ name, prop, depth }} />
    case 'oneOfType':
      return <OneOfType {...{ name, prop, depth }} />
    case 'arrayOf':
      return <ArrayOf {...{ name, prop, depth }} />
    case 'objectOf':
      return <ObjectOf {...{ name, prop, depth }} />
    case 'shape':
      return <Shape {...{ name, prop, depth }} />
    default:
      return <Primitive {...{ name, prop, depth }} />
  }
}

const Props = ({ component, props }) => (
  <div className={styles['props']}>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Required</th>
          <th>Deprecated</th>
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
