export class EmailNotifier {
  sendNotification(notifiable: Notifiable, message: string) {
    EMAIL.sendEmail(notifiable.notificationAddress, message);
  }
}
