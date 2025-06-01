import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface DrawingData {
  strokes: { color: string; lineWidth: number; points: { x: number; y: number }[] }[];
  width: number;
  height: number;
  backgroundImage?: string;  // Data URL of the background image
}

enum DrawingMode {
  DRAW,
  ERASE
}

@Component({
  selector: 'app-drawing-canvas',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './drawing-canvas.component.html',
  styleUrl: './drawing-canvas.component.css'
})
export class DrawingCanvasComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D;
  
    drawing: boolean = false;
    strokes: { color: string; lineWidth: number; points: { x: number; y: number }[] }[] = [];
    currentStroke: { color: string; lineWidth: number; points: { x: number; y: number }[] } | null = null;
  
    // Configuration options (bind these to UI elements for customization)
    currentColor: string = '#000000';
    currentLineWidth: number = 2;
    //isErasing: boolean = false; // Remove boolean eraser flag
    eraserWidth: number = 10;
    currentMode: DrawingMode = DrawingMode.DRAW; // Drawing Mode
    DrawingMode = DrawingMode; // Expose enum to the template
  
    // Undo/Redo
    undoStack: { color: string; lineWidth: number; points: { x: number; y: number }[] }[][] = [];
    redoStack: { color: string; lineWidth: number; points: { x: number; y: number }[] }[][] = [];
  
  
    // Data storage (replace with your actual persistence logic)
    drawingData: DrawingData | null = null;
    localStorageKey: string = 'drawingData'; // Key for storing in localStorage
  
    // Observer to detect window resize to update canvas dimensions.
    resizeObserver!: ResizeObserver;
  
    // Background Image
    backgroundImage: string | null = null;
    imageElement: HTMLImageElement | null = null;
  
    constructor() { }
  
    ngOnInit(): void {
      // Load saved data if it exists
      this.loadDrawing();
    }
  
    ngAfterViewInit(): void {
      this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
      this.resizeCanvas();
      this.redrawCanvas();
  
      // Observe changes to parent element size to resize canvas.
      this.resizeObserver = new ResizeObserver(() => {
        this.resizeCanvas();
      });
      this.resizeObserver.observe(this.canvasRef.nativeElement.parentElement!);
    }
  
    ngOnDestroy(): void {
      this.resizeObserver.disconnect();
    }
  
  
    // --- Canvas Manipulation ---
  
    resizeCanvas(): void {
      // Set canvas dimensions based on available space
      const parent = this.canvasRef.nativeElement.parentElement;
      if (parent) {
        this.canvasRef.nativeElement.width = parent.clientWidth;
        this.canvasRef.nativeElement.height = parent.clientHeight;
  
        if (this.drawingData) {
          //Maintain the drawing dimensions if data loaded.
          this.canvasRef.nativeElement.width = this.drawingData.width;
          this.canvasRef.nativeElement.height = this.drawingData.height;
        }
  
  
        this.redrawCanvas(); // Redraw after resizing
      } else {
        console.warn('Canvas parent element not found.');
      }
    }
  
  
    startDrawing(e: MouseEvent | TouchEvent): void {
      this.drawing = true;
      const canvasRect = this.canvasRef.nativeElement.getBoundingClientRect();
      let x: number, y: number;
  
      if (e instanceof MouseEvent) {
        x = e.clientX - canvasRect.left;
        y = e.clientY - canvasRect.top;
      } else { // TouchEvent
        const touch = e.touches[0];
        x = touch.clientX - canvasRect.left;
        y = touch.clientY - canvasRect.top;
      }
  
      let strokeColor = this.currentColor;
      let strokeWidth = this.currentLineWidth;
  
      if (this.currentMode === DrawingMode.ERASE) {
        strokeColor = 'white';
        strokeWidth = this.eraserWidth;
      }
  
      this.currentStroke = {
        color: strokeColor,
        lineWidth: strokeWidth,
        points: [{ x, y }]
      };
    }
  
    draw(e: MouseEvent | TouchEvent): void {
      if (!this.drawing) return;
  
      const canvasRect = this.canvasRef.nativeElement.getBoundingClientRect();
      let x: number, y: number;
  
      if (e instanceof MouseEvent) {
        x = e.clientX - canvasRect.left;
        y = e.clientY - canvasRect.top;
      } else { // TouchEvent
        const touch = e.touches[0];
        x = touch.clientX - canvasRect.left;
        y = touch.clientY - canvasRect.top;
      }
  
  
      if (this.currentStroke) {
        this.currentStroke.points.push({ x, y });
        this.redrawCanvas();
      }
    }
  
    endDrawing(): void {
      if (!this.drawing) return;
      this.drawing = false;
  
      if (this.currentStroke) {
        this.strokes.push(this.currentStroke);
        this.currentStroke = null;
         // Add to undo stack
        this.undoStack.push(JSON.parse(JSON.stringify(this.strokes)));
        this.redoStack = []; // Clear redo stack on new action
      }
      this.saveDrawing(); // Save after each stroke
    }
  
  
    redrawCanvas(): void {
      this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
  
      // Draw background image if it exists
      if (this.backgroundImage && this.imageElement) {
        this.ctx.drawImage(this.imageElement, 0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
      }
  
      // Redraw existing strokes
      for (const stroke of this.strokes) {
        this.drawStroke(stroke);
      }
  
      // Redraw the current stroke (if any)
      if (this.currentStroke) {
        this.drawStroke(this.currentStroke);
      }
    }
  
    drawStroke(stroke: { color: string; lineWidth: number; points: { x: number; y: number }[] }): void {
      this.ctx.strokeStyle = stroke.color;
      this.ctx.lineWidth = stroke.lineWidth;
      this.ctx.lineCap = 'round'; // Optional: Round line endings
  
      this.ctx.beginPath();
      this.ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
  
      for (let i = 1; i < stroke.points.length; i++) {
        this.ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      this.ctx.stroke();
    }
  
  
    // --- Data Persistence ---
  
    saveDrawing(): void {
      this.drawingData = {
        strokes: this.strokes,
        width: this.canvasRef.nativeElement.width,
        height: this.canvasRef.nativeElement.height,
        backgroundImage: this.backgroundImage || undefined // Save background image
      };
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.drawingData));
    }
  
    loadDrawing(): void {
      const savedData = localStorage.getItem(this.localStorageKey);
      if (savedData) {
        this.drawingData = JSON.parse(savedData);
        this.strokes = this.drawingData?.strokes ?? this.strokes; // Restore strokes
        this.undoStack.push(JSON.parse(JSON.stringify(this.strokes)));//load the saved strokes to the undo Stack
  
        //Restore background image
        if (this.drawingData?.backgroundImage) {
          this.setBackgroundImage(this.drawingData.backgroundImage);
        }
        // Do not redrawCanvas here! We'll redraw in ngAfterViewInit
      }
    }
  
    clearDrawing(): void {
      this.strokes = [];
      this.currentStroke = null;
      this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
      localStorage.removeItem(this.localStorageKey);
      this.drawingData = null;
      this.undoStack = [];
      this.redoStack = [];
      this.backgroundImage = null;
      this.imageElement = null;
    }
  
    // --- Helper function to download the image ---
    downloadImage(): void {
      const imageName = prompt("Please enter the image name:", "drawing");
      if (imageName) {
        const dataURL = this.canvasRef.nativeElement.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = imageName + ".png"; // Set the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  
    // --- Undo/Redo ---
    undo(): void {
  
      if (this.undoStack.length > 1) {
        this.redoStack.push(this.undoStack.pop()!); // Move current state to redo
        this.strokes = JSON.parse(JSON.stringify(this.undoStack[this.undoStack.length - 1]));//Set strokes to the previous strokes
  
        this.redrawCanvas();
        this.saveDrawing(); // Optionally save after undo
      } else if (this.undoStack.length == 1) {
        //When only one item left just clear the canvas.
        this.redoStack.push(this.undoStack.pop()!);//Push cleared canvas to the redo stack
        this.strokes = [];
        this.redrawCanvas();
        this.saveDrawing(); // Optionally save after undo
      }
    }
  
    redo(): void {
  
      if (this.redoStack.length > 0) {
        this.undoStack.push(this.redoStack.pop()!); // Move state from redo to undo
        this.strokes = JSON.parse(JSON.stringify(this.undoStack[this.undoStack.length - 1]));//Set strokes to the redo strokes
        this.redrawCanvas();
        this.saveDrawing(); // Optionally save after redo
      }
    }
  
    // --- Toggle Eraser ---
    // toggleEraser(): void {
    //   this.isErasing = !this.isErasing;
    //   if (this.isErasing) {
    //     this.currentLineWidth = this.eraserWidth;
    //   }
    // }
  
    setDrawingMode(mode: DrawingMode): void {
      this.currentMode = mode;
    }
  
    // --- Background Image ---
    handleImageUpload(event: any): void {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.setBackgroundImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  
    setBackgroundImage(dataUrl: string): void {
      this.backgroundImage = dataUrl;
      this.imageElement = new Image();
      this.imageElement.onload = () => {
        this.redrawCanvas();
      };
      this.imageElement.src = dataUrl;
      this.saveDrawing();  // Save the background image
    }
  
    removeBackgroundImage(): void {
      this.backgroundImage = null;
      this.imageElement = null;
      this.drawingData!.backgroundImage = undefined;
      this.redrawCanvas();
      this.saveDrawing();
    }
  
  }