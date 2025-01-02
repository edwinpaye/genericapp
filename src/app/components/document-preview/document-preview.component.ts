import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';  

@Component({
  selector: 'app-document-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-preview.component.html',
  styleUrl: './document-preview.component.css'
})
export class DocumentPreviewComponent {
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

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const fileURL = URL.createObjectURL(file);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL); // Sanitize the URL
    } else {
      alert('Please select a valid PDF file.');
    }
  }

}
