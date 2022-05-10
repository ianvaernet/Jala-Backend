export class SMSNotifier {
  sendNotification(notifiable: Notifiable, message: string) {
    SMS.sendSMS(notifiable.notificationAddress, message);
  }
}
