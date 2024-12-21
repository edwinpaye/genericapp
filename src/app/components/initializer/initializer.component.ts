import { Component, inject, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-initializer',
  standalone: true,
  imports: [],
  templateUrl: './initializer.component.html',
  styleUrl: './initializer.component.css'
})
export class InitializerComponent implements OnInit {
  private configService = inject(ConfigService);

  ngOnInit(): void {
    console.log('Initializer component loaded.');
    this.configService.loadConfig();
    // .subscribe({
    //   next: (config) => console.log('Configuration loaded:', config),
    //   error: (error) => console.error('Error loading configuration:', error),
    // });
  }
}
