import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';  
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-document-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-preview.component.html',
  styleUrl: './document-preview.component.css'
})
export class DocumentPreviewComponent implements OnDestroy {
  // pdfSrc: string | null = null;

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file && file.type === 'application/pdf') {
  //     const fileURL = URL.createObjectURL(file);
  //     this.pdfSrc = fileURL;
  //   } else {
  //     alert('Please select a valid PDF file.');
  //   }
  // }

  pdfSrc: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer, private fileService: FileService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const fileURL = URL.createObjectURL(file);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL); // Sanitize the URL
    } else {
      alert('Please select a valid PDF file.');
    }
  }

  safePdfUrl: SafeResourceUrl | null = null;

  viewFile(): void {
    const url = 'http://localhost:7012/mcoreportes/v1/cobranzas';
    const payload = {
      consolidado: true,
      fechaFin: "2023-01-31",
      fechaInicio: "2023-01-01",
      idcategoria: 0,
      idregional: 7,
      tipo: "recuperacion_resumen_grupos_general",
      tipo_descarga: "pdf",
      usuario: "CESAR"
    };

    this.fileService.getFile(url, payload).subscribe({
      next: (response: Blob) => {
        // Override MIME type to application/pdf
        const blob = new Blob([response], { type: 'application/pdf' });
        const objectUrl = window.URL.createObjectURL(blob);

        this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
      },
      error: (error) => {
        console.error('File load error:', error);
      },
    });
  }

  viewFileFromJson(): void {
    const url = 'http://localhost:7012/mcoreportes/v1/cobranzas';
    const payload = {
      consolidado: true,
      fechaFin: "2023-01-31",
      fechaInicio: "2023-01-01",
      idcategoria: 0,
      idregional: 7,
      tipo: "recuperacion_resumen_dias_general",
      tipo_descarga: "pdf_base64",
      usuario: "CESAR"
    };

    this.fileService.getJsonWithBase64(url, payload).subscribe({
      next: (response) => {
        const base64String = response.bytes;

        // Convert Base64 string to Blob
        const binaryData = atob(base64String); // Decode Base64
        const byteArray = new Uint8Array(binaryData.length);

        for (let i = 0; i < binaryData.length; i++) {
          byteArray[i] = binaryData.charCodeAt(i);
        }

        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const objectUrl = window.URL.createObjectURL(blob);

        this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
      },
      error: (error) => {
        console.error('Error fetching file:', error);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.safePdfUrl) {
      const objectUrl = this.safePdfUrl as string; // Cast SafeResourceUrl back to string for revocation
      window.URL.revokeObjectURL(objectUrl);
    }
  }

  download(): void {
    const url = 'http://localhost:7012/mcoreportes/v1/cobranzas';
    const payload = {
      consolidado: true,
      fechaFin: "2023-12-31",
      fechaInicio: "2023-01-01",
      idcategoria: 0,
      idregional: 7,
      tipo: "recuperacion_por_rango_de_horas",
      tipo_descarga: "excel",
      usuario: "CESAR"
    };
    const filename = 'example.xlsx';

    this.fileService.downloadFile(url, payload, filename);
  }

}
