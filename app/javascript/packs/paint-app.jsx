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

    // if(this.figureSelected){
    //   this.cntx.strokeStyle = "#111";
    //   this.figureSelected.clear();
    //   this.figureSelected.repaint();
    //   this.figureSelected = false;
    // }
    return false;
  }

  addFigures(figure){
    if(figure instanceof Figura)
      this.figures.push(figure);
  }

  inResizePoint(cursorX, cursorY){
    for(let figura of this.figures){
  
      if(cursorX == figura.width +figura.puntoInicialX ){
        this.resizingSide = 'right';
        this.cursorElement.style.cursor = "col-resize";
        this.figureSelected = figura;
        return true;  
      }else if(cursorX == figura.puntoInicialX){
        this.resizingSide = 'left';
        this.cursorElement.style.cursor = "col-resize";
        return true;
      }else if(cursorY == figura.height){
        this.resizingSide = 'bottom';
        this.cursorElement.style.cursor = "ns-resize";
        return true;
      }else if(cursorY == figura.puntoInicialY){
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

  componentDidMount(){
    this.canvas = document.getElementById('paint-canvas');
    this.cntx = this.canvas.getContext("2d");
    this.cntx.lineWidth = 1;
    this.cursorElement = document.getElementsByTagName("body")[0]; 
    const figura = new Rectangulo(this.canvas);
    this.figures.push(figura);
    figura.paint(50,50,);

    ReactDOM.render(
      <FigurePicker canvasinstance={this}/>,
      document.querySelector('#figure-selector-container')
    )

    ReactDOM.render(
      <ResizingControls/>,
      document.querySelector('#resizing-controls-container')
    )

    this.canvas.addEventListener("mousemove", (e) => {
      if(!this.movingFigure){
        this.insiedFigure  = this.isCursorInsideAnyFigure(this.figures, 
                                                      e.offsetX, 
                                                      e.offsetY);
      }

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
                                      this.tmpWidth - e.offsetX, 
                                      this.figureSelected.height);
                          break;
  
            case 'top':  this.figureSelected.paint(this.figureSelected.puntoInicialX,
              e.offsetY,
              this.figureSelected.width, 
              this.tmpHeight - e.offsetY );
              break;
  
            case 'bottom':  this.figureSelected.paint(this.figureSelected.puntoInicialX,
              this.figureSelected.puntoInicialY,
              this.figureSelected.width, 
              e.offsetY);
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



      //To repaint with original color

     

      
      
      // if(!this.insiedFigure && !this.resizingFigure && !this.movingFigure){
      //   // if(  (!this.resizingFigure && e.offsetX == this.tmpWidth) || (this.resizingFigure && e.offsetX > this.tmpWidth) ){
      //   this.inResizePoint();
      // }
      
    });

    this.canvas.addEventListener('mousedown', (e)=>{ 
      if(this.insiedFigure){
        this.movingFigure = true;
        
      }else if(this.resizingSide){
        this.resizingFigure = true;
        this.tmpWidth = this.figureSelected.width;
        this.tmpHeight = this.figureSelected.height;
      }
    
    });

    this.canvas.addEventListener('mouseup', (e)=>{ 
      if(this.movingFigure && !this.isCursorInsideAnyFigure(this.figures, e.offsetX, e.offsetY)){
        
        this.cntx.strokeStyle = "#111";
        this.figureSelected.clear();
        this.figureSelected.paint(e.offsetX,
          e.offsetY,
          this.figureSelected.width,
          this.figureSelected.height);
          //console.log("ox: ", e.offsetX, " oy:", e.offsetY, " x:", this.figureSelected.puntoInicialX, " y:", this.figureSelected.puntoInicialY);
        this.movingFigure = false;
      
      }else if(this.resizingFigure){
        this.resizingFigure = false;
      }
    });

  }
	
  render(){
    return (
      <div id="main-container">
        <div id="figure-selector-container">

        </div>
        <div id="resizing-controls-container">

        </div>
        <div>
          <canvas id="paint-canvas" width={this.props.width} height={this.props.height}></canvas>
        </div>
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



