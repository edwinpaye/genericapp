// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-notifications',
//   standalone: true,
//   imports: [],
//   templateUrl: './notifications.component.html',
//   styleUrl: './notifications.component.css'
// })
// export class NotificationsComponent {

// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification, NotificationService } from '../../services/notification.service';
// import { NotificationService, Notification } from './notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-container">
      <div
        *ngFor="let notification of notifications"
        class="notification"
        [ngClass]="notification.type"
      >
        {{ notification.message }}
        <button class="close-btn" (click)="removeNotification(notification.id)">✖</button>
      </div>
    </div>
  `,
  styles: [
    `
      .notifications-container {
        position: fixed;
        top: 20px;
        right: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1000;
      }
      .notification {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        border-radius: 5px;
        color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        animation: fade-in 0.5s, fade-out 0.5s 2.5s;
      }
      .notification.success {
        background-color: #4caf50;
      }
      .notification.error {
        background-color: #f44336;
      }
      .notification.info {
        background-color: #2196f3;
      }
      .notification.warning {
        background-color: #ff9800;
      }
      .close-btn {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 16px;
        margin-left: 10px;
      }
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fade-out {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-10px);
        }
      }
    `,
  ],
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
