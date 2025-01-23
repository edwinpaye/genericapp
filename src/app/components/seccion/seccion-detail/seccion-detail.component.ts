import { Component, OnInit } from '@angular/core';
// import { SeccionService } from '../seccion.service';
// import { Seccion } from '../models/seccion.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SeccionService } from '../../../services/seccion.service';
import { Seccion } from '../../../models/seccion';
import { CommonModule } from '@angular/common';
import { SeccionFormServiceDirective } from '../../../directives/seccion-form-service.directive';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-seccion-detail',
  standalone: true,
  imports: [
      CommonModule,
      // DynamicFormComponent,
      SeccionFormServiceDirective,
      // DynamicTableComponent
    ],
  templateUrl: './seccion-detail.component.html',
  styleUrl: './seccion-detail.component.css'
})
export class SeccionDetailComponent implements OnInit {
  seccion!: Seccion;

  constructor(
    private seccionService: SeccionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    let params = new HttpParams()
          .set('id', id || 0);
          // .set('pageSize', pageSize.toString());
    this.seccionService.get('', { params }).subscribe(data => {
      this.seccion = data;
    });
  }

  editSeccion(): void {
    this.router.navigate(['/secciones/edit'], { state: { seccion: this.seccion } });
  }

  deleteSeccion(): void {
    this.seccionService.delete(`${this.seccion.idseccion}`).subscribe(() => {
      this.router.navigate(['/secciones']);
    });
  }
}