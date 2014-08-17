var Writable = require('stream').Writable;

module.exports = function(cb, options) {
  var s = new Writable(options)
  var chunks = 0
  var first, last

  s._write = function(chunk, enc, next) {
    if (!first)
      first = Date.now()
    chunks++
    next()
  }

  s.once('finish', function() {
    last = Date.now()
    var seconds = (last - first) / 1000
    cb(null, chunks / seconds)
    cb = function() {}
  })

  s.on('error', function(err) {
    cb(err)
  })

  return s

}
