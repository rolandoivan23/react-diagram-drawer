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

  setPuntoInicialX(x){
    this.puntoInicialX = x; 
  }

  setPuntoInicialY(y){
    this.setPuntoInicialY = y;
  }
}

export default Figura
