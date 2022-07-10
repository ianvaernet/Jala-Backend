import ampq from 'amqplib/callback_api';

export class StatsServiceMock {
  private publishMessageMock: jest.Mock;
  queue = 'stats';
  connection: ampq.Connection;
  channel: ampq.Channel;

  constructor() {
    this.publishMessageMock = jest.fn();
  }

  async publishMessage(message: string) {
    this.publishMessageMock(message);
  }

  assertPublishMessageHasBeenCalledWith(expected: string) {
    expect(this.publishMessageMock).toHaveBeenCalledWith(expected);
  }

  connect() {}
  closeConnection() {}
}
