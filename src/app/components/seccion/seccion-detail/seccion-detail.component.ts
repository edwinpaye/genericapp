import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeccionService } from '../../../services/seccion.service';
import { Seccion } from '../../../models/seccion';
import { CommonModule } from '@angular/common';
import { SeccionFormServiceDirective } from '../../../directives/seccion-form-service.directive';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seccion-detail',
  standalone: true,
  imports: [
      CommonModule,
      SeccionFormServiceDirective,
    ],
  templateUrl: './seccion-detail.component.html',
  styleUrl: './seccion-detail.component.css'
})
export class SeccionDetailComponent implements OnInit {
  seccion!: Seccion;
  seccion$!: Observable<Seccion>;
  isLoading: boolean = false;

  constructor(
    private seccionService: SeccionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isLoading = true;
      let params = new HttpParams()
          .set('id', id);
      this.seccion$ = this.seccionService.getOne('/buscar', { params });
      this.seccion$.subscribe(seccion => {
        this.seccion = seccion;
        this.isLoading = false;
      });
    }
  }

  editSeccion(seccionid: number): void {
    this.router.navigate(['/secciones/edit', seccionid], { state: { seccionid } });
  }

  deleteSeccion(id: number): void {
    this.seccionService.delete(`${id}`).subscribe(() => {
      this.router.navigate(['/secciones']);
    });
  }

}
