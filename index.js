module.exports = {

  server: function() {
    var WebSocketServer = require('ws').Server;
    var wss = new WebSocketServer({port: 8087});
    var lastMessage = 'done';

    wss.on('connection', function(ws) {
      if (lastMessage != 'done') {
        ws.send(lastMessage);
      };
    });

    return {
      send: function(message) {
        lastMessage = message;
        wss.clients.forEach(function(client){
          try {
            client.send(message);
          } catch (e) {}
        });
      }
    }
  },

  client: function() {
    var WebSocket = require('ws');
    var ws = new WebSocket('ws://localhost:8087');
    ws.onmessage = function(event) {
      if (event.data == 'done') {
        window.location.reload();
      } else {
        var classes = Array.prototype.slice.call(document.body.classList, 0);
        classes.forEach(function(className) {
          if (className.match(/$build-status-/)) {
            document.body.classList.remove(className);
          }
        });

        document.body.classList.add('build-status-' + event.data);
      }
    };
  }

};
