import { Component, ViewChild, AfterViewInit, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the CanvasDrawComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})
export class CanvasDrawComponent implements AfterViewInit {

  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  lastX: number;
  lastY: number;
  currentColor : string = '#1abc9c';
  brushSize: number = 10;
  availableColors : any;

  constructor(public platform: Platform, public renderer: Renderer) {
    //console.log('Hello CanvasDrawComponent Component');
    this.availableColors = ['#1abc9c',"#3498db",'#9b59b6','#e67e22','#e74c3c' ];
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');
  }

  handleStart(ev) {
    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;
  }

  handleMove(ev) {
    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;

    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.moveTo(this.lastX,this.lastY);
    ctx.lineTo(currentX,currentY);
    ctx.closePath();
    ctx.strokeStyle = this.currentColor;
    ctx.lineWidth = this.brushSize;
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
  }

  handleEnd(ev) {
  }

  changeColor(color){
    this.currentColor = color;
  }

  changeSize(size){
    this.brushSize = size;
  }
}
