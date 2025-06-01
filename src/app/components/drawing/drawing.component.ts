// import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

// @Component({
//   selector: 'app-drawing',
//   standalone: true,
//   imports: [],
//   templateUrl: './drawing.component.html',
//   styleUrl: './drawing.component.css'
// })
// export class DrawingComponent implements AfterViewInit {
//   @ViewChild('canvas', { static: false }) private canvas!: ElementRef<HTMLCanvasElement>;
//   private ctx!: CanvasRenderingContext2D;
//   private drawing = false;
//   private eraser = false;
//   private lastX: number = 0;
//   private lastY: number = 0;
//   private backgroundImage: HTMLImageElement = new Image();

//   ngAfterViewInit() {
//     this.ctx = this.canvas.nativeElement.getContext('2d');
//     this.ctx.lineWidth = 5;
//     this.ctx.lineJoin = 'round';
//     this.ctx.lineCap = 'round';

//     this.canvas.nativeElement.addEventListener('mousedown', this.startDrawing.bind(this));
//     this.canvas.nativeElement.addEventListener('mousemove', this.draw.bind(this));
//     this.canvas.nativeElement.addEventListener('mouseup', this.stopDrawing.bind(this));
//     this.canvas.nativeElement.addEventListener('mouseout', this.stopDrawing.bind(this));
//   }

//   // Start drawing when mouse is pressed
//   startDrawing(event: MouseEvent) {
//     this.drawing = true;
//     this.lastX = event.offsetX;
//     this.lastY = event.offsetY;
//   }

//   // Draw or erase based on the mode (drawing or eraser)
//   draw(event: MouseEvent) {
//     if (!this.drawing) return;

//     const currentX = event.offsetX;
//     const currentY = event.offsetY;

//     if (this.eraser) {
//       this.ctx.clearRect(currentX - 10, currentY - 10, 20, 20); // Erase area of 20px square
//     } else {
//       this.ctx.beginPath();
//       this.ctx.moveTo(this.lastX, this.lastY);
//       this.ctx.lineTo(currentX, currentY);
//       this.ctx.stroke();
//       this.ctx.closePath();
//     }

//     this.lastX = currentX;
//     this.lastY = currentY;
//   }

//   // Stop drawing when mouse is released or out of canvas
//   stopDrawing() {
//     this.drawing = false;
//   }

//   // Toggle between drawing and eraser mode
//   toggleEraser() {
//     this.eraser = !this.eraser;
//   }

//   // Clear the canvas
//   clearCanvas() {
//     this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
//     this.loadBackgroundImage(); // Reapply the background if needed
//   }

//   // Upload background image
//   onBackgroundImageUpload(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input?.files?.length) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         this.backgroundImage.src = e.target?.result as string;
//         this.backgroundImage.onload = () => {
//           this.loadBackgroundImage();
//         };
//       };
//       reader.readAsDataURL(input.files[0]);
//     }
//   }

//   // Load background image onto the canvas
//   private loadBackgroundImage() {
//     if (this.backgroundImage.src) {
//       this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
//     }
//   }
// }
