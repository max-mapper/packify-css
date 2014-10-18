var inliner = require('imageinliner')
var combine = require('css-combine')

var path = require('path')
var os = require('os')
var fs = require('fs')

module.exports = function(entry, cb) {
  var dir = path.dirname(entry)
  var tmp = path.join(os.tmpdir(), 'packify' + Math.floor(Math.random() * 1000 + Date.now()) + '.css')
  var tmpWrite = fs.createWriteStream(tmp)
  var combiner = combine(entry)
  combiner.pipe(tmpWrite)
  combiner.on('error', function(err) {
    cb(err)
  })
  tmpWrite.on('finish', function() {
    var inlined = inliner.css(fs.readFileSync(tmp).toString(), { cssBasePath: dir })
    cb(null, inlined)
  })
}