const getStdin = require('get-stdin')
const GitHubApi = require('github')

const lerna = require('../lerna.json')

const OWNER = 'farism'
const REPO = 'stylegator'
const TAG_NAME = `v${lerna.version}`

getStdin().then(body => {
  const github = new GitHubApi({
    timeout: 5000,
    host: 'api.github.com',
    protocol: 'https',
  })

  github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_AUTH,
  })

  github.repos.createRelease(
    { owner: OWNER, repo: REPO, tag_name: TAG_NAME, body },
    (err, result) => {
      if (err) {
        console.error(err)
      } else {
        console.log('Github release created')
      }
    }
  )
})
