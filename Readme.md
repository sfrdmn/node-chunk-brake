# chunk-brake

[![build status](https://secure.travis-ci.org/sfrdmn/node-chunk-brake.png)](http://travis-ci.org/sfrdmn/node-chunk-brake)

[![testling badge](https://ci.testling.com/sfrdmn/node-chunk-brake.png)](https://ci.testling.com/sfrdmn/node-chunk-brake)

Uses back pressure to throttle a stream to run at a maximum speed of *X* times per second

Like [brake](https://github.com/substack/node-brake), but it throttles *chunks* instead of *bytes*. This means it works well as an `objectMode` transform.

## API

The constructor accepts two parameters:

+ `throttle` The throttle rate in ms, i.e. the minimum miliseconds which must pass between each chunk push
+ `options` Optional options object which is passed through to the underlying Transform constructor

## Example usage

```Javascript
var chunkBrake = require('chunk-brake')

var brake = chunkBrake(500, {objectMode: true})

someObjectStreamProducer.pipe(brake).pipe(someObjectStreamReader)

for (var i = 0; i < 500; i++)
  brake.write({id: i, msg: 'all the sun that shines B)'})
```

## Details

Note that this currently doesn't do anything super special to help ensure precision, i.e. to ensure that yes, chunks are in fact coming in at *X* times a second with relative guarantee

## License

MIT
