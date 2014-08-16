var Readable = require('stream').Readable

module.exports = function(n) {
  var s = new Readable

  s._read = function() {}

  s.end = function() {
    clearInterval(iv)
    s.push(null)
  }

  var i = 0
  var iv = setInterval(function() {
    s.push(String(i++))
    if (i === n) s.end()
  }, 1000 / n)

  return s
}
