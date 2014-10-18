#!/usr/bin/env node

var pack = require('./')
var entry = process.argv[2]

if (!entry) {
  console.error('Usage: packify-css <file.css>')
  process.exit(1)
}

pack(entry, function(err, packed) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(packed)
  process.exit(0)
})
