import Figura from "./Figura"

class Circulo extends Figura {
  constructor(canvas){
    super(canvas)
  }

  clear(){
    this.paint_area.clearRect(this.puntoInicialX - 1,
                              this.puntoInicialY - 1,
                              this.width + 2,
                              this.height + 2 );
  }


  paint(x,y, width = 100, height = 100){
    this.paint_area.beginPath();
    this.paint_area.arc(x + (width/2), y + (width/2), width / 2, 0, 2 * Math.PI);
    this.paint_area.stroke();
    this.setPuntoInicialX(x);
    this.setPuntoInicialY(y);
    this.width = width;
    this.height = height;
    this.paint_area.fillText(`${this.number}. ${this.width}X${this.height}`, x+15,y+width/2);
  }
}

export default Circulo
