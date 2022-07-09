import ampq, { Channel, Message } from 'amqplib/callback_api';
import { UserService } from './userService';

export class StatsService {
  queueName = 'stats';
  connectionEstablished = false;
  userService: UserService;
  queueConnectionParams;

  constructor() {
    this.userService = new UserService();
    this.queueConnectionParams = {
      hostname: process.env.QUEUE_HOST,
      port: parseInt(process.env.QUEUE_PORT as string),
      username: process.env.QUEUE_USERNAME,
      password: process.env.QUEUE_PASSWORD,
    };
    this.startListening();
  }

  startListening() {
    ampq.connect(this.queueConnectionParams, (error, connection) => {
      if (error) {
        this.handleError(error);
      } else {
        connection.createChannel((err, channel) => {
          if (err) {
            this.handleError(error);
          } else {
            console.log('Connection with message queue established');
          }
          channel.assertQueue(this.queueName, { durable: false });
          channel.consume(this.queueName, (msg) => this.handleReceivedMessage(channel, msg));
        });
      }
    });
  }

  async handleReceivedMessage(channel: Channel, msg: Message | null) {
    if (msg) {
      const stringMsg = msg.content.toString();
      console.log(stringMsg);
      const message = JSON.parse(stringMsg);
      const updatedUser = await this.userService.updateTotalAttendance(message.userId);
      if (updatedUser) {
        channel.ack(msg);
      }
    }
  }

  handleError(error: Error) {
    console.error('Error connecting to the message queue: ', error);
    console.log('Trying to reconnect in 5 seconds...');
    setTimeout(() => this.startListening(), 5000);
  }
}
