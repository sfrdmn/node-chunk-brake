var Readable = require('stream').Readable

module.exports = function(n) {
  var s = new Readable({objectMode: true})

  s._read = function() {}

  s.end = function() {
    clearInterval(iv)
    s.push(null)
  }

  var i = 0
  var iv = setInterval(function() {
    s.push({id: i++, msg: 'hi'})
    if (i === n) s.end()
  }, 1000 / n)

  return s
}
