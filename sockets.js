
var amqp = require('amqplib');
var config = require('./public/config');

var exchangeName = 'PillarMQ';
var queueName = '';

module.exports = function(io) {
  amqp.connect(config.amqpHost).then(function(conn) {
    return conn.createChannel().then(function(ch) {
      var ok = ch.assertExchange(exchangeName, 'fanout', {durable: true});
      ok = ok.then(function() {
        return ch.assertQueue(queueName, {exclusive: false});
      });
      ok = ok.then(function(qok) {
        return ch.bindQueue(qok.queue, exchangeName, '').then(function() {
          return qok.queue;
        });
      });
      return ok.then(function(queue) {
        return ch.consume(queue, emitMessage, {noAck: true});
      });
    });
  }).then(null, console.warn);

  function emitMessage(msg) {
    try {
      var json = JSON.parse(msg.content.toString());
      io.emit('action', json);
    } catch (error) {
      console.error(error);
    }
  }
};
