const { sync } = require('execa')
const mkdirp = require('mkdirp')
const path = require('path')

  ; (async () => {
    const target = process.argv.slice(2)[0]
    const remote = sync('git', ['config', 'remote.origin.url']).stdout

    const { version } = require('../lerna.json')
    const cwd = path.join(process.cwd(), 'tmp/gh-pages')
    mkdirp.sync(cwd)

    const commands =
      [
        `git init`,
        `git remote add --fetch origin ${remote[0].stdout}`,
        `git checkout -b gh-pages`,
        `git checkout gh-pages`,
        `rm -rf ${target || 'latest'}`,
        `mkdirp v`,
        `cp -r ../../packages/docs/build ${target || `v/${version}`}`,
        `cp -r ../../packages/docs/build ${target || 'latest'}`,
        `cp -r ../../packages/docs/build/404.html 404.html`,
        `git add --all`,
        `git commit --allow-empty -m gh-pages`,
        `git push --force --quiet origin gh-pages`,
      ]

    commands.forEach(cmd => {
      const c = cmd.split(' ')

      sync(c[0], c.slice(1), {
        cwd,
        stdio: 'inherit',
        reject: false,
      })
    })
  })()
