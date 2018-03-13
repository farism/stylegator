import * as R from 'ramda'

export default R.pipe(
  R.split('\n'),
  R.filter(R.trim),
  R.map(R.split(':')),
  R.reduce(
    (acc, attr) =>
      Object.assign({}, acc, {
        [attr[0].trim()]: attr[1] ? attr[1].trim() : '',
      }),
    {}
  )
)
