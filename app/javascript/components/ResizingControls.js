import React from "react"
import PropTypes from "prop-types"
class ResizingControls extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {noFigure: 1, x:0, y: 0, w:200, h:50};
    this.canvas = props.canvasinstance;
  }

  redimensionar(){
    let figure = this.canvas.figures[this.state.noFigure - 1]
    figure.clear();
    figure.paint(this.state.x,this.state.y, this.state.w, this.state.h);
    
  }
  
  render () {
    return (
      <React.Fragment>
        <div>
          <b>Redimensionar</b>
        </div>
        <input type="text" placeholder="No. figura"
               value={this.state.noFigure}  
               onChange={ e => this.setState({noFigure: e.target.value})} 
        />
        <input type="text" placeholder="X punto inicial" value={this.state.x} />
        <input type="text" placeholder="Y punto inicial" value={this.state.y}/>
        <input type="text" placeholder="width" value={this.state.w}/>
        <input type="text" placeholder="height" value={this.state.h} onChange={ e => this.setState({h: e.target.value})}/>
        <button onClick={ e => this.redimensionar(this.state.noFigure) }>OK</button>
      </React.Fragment>
    );
  }
}

export default ResizingControls
