import { Component, Input, OnInit } from '@angular/core';
import { TableColumn } from './tableColumn';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css'
})
export class DynamicTableComponent implements OnInit {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];

  ngOnInit(): void {}
}
