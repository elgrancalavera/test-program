'use strict'
const _ = require('lodash')
    , spawn = require('child_process').spawn

module.exports = bin => (cmd, opts, cb) => {
  const node = process.execPath
      , callback = _.once(cb)
      , command = [].concat(bin, cmd)
      , options = opts || {}
      , child = spawn(node, command, options)

  var stdout = ''
    , stderr = ''

  if (child.stderr) child.stderr.on('data', chunk => stderr += chunk)
  if (child.stdout) child.stdout.on('data', chunk => stdout += chunk)

  child.on('error', callback)
  child.on('close', code => callback(null, code, stdout, stderr))

  return child
}
