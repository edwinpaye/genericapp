import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface Item {
  name: string;
  children?: Item[];
}

@Component({
  selector: 'app-recursive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recursive.component.html',
  styleUrl: './recursive.component.css'
})
export class RecursiveComponent {
  @Input() items!: Item[];
}
