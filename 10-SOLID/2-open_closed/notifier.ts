export interface Notifier {
  sendNotification(notifiable: Notifiable, message: string);
}
