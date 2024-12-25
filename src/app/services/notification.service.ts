import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  addNotification(notification: Omit<Notification, 'id'>) {
    const id = this.generateId();
    const newNotification: Notification = { id, ...notification };
    const currentNotifications = this.notificationsSubject.getValue();
    this.notificationsSubject.next([...currentNotifications, newNotification]);

    // Auto-remove after 3 seconds
    setTimeout(() => this.removeNotification(id), 3000);
  }

  removeNotification(id: string) {
    const currentNotifications = this.notificationsSubject.getValue();
    const updatedNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(updatedNotifications);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

}
