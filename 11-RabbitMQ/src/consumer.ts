import ampq from 'amqplib/callback_api';

const queue = 'test';

ampq.connect(
  {
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
  },
  function (error, connection) {
    if (error) console.log(error);
    connection.createChannel(function (err, channel) {
      if (err) console.error(err);
      channel.assertQueue(queue, { durable: false });
      channel.consume(
        queue,
        function (msg) {
          if (msg) {
            console.log(msg.content.toString());
          }
        },
        { noAck: true }
      );
    });
    setTimeout(function close() {
      connection.close();
    }, 500);
  }
);
