import React from "react"
import PropTypes from "prop-types"

import Figura from "./Figura"

class Rectangulo extends Figura  {

  constructor(canvas){
    super(canvas)
  }

  clear(){
    this.paint_area.clearRect(this.puntoInicialX - 1,
                              this.puntoInicialY - 1,
                              this.width + 2,
                              this.height + 2 );
  }


  paint(x,y, width = 200, height = 100){
    this.paint_area.strokeRect(x,y,width,height);
    this.setPuntoInicialX(x);
    this.setPuntoInicialY(y);
    this.width = width;
    this.height = height;
    this.paint_area.fillText(`${this.number}. ${this.width}X${this.height}`, x+5,y+10);
  }

  rotate(){
    this.clear();
    const tmpHeight = this.height;
    this.height = this.width;
    this.width = tmpHeight;
    this.repaint();
  }

 
}

export default Rectangulo
