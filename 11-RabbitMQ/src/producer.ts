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
      const message = `Hello world in queue ${queue}!`;
      channel.assertQueue(queue, { durable: false });
      channel.sendToQueue(queue, Buffer.from(message));
    });
    setTimeout(function close() {
      connection.close();
    }, 500);
  }
);
