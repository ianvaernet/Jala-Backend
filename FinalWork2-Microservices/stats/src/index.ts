import ampq from 'amqplib/callback_api';
import { UserService } from './userService';

const queue = 'stats';
const userService = new UserService();

ampq.connect(
  {
    hostname: process.env.QUEUE_HOST,
    port: parseInt(process.env.QUEUE_PORT as string),
    username: process.env.QUEUE_USERNAME,
    password: process.env.QUEUE_PASSWORD,
  },
  function (error, connection) {
    if (error) console.error(error);
    connection.createChannel(function (err, channel) {
      if (err) console.error(err);
      else console.log('Connection with queue established');
      channel.assertQueue(queue, { durable: false });
      channel.consume(queue, async function (msg) {
        if (msg) {
          const stringMsg = msg.content.toString();
          console.log(stringMsg);
          const message = JSON.parse(stringMsg);
          let updatedUser;
          if (message.event === 'AttendanceCreated') {
            updatedUser = await userService.incrementTotalAttendance(message.userId);
          } else if (message.event === 'AttendanceDeleted') {
            updatedUser = await userService.decrementTotalAttendance(message.userId);
          }
          if (updatedUser) {
            channel.ack(msg);
          }
        }
      });
    });
    setTimeout(function close() {
      connection.close();
    }, 3600000);
  }
);
