import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification, NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {
    this.notificationService.notifications$.subscribe(
      (notifications) => (this.notifications = notifications)
    );
  }

  removeNotification(id: string) {
    this.notificationService.removeNotification(id);
  }

}
