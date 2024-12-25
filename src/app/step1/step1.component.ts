import { Component } from '@angular/core';
import { Item, RecursiveComponent } from '../components/recursive/recursive.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [RecursiveComponent],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css'
})
export class Step1Component {
  treeData: Item[] = [  
    {  
      name: 'Item 1',  
      children: [  
        { name: 'Item 1.1' },  
        {  
          name: 'Item 1.2',  
          children: [  
            { name: 'Item 1.2.1' },  
            { name: 'Item 1.2.2' }  
          ]  
        }  
      ]  
    },  
    {  
      name: 'Item 2',  
      children: [  
        { name: 'Item 2.1' },  
        { name: 'Item 2.2' }  
      ]  
    }  
  ];

  constructor(private notificationService: NotificationService) {}

  // type: 'success' | 'error' | 'info' | 'warning';
  execSuccess() {
    this.notificationService.addNotification({
      type: 'success',
      message: 'Action performed successfully!',
    });
  }
  execInfo() {
    this.notificationService.addNotification({
      type: 'info',
      message: 'Action performed successfully!',
    });
  }
  execError() {
    this.notificationService.addNotification({
      type: 'error',
      message: 'Action performed successfully!',
    });
  }
  execWarning() {
    this.notificationService.addNotification({
      type: 'warning',
      message: 'Action performed successfully!',
    });
  }

}
