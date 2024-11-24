import { Injectable } from '@angular/core';

export interface DataItem {
  id: number;
  label: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private items: DataItem[] = [  
    { id: 1, label: 'Button 1', content: 'Content for Button 1' },  
    { id: 2, label: 'Button 2', content: 'Content for Button 2' },  
    { id: 3, label: 'Button 3', content: 'Content for Button 3' }  
  ];

  getItems() {  
    return this.items;  
  } 
}
