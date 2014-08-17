var test = require('tape')
var stringStream = require('./lib/string-stream.js')
var objectStream = require('./lib/object-stream.js')
var rate = require('./lib/rate-collector.js')
var chunkBrake = require('../index.js')

var targetRate = 10
// Give the rate test a 1 ms cushion
var rateAlpha = 1

function rateOk(rate) {
  return rate > targetRate - rateAlpha && rate < targetRate + rateAlpha
}

test('happiness', function(t) {
  t.plan(1)
  t.ok(true, 'true is true')
})

test('10 chunks / sec', function(t) {
  t.plan(1)
  var source = stringStream(50)
  var brake = chunkBrake(100)
  source.pipe(brake).pipe(rate(function(err, rate) {
    if (err) t.fail(err)
    t.ok(rateOk(rate), 'rate about equal to 10')
    source.end()
  }))
})

test('10 objects / sec', function(t) {
  t.plan(1)
  var source = objectStream(50)
  var brake = chunkBrake(100, {objectMode: true})
  source.pipe(brake).pipe(rate(function(err, rate) {
    if (err) t.fail(err)
    t.ok(rateOk(rate), 'rate about equal to 10')
    source.end()
  }, {objectMode: true}))
})
