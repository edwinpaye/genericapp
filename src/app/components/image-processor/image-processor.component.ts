import { Component, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core'; // Added HostListener
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CropConfig {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface VisualizerStyle {
  left: number;
  top: number;
  width: number;
  height: number;
}


@Component({
  selector: 'app-image-processor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-processor.component.html',
  styleUrl: './image-processor.component.css'
})
export class ImageProcessorComponent implements AfterViewInit {
  @ViewChild('imageCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('originalImagePreview') originalImagePreviewRef!: ElementRef<HTMLImageElement>;

  private ctx!: CanvasRenderingContext2D | null;
  private originalImage: HTMLImageElement | null = null;
  private scaleX: number = 1;
  private scaleY: number = 1;

  // Dragging state
  isDragging: boolean = false;
  private dragStartX: number = 0; // In original image coordinates
  private dragStartY: number = 0; // In original image coordinates

  originalImageSrc: string | ArrayBuffer | null = null;
  processedImageURL: string | null = null;
  processedImageBlob: Blob | null = null;

  cropConfig: CropConfig = { x: 0, y: 0, width: 100, height: 100 };
  applyGrayscaleFilter: boolean = false;
  outputFormat: 'image/png' | 'image/jpeg' | 'image/webp' = 'image/jpeg';
  jpegQuality: number = 0.92;

  uploadMessage: string = '';
  showCropVisualizer: boolean = false;
  cropVisualizerStyle: VisualizerStyle = { left: 0, top: 0, width: 0, height: 0 };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.canvasRef) {
      this.ctx = this.canvasRef.nativeElement.getContext('2d');
    } else {
      console.error("Canvas element not found!");
    }
  }

  // HostListeners for global mouse events to handle dragging outside the image
  @HostListener('window:mousemove', ['$event'])
  onGlobalMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.handleDrag(event);
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onGlobalMouseUp(event: MouseEvent): void {
    if (this.isDragging) {
      this.endDrag(event);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.originalImageSrc = e.target?.result || null;
        this.originalImage = new Image();
        this.originalImage.onload = () => {
          if (this.originalImage) {
            this.cropConfig = { // Reset crop or set to a default relative to image
              x: 0,
              y: 0,
              // width: Math.min(100, this.originalImage.naturalWidth),
              // height: Math.min(100, this.originalImage.naturalHeight)
              width: this.originalImage.naturalWidth,
              height: this.originalImage.naturalHeight
            };
            this.onOriginalImageLoad(); // Call to calculate scale and initial preview
          }
        };
        if (typeof reader.result === 'string') {
          this.originalImage.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
      this.processedImageURL = null;
      this.processedImageBlob = null;
      this.uploadMessage = '';
      this.showCropVisualizer = false;
      this.isDragging = false; // Reset dragging state
    }
  }

  onPdfFileSelected(event: Event): void {
    if (!this.processedImageBlob) {
      this.uploadMessage = 'No processed image to upload. Please apply changes first.';
      return;
    }
    this.uploadMessage = 'Uploading...';
    const formData = new FormData();
    const fileName = `processed_image.${this.outputFormat.split('/')[1]}`;
    formData.append('file', this.processedImageBlob, fileName);
    const uploadURL = 'http://localhost:8001/files/pdf-to-png';
    this.http.post(uploadURL, formData).subscribe({
      next: (response) => {
        console.log('Upload successful');
        this.uploadMessage = 'Upload successful!';
      },
      error: (error) => {
        console.error('Upload failed', error);
        this.uploadMessage = `Upload failed: ${error.message}. Check console and ensure server is running.`;
      }
    });
  }

  onOriginalImageLoad(): void {
    if (this.originalImage && this.originalImagePreviewRef?.nativeElement?.offsetWidth > 0) {
      const previewElement = this.originalImagePreviewRef.nativeElement;
      this.scaleX = this.originalImage.naturalWidth / previewElement.offsetWidth;
      this.scaleY = this.originalImage.naturalHeight / previewElement.offsetHeight;
      this.showCropVisualizer = true;
      this.updateAndPreview();
    }
  }

  // --- Dragging Logic ---
  startDrag(event: MouseEvent): void {
    if (!this.originalImage || !this.originalImagePreviewRef || !this.showCropVisualizer) return;
    event.preventDefault(); // Prevent default image drag behavior

    this.isDragging = true;
    const previewElement = this.originalImagePreviewRef.nativeElement;
    const rect = previewElement.getBoundingClientRect();

    const previewX = event.clientX - rect.left;
    const previewY = event.clientY - rect.top;

    this.dragStartX = previewX * this.scaleX;
    this.dragStartY = previewY * this.scaleY;

    // Initialize crop from the starting point
    this.cropConfig = {
      x: Math.round(this.dragStartX),
      y: Math.round(this.dragStartY),
      width: 0,
      height: 0
    };
    this.updateAndPreview();
  }

  private handleDrag(event: MouseEvent): void { // Renamed from onDragging for clarity with HostListener
    if (!this.isDragging || !this.originalImage || !this.originalImagePreviewRef) return;
    // event.preventDefault(); // Not needed here if mousedown already did

    const previewElement = this.originalImagePreviewRef.nativeElement;
    const rect = previewElement.getBoundingClientRect();

    // Calculate current mouse position relative to the preview image
    // Clamp to preview bounds to avoid negative values if mouse is outside while dragging
    let currentPreviewX = event.clientX - rect.left;
    let currentPreviewY = event.clientY - rect.top;

    currentPreviewX = Math.max(0, Math.min(currentPreviewX, previewElement.offsetWidth));
    currentPreviewY = Math.max(0, Math.min(currentPreviewY, previewElement.offsetHeight));

    const currentOriginalX = currentPreviewX * this.scaleX;
    const currentOriginalY = currentPreviewY * this.scaleY;

    const newX = Math.min(this.dragStartX, currentOriginalX);
    const newY = Math.min(this.dragStartY, currentOriginalY);
    const newWidth = Math.abs(currentOriginalX - this.dragStartX);
    const newHeight = Math.abs(currentOriginalY - this.dragStartY);

    this.cropConfig = {
      x: Math.round(newX),
      y: Math.round(newY),
      width: Math.max(1, Math.round(newWidth)), // Ensure min width/height of 1
      height: Math.max(1, Math.round(newHeight))
    };
    this.updateAndPreview();
  }

  private endDrag(event: MouseEvent): void { // Renamed for clarity
    if (!this.isDragging) return;
    // event.preventDefault(); // Not typically needed for mouseup

    this.isDragging = false;
    // Final update after dragging stops
    // The cropConfig is already set by the last handleDrag call
    // If width or height is very small, you might want to reset or show an error
    if (this.cropConfig.width < 5 || this.cropConfig.height < 5) {
        console.warn("Selected crop area is very small.");
        // Optionally reset or adjust, e.g., revert to previous valid crop
        // For now, we'll allow it.
    }
    this.updateAndPreview(); // Ensure final preview is rendered
    // The blob will be generated when "Apply Crop & Filter" is clicked
  }
  // --- End Dragging Logic ---


  updateAndPreview(): void {
    if (!this.originalImage || !this.ctx) return;
    this.updateCropVisualizer();
    this.applyTransformations(false); // false: don't update blob, just URL for preview
    this.cdr.detectChanges();
  }

  applyCropAndFilter(): void {
    if (!this.originalImage || !this.ctx) return;
    if (this.cropConfig.width <= 0 || this.cropConfig.height <= 0) {
        this.uploadMessage = "Cannot apply with zero width or height crop.";
        console.warn("Cannot apply with zero width or height crop.");
        return;
    }
    this.updateCropVisualizer();
    this.applyTransformations(true); // true: update blob for upload
  }

  private updateCropVisualizer(): void {
    if (!this.originalImage || !this.originalImagePreviewRef || !this.showCropVisualizer || this.scaleX === 0 || this.scaleY === 0) {
      this.cropVisualizerStyle = { left: 0, top: 0, width: 0, height: 0 }; // Hide if not ready
      return;
    }
    this.cropVisualizerStyle = {
      left: this.cropConfig.x / this.scaleX,
      top: this.cropConfig.y / this.scaleY,
      width: this.cropConfig.width / this.scaleX,
      height: this.cropConfig.height / this.scaleY,
    };
  }

  private applyTransformations(generateBlob: boolean): void {
    if (!this.originalImage || !this.ctx) {
      console.error("Original image or canvas context not available.");
      this.processedImageURL = null; this.processedImageBlob = null;
      return;
    }

    const canvas = this.canvasRef.nativeElement;
    let { x, y, width, height } = this.cropConfig;

    // Ensure crop values are valid and within original image bounds
    x = Math.max(0, Math.round(x));
    y = Math.max(0, Math.round(y));
    width = Math.max(1, Math.round(width));
    height = Math.max(1, Math.round(height));

    if (x >= this.originalImage.naturalWidth || y >= this.originalImage.naturalHeight) {
        console.warn("Crop start point is outside the image.");
        this.processedImageURL = null; this.processedImageBlob = null;
        return;
    }

    if (x + width > this.originalImage.naturalWidth) {
      width = this.originalImage.naturalWidth - x;
    }
    if (y + height > this.originalImage.naturalHeight) {
      height = this.originalImage.naturalHeight - y;
    }

    if (width <= 0 || height <= 0) {
      console.warn("Crop dimensions are invalid after clamping. Width/Height became <=0.");
      this.processedImageURL = null; this.processedImageBlob = null;
      return;
    }

    canvas.width = width;
    canvas.height = height;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.drawImage(this.originalImage, x, y, width, height, 0, 0, width, height);

    if (this.applyGrayscaleFilter) {
      // ... (grayscale filter logic remains the same)
      const imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; data[i + 1] = avg; data[i + 2] = avg;
      }
      this.ctx.putImageData(imageData, 0, 0);
    }

    this.processedImageURL = canvas.toDataURL(this.outputFormat, this.outputFormat === 'image/jpeg' ? this.jpegQuality : undefined);

    if (generateBlob) {
      canvas.toBlob(
        (blob) => {
          this.processedImageBlob = blob;
          if (blob) {
            console.log(`Image processed and ready for upload. Size: ${(blob.size / 1024).toFixed(2)} KB, Type: ${blob.type}`);
            this.uploadMessage = `Processed. Size: ${(blob.size / 1024).toFixed(2)} KB. Ready to upload.`;
          } else {
            console.error("Failed to create blob from canvas.");
            this.uploadMessage = "Error creating image blob.";
          }
        },
        this.outputFormat,
        this.outputFormat === 'image/jpeg' ? this.jpegQuality : undefined
      );
    }
  }

  uploadImage(): void {
    // ... (uploadImage function remains the same)
    if (!this.processedImageBlob) {
      this.uploadMessage = 'No processed image to upload. Please apply changes first.';
      return;
    }
    this.uploadMessage = 'Uploading...';
    const formData = new FormData();
    const fileName = `processed_image.${this.outputFormat.split('/')[1]}`;
    formData.append('file', this.processedImageBlob, fileName);
    const uploadURL = 'http://localhost:8001/files/ocr';
    this.http.post(uploadURL, formData).subscribe({
      next: (response) => {
        console.log('Upload successful', response);
        this.uploadMessage = 'Upload successful! Server response: ' + JSON.stringify(response);
      },
      error: (error) => {
        console.error('Upload failed', error);
        this.uploadMessage = `Upload failed: ${error.message}. Check console and ensure server is running.`;
      }
    });
  }
}