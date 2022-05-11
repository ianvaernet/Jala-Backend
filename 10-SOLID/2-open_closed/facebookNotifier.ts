import { Notifiable } from './notifiable';
import { Notifier } from './notifier';

export class FacebookNotifier implements Notifier {
  sendNotification(notifiable: Notifiable, message: string) {
    FB.sendNotification(notifiable.notificationAddress, message);
  }
}
