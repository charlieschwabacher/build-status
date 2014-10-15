build-status
============

Use websockets to show gulp build status in the browser.

`npm install --save-dev build-status`

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

gulp.task 'default', ->
  gulp.watch 'scripts/**', ['build']
```

in your client script:

```coffeescript
(require 'build-status').client()
```

This will add 'build-status-building' and 'build-status-error' classes to the
body while assets build or have errors, and refresh the page after builds
complete.
