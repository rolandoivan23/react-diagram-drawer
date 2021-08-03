// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'

import  Figura  from '../components/Figura'
import  Rectangulo  from '../components/Rectangulo'
import  FigurePicker  from '../components/FigurePicker'
import  ResizingControls  from '../components/ResizingControls'

class PaintCanvas extends React.Component{
  constructor(props){
    super(props)
    this.figures = [];
    this.movingFigure = false;
  }

  componentDidMount(){
    this.setCanvas();
    this.setCursor();
    this.setDefaultFigure();

    this.mountFiguresPicker();
    this.mountResizeControls();

    this.canvas.addEventListener("mousemove", this.handlerMouseMove);
    this.canvas.addEventListener('mousedown', this.handlerMouseDown);
    this.canvas.addEventListener('mouseup', this.handlerMouseUp);
    this.canvas.addEventListener('dblclick', this.handlerMouseDblClick);
  }

  cursorInFigure(figura, cursorX, cursorY){
    if (cursorX > figura.puntoInicialX && cursorX < (figura.puntoInicialX + figura.width) &&
       (cursorY > figura.puntoInicialY && cursorY < (figura.puntoInicialY + figura.height))){
         
        this.figureSelected = figura;
        return true;
    }

    return false;
  }

  isCursorInsideAnyFigure(figures, cursorX, cursorY){
    for(let figura of figures){
      //console.log(this.figureSelected.puntoInicialX, figura.puntoInicialY, figura.width, figura.height, cursorX, cursorY);
      if(this.cursorInFigure(figura, cursorX, cursorY))
      {
        return true;
      }
    }
    return false;
  }

  addFigures(figure){
    if(figure instanceof Figura){
      this.figures.push(figure);
      figure.number = this.figures.length;
    }
  }

  setCursorType(type = 'default'){
    this.cursorElement.style.cursor = type;
  }

  inResizePoint(cursorX, cursorY){
    for(let figura of this.figures){
  
      if(cursorX == figura.width + figura.puntoInicialX ){
        this.resizingSide = 'right';
        this.cursorElement.style.cursor = "col-resize";
        this.figureSelected = figura;
        return true;  
      }else if(cursorX == figura.puntoInicialX){
        this.resizingSide = 'left';
        this.cursorElement.style.cursor = "col-resize";
        return true;
      }else if(cursorY == figura.height + figura.puntoInicialY ){
        this.resizingSide = 'bottom';
        this.cursorElement.style.cursor = "ns-resize";
        return true;
      }else if(cursorY == figura.puntoInicialY ){
        this.resizingSide = 'top';
        this.cursorElement.style.cursor = "ns-resize";
        return true;
      } else{     
        this.resizingSide = null;
        this.cursorElement.style.cursor = "default";
      }
    }
    return false;
    
  }
  
  
  //Handlers

  handlerMouseMove = (e) => {
    //Mejora el rendimiento para no tener que revisar si esta el cursor dentro de una figura por 
    //que el hecho de que se este moviendo nos idica que si esta el cursor en una figura
    if(!this.movingFigure){
      this.insiedFigure  = this.isCursorInsideAnyFigure(this.figures, 
                                                    e.offsetX, 
                                                    e.offsetY);
    }

    //NO se está redimensionando y el cursor esta dentro de una figura o ya se está moviendo una figura
    if(!this.resizingFigure && (this.insiedFigure || this.movingFigure)){
      
      if(!this.movingFigure){
        this.setCursorType('move');
        this.figureSelected.selectToMove();
      }else{
        this.cntx.strokeStyle  = 'red';
        this.figureSelected.move(e.offsetX, e.offsetY);
        this.paintAllFigures();
      }
    //Se esta redimensionando o el cursor esta en un punto del contorno de la figura.
    }else if(this.resizingFigure || this.inResizePoint(e.offsetX, e.offsetY)){
      if(this.resizingFigure)
        this.figureSelected.resize(e.offsetX, e.offsetY, this.resizingSide);
    }else{
      this.setCursorType();  
      if(this.figureSelected)
        this.figureSelected.repaint("#111");
    }
  }

  handlerMouseDown = (e) => { 
    if(this.insiedFigure){
      this.movingFigure = true;
    }else if(this.resizingSide){
      this.resizingFigure = true;
      this.figureSelected.startResize();
    }
  }

  handlerMouseUp = (e) => { 
    if(this.movingFigure && !this.isCursorInsideAnyFigure(this.figures, e.offsetX, e.offsetY)){
      this.figureSelected.repaint("#111");
      this.movingFigure = false;
      this.paintAllFigures();//With this avoid the cuted figures
    }else if(this.resizingFigure){
      this.resizingFigure = false;
      this.figureSelected.endResize();
      this.paintAllFigures();//With this avoid the cuted figures
    }
  }

  handlerMouseDblClick = e => {
    this.movingFigure = false;
    this.figureSelected.rotate();
  }

  setCanvas(){
    this.canvas = document.getElementById('paint-canvas');
    this.cntx = this.canvas.getContext("2d");
    this.cntx.lineWidth = 1;
  }

  setCursor(){
    this.cursorElement = document.getElementsByTagName("body")[0]; 
  }

  setDefaultFigure(){
    const figura = new Rectangulo(this.canvas);
    this.addFigures(figura);
    figura.paint(50,50,);
  }

  mountFiguresPicker(){
    ReactDOM.render(
      <FigurePicker canvasinstance={this}/>,
      document.querySelector('#figure-selector-container')
    );
  }

  mountResizeControls(){
    ReactDOM.render(
      <ResizingControls canvasinstance={this}/>,
      document.querySelector('#resizing-controls-container')
    );
  }

  //Fin handlers

  

  paintAllFigures(){
    this.cntx.clearRect(0,0,this.width, this.height);
    for(let figure of this.figures)
      figure.repaint();
  }
	
  render(){
    return (
      <div>
        <div id="main-container">
          <div id="figure-selector-container">
  
          </div>
          <div id="resizing-controls-container">
  
          </div>
        </div>      
        <canvas id="paint-canvas" width={this.props.width} height={this.props.height}></canvas>
      </div>
    ); 
    
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
      ( 
        <PaintCanvas width="1000px" height="500px"/>
      ),
    document.body.appendChild(document.createElement('div')),
  )
})



