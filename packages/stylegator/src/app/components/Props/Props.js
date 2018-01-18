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

const ColType = ({ children }) => <td className={styles['type']}>{children}</td>

const ColRequired = ({ children }) => (
  <td className={styles['required']}>{children ? 'true' : 'false'}</td>
)

const ColDefault = ({ children }) => (
  <td className={styles['default']}>{children}</td>
)

const ColDescription = ({ children }) => (
  <td className={styles['description']}>{children}</td>
)

const BaseColumns = ({ name, prop, depth = 0 }) => [
  <ColName {...{ depth }}>{name}</ColName>,
  <ColType>{prop.type.name}</ColType>,
  <ColRequired>{prop.required}</ColRequired>,
  <ColDefault>{prop.default}</ColDefault>,
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
  [<Primitive {...{ name, prop, depth }} />].concat(
    Object.keys(prop.props).map(name => (
      <Row depth={depth + 1} name={name} prop={prop.props[name]} />
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
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(props).map(name => <Row name={name} prop={props[name]} />)}
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
