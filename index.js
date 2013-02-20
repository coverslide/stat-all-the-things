var fs = require('fs')

module.exports = function(path, cb){
  fs.readdir(path, function(err, files){
    if(err) return cb(err)
    var counter = files.length
    var filestat = {}
    files.forEach(function(file){
      fs.stat(path + '/' + file, function(err, stat){
        counter--
        if(err){
          filestat[file] = {error:err}
        } else {
          stat.type = stat.isFile() ? 'file' :
            stat.isDirectory() ? 'directory' : 
            'unknown'
          filestat[file] = {stat: stat}
        }
        if(!counter) cb(null, filestat)
      })
    })
  })
}
