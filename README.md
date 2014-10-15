build-status
============

show gulp build status in the browser

Include the client js in your page, and the server js in your Gulpfile to
send messages to the client indicating that assets are building or have errors,
and to autoreload once a build is done.

in your gulpfile:

```coffeescript
gulp = require 'gulp'
coffee = require 'gulp-coffee'
buildStatus = require 'build-status'

statusServer = buildStatus.server()

gulp.task 'build', ->
  statusServer.send 'building'

  gulp.src './src/*.coffee'
    .pipe coffee()
    .on 'error', -> statusServer.send 'error'
    .pipe gulp.dest './public/'
    .on 'end', -> statusServer.send 'done'
```

in your client script:

```coffeescript
(require 'build-status').client()
```