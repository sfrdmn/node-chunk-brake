var inherits = require('inherits')
var Transform = require('stream').Transform

function ChunkBrake(throttle, options) {
  if (!(this instanceof ChunkBrake)) return new ChunkBrake(throttle, options);
  Transform.call(this, options)
  this._throttle = throttle || 0
  this._last = 0
}
inherits(ChunkBrake, Transform)

ChunkBrake.prototype._transform = function(chunk, encoding, next) {
  var self = this
  var now = new Date().getTime()
  var delta = now - this._last

  // If we're not ready to stream, apply back pressure until we are
  if (delta < this._throttle)
    setTimeout(advance, this._throttle - delta)
  // Otherwise, just stream it right through
  else
    advance()

  function advance() {
    self._last = new Date().getTime()
    self.push(chunk)
    next()
  }
}

module.exports = ChunkBrake
