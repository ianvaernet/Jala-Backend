import express from 'express';
import { User } from './user';
import { NotificationCenter } from './notification-center';

let user = new User();

let notificationCenter = new NotificationCenter();
notificationCenter.notifyByEmail(user, 'test');
notificationCenter.notifyBySMS(user, 'test');

// VS

const facebookNotifier = new FacebookNotifier();
facebookNotifier.sendNotification(user, 'test');
const emailNotifier = new EmailNotifier();
emailNotifier.sendNotification(user, 'test');
