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
    if(!this.movingFigure){
      this.insiedFigure  = this.isCursorInsideAnyFigure(this.figures, 
                                                    e.offsetX, 
                                                    e.offsetY);
    }

    //NO se está redimensionando y el cursor esta dentro de una figura o ya se está moviendo una figura
    if(!this.resizingFigure && (this.insiedFigure || this.movingFigure)){
      
      if(!this.movingFigure){
        this.figureSelected.clear();
        this.cursorElement.style.cursor = "move";
        this.figureSelected.repaint("red");
      }else{
        this.cntx.strokeStyle  = 'red';
        this.figureSelected.clear();
        this.figureSelected.paint(e.offsetX,
                  e.offsetY,
                  this.figureSelected.width,
                  this.figureSelected.height);
        this.paintAllFigures();
      }
    }else if(this.resizingFigure || this.inResizePoint(e.offsetX, e.offsetY)){

      if(this.resizingFigure){
        console.log(e.offsetX);
        this.figureSelected.clear()
        switch(this.resizingSide){
          case 'right': this.figureSelected.paint(this.figureSelected.puntoInicialX,
                                    this.figureSelected.puntoInicialY,
                                    e.offsetX -  this.figureSelected.puntoInicialX, 
                                    this.figureSelected.height);
                        break;
          case 'left': this.figureSelected.paint(e.offsetX,
                                    this.figureSelected.puntoInicialY,
                                    this.tmpWidth - (e.offsetX - this.tmpInicialX), 
                                    this.figureSelected.height);
                        break;

          case 'top':  this.figureSelected.paint(this.figureSelected.puntoInicialX,
            e.offsetY,
            this.figureSelected.width, 
            this.tmpHeight - (e.offsetY - this.tmpInicialY ));
            break;

          case 'bottom':  this.figureSelected.paint(this.figureSelected.puntoInicialX,
            this.figureSelected.puntoInicialY,
            this.figureSelected.width, 
            e.offsetY - this.figureSelected.puntoInicialY);
                  break;
        }
      
      }

    }else{
      this.cntx.strokeStyle = "#111";
      this.cursorElement.style.cursor = "default";  

      if(this.figureSelected){
        this.figureSelected.repaint("#111");
      }
    }
  }

  handlerMouseDown = (e) => { 
    if(this.insiedFigure){
      this.movingFigure = true;
    }else if(this.resizingSide){
      this.resizingFigure = true;
      this.tmpWidth = this.figureSelected.width;
      this.tmpHeight = this.figureSelected.height;
      this.tmpInicialX = this.figureSelected.puntoInicialX;
      this.tmpInicialY = this.figureSelected.puntoInicialY;
    }
  }

  handlerMouseUp = (e) => { 
    if(this.movingFigure && !this.isCursorInsideAnyFigure(this.figures, e.offsetX, e.offsetY)){
      this.cntx.strokeStyle = "#111";
      this.figureSelected.clear();
      this.figureSelected.paint(e.offsetX,
                                e.offsetY,
                                this.figureSelected.width,
                                this.figureSelected.height);
      this.movingFigure = false;
      this.paintAllFigures();//With this avoid the cuted figures
    }else if(this.resizingFigure){
      this.resizingFigure = false;
      this.paintAllFigures();//With this avoid the cuted figures
    }
  }













  componentDidMount(){
    this.canvas = document.getElementById('paint-canvas');
    this.cntx = this.canvas.getContext("2d");
    this.cntx.lineWidth = 1;
    this.cursorElement = document.getElementsByTagName("body")[0]; 
    const figura = new Rectangulo(this.canvas);
    this.addFigures(figura);
    figura.paint(50,50,);

    ReactDOM.render(
      <FigurePicker canvasinstance={this}/>,
      document.querySelector('#figure-selector-container')
    )

    ReactDOM.render(
      <ResizingControls canvasinstance={this}/>,
      document.querySelector('#resizing-controls-container')
    )

    this.canvas.addEventListener("mousemove", this.handlerMouseMove);//fin handler mouse move

    this.canvas.addEventListener('mousedown', this.handlerMouseDown);

    this.canvas.addEventListener('mouseup', this.handlerMouseUp);

  }

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



