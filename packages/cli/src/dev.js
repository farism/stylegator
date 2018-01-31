import { dev } from '@stylegator/core'

export default {
  command: 'dev',
  description: 'Start the Stylegator dev server',
  builder: {
    'src-dir': {
      description: 'webpack src directory',
      default: 'src',
    },
    'entry-point': {
      description: 'webpack entry point',
      default: 'index.js',
    },
    'content-base': {
      description: 'webpack static directory',
      default: 'public',
    },
    template: {
      description: 'html-webpack-plugin template file',
      default: 'index.html',
    },
    title: {
      description: 'html-webpack-plugin title string',
      default: 'Stylegator',
    },
    host: {
      description: 'webserver address',
      default: 'localhost',
    },
    port: {
      description: 'webserver port',
      default: 8080,
    },
  },
  handler: argv => {
    dev(argv)
  },
}
