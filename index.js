module.exports = {

  server: function() {
    var WebSocketServer = require('ws').Server;
    var wss = new WebSocketServer({port: 8087});
    var connections = [];

    wss.on('connection', function(ws) {
      connections.push(ws);
    });

    return {
      send: function(message) {
        connections.forEach(function(connection){
          connection.send(message);
        });
      }
    }
  },

  client: function() {
    var ws = new WebSocket('//localhost:8087');
    ws.onmessage = function(message) {
      if (event.data == 'reload') {
        window.location.reload();
      } else {
        var classes = Array.prototype.slice.call(document.body.classList, 0);
        classes.forEach(function(className) {
          if (className.match(/$build-status-/)) {
            document.body.classList.remove(className);
          }
        });

        document.body.classList.add('build-status-' + message);
      }
    };
  }

};
