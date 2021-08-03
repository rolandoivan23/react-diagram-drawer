import React from "react"
import PropTypes from "prop-types"
class Figura  {
  
  constructor(canvas){
    this.canvas = canvas;
    this.paint_area = canvas.getContext('2d');
    this.number = -1;
  }

  paint(){
    this.paint_area.strokeRect(0,0,100,100);
    this.setPuntoInicialX(0);
    this.setPuntoInicialY(0);
    this.width = 100;
    this.height = 100;
  }

  repaint(color){
    let tmpColor = this.paint_area.strokeStyle;
    if(color != null)
      this.paint_area.strokeStyle = color;
    
    this.paint_area.clearRect(this.puntoInicialX, this.puntoInicialY, this.width, this.height); 
    this.paint(this.puntoInicialX,
                               this.puntoInicialY,
                               this.width,
                               this.height
    );
    this.paint_area.strokeStyle = tmpColor;
  }

  rotate(){
    
  }

  selectToMove(){
    this.clear();
    this.repaint("red");
  }

  move(x,y){
    this.clear();
    this.setPuntoInicialX(x);
    this.setPuntoInicialY(y);
  }

  startResize(){
    this.resizeState = {
      x: this.puntoInicialX,
      y: this.puntoInicialY,
      width: this.width,
      height: this.height
    }
  }

  endResize(){
    this.resizeState = null;
  }

  resize(x,y,side){
    if(this.resizeState){
      this.clear()
      switch(side){
        case 'right': this.paint(this.puntoInicialX,
                                  this.puntoInicialY,
                                  x -  this.puntoInicialX, 
                                  this.height);
                      break;
        case 'left': this.paint(x,
                                  this.puntoInicialY,
                                  this.resizeState.width - (x - this.resizeState.x), 
                                  this.height);
                      break;
  
        case 'top':  this.paint(this.puntoInicialX,
          y,
          this.width, 
          this.resizeState.height - (y - this.resizeState.y ));
          break;
  
        case 'bottom':  this.paint(this.puntoInicialX,
          this.puntoInicialY,
          this.width, 
          y - this.puntoInicialY);
                break;
      }
    }

  }

  setPuntoInicialX(x){
    this.puntoInicialX = x; 
  }

  setPuntoInicialY(y){
    this.puntoInicialY = y;
  }
}

export default Figura
