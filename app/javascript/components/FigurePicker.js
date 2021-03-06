import React from "react"
import Rectangulo from "./Rectangulo";
import Circulo from "./Circulo";
import Diamon from "./Diamon";
import Triangle from "./Triangle";

class FigurePicker extends React.Component {

  constructor(props){
    super(props)
    this.availableFigures = ['Rectangulo', 'Circle', 'Diamon', 'Triangle'];
    this.canvasComponent = props.canvasinstance;
    this.figuresClasses = {
      'Rectangulo': Rectangulo,
      'Circle': Circulo,
      'Diamon': Diamon,
      'Triangle': Triangle
    }
  }

  add(figureClass){
    const figura = new this.figuresClasses[figureClass](this.canvasComponent.canvas);
    this.canvasComponent.addFigures(figura);
    figura.paint(20,20,80,150);
  }

  render () {
    return (
      <React.Fragment>
        <strong>Figuras:</strong>
        <div style={{border: '1px solid #111'}}>
          {this.availableFigures.map(
            figure => <button onClick={()=> this.add(figure) } style={{color:"red", cursor:'pointer'}} key={figure}> {figure} </button>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default FigurePicker
