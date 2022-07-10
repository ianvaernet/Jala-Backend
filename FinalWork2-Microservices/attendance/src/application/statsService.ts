import ampq from 'amqplib/callback_api';
import { injectable } from 'inversify';

const queueConnectionParams = {
  hostname: process.env.QUEUE_HOST,
  port: parseInt(process.env.QUEUE_PORT as string),
  username: process.env.QUEUE_USERNAME,
  password: process.env.QUEUE_PASSWORD,
};

@injectable()
export class StatsService {
  queue = 'stats';
  connection: ampq.Connection;
  channel: ampq.Channel;

  constructor() {
    this.connect();
  }

  connect() {
    ampq.connect(queueConnectionParams, (error, connection) => {
      if (error) throw new Error(error);
      this.connection = connection;
      connection.createChannel((err, channel) => {
        if (err) throw new Error(err);
        this.channel = channel;
      });
    });
  }

  publishMessage(message: string) {
    if (!this.channel) this.connect();
    this.channel.assertQueue(this.queue, { durable: false });
    this.channel.sendToQueue(this.queue, Buffer.from(message));
  }

  closeConnection() {
    this.connection.close();
  }
}
