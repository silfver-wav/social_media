import React from 'react';
import io from 'socket.io-client';

import './Board.css';

class Board extends React.Component {

    timeout;
    socket = io.connect("http://localhost:3000");

    ctx;

    constructor(props) {
        super(props);
        this.state = {
            imageList: []
        };

        this.socket.on("canvas-data", function(data) {
            var root = this;
            var image = new Image();
            var canvas = document.querySelector('#board');
            var ctx = canvas.getContext('2d');
            image.onload = function() {
                ctx.drawImage(image, 0, 0);

                root.isDrawing = false;
            };
            image.src = data;
        })
    }

    componentDidMount() {
        this.drawOnCanvas();

        this.socket.on('image-list', imageList => {
            // update the state with the list of available images
            this.setState({ imageList });
          });
    }

    componentWillReceiveProps(newProps) {
        this.ctx.strokeStyle = newProps.color;
        this.ctx.lineWidth = newProps.size;
    }

    drawOnCanvas() {
        var canvas = document.querySelector('#board');
        this.ctx = canvas.getContext('2d');
        var ctx = this.ctx;
    
        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));
    
        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};
    
        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;
    
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);
    
    
        /* Drawing on Paint App */
        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.props.color;
    
        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);
    
        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);
    
        var root = this;
        var onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();
            
            
            //Set timeout to only send data to other users after no brush-stroke has been made within 1 second (1000ms)
            if(root.timeout !== undefined) clearTimeout(root.timeout);
            root.timeout = setTimeout(function() {
                console.log("Data have not been sent");
                var base64ImageData = canvas.toDataURL("image/png");
                //console.log(base64ImageData);
                root.socket.emit("canvas-data", base64ImageData);
                console.log("Data have been sent");
            }, 1000)
        };
    }

    handleSaveClick = () => {

        var root = this;
        var canvas = document.getElementById('board');

        // get the data URL of the canvas image
        var dataURL = canvas.toDataURL("image/png");

        // send the dataURL to the server
        root.socket.emit('save-image', dataURL);
    }


    handleLoadClick = () => {
        var root = this;
        
      
        // request the list of available images from the server
        root.socket.emit('request-image-list');
        console.log("Requested image list");
      
        // listen for the image list response from the server
        root.socket.on('image-list', function(imageList) {
            // display the list of available images to the user
            // (e.g. using a select dropdown or list of clickable items)
            let counter = 0;
            imageList.forEach((imageName) => {
              console.log("#" + counter++ + " : " + imageName);
            
            });
          });

        // listen for the selected image from the user
        root.socket.on('select-image', function(selectedImage) {
          // request the selected image from the server
          root.socket.emit('request-image', selectedImage);
        });
      
        // listen for the image data from the server
        root.socket.on('image-data', function(imageData) {
          // decode the image data and draw it on the canvas
        });
      };


    render() {
        return (
          <div className="sketch" id="sketch">
            <canvas className="board" id="board"> </canvas>
            <div className="button-container" id="buttons">
              <button type="button" onClick={this.handleSaveClick}> Save </button>
              <button type="button" onClick={this.handleLoadClick}> Load </button>
              <select onChange={this.handleSelectChange}>
                {this.state.imageList.map((imageName, index) => (
                    <option key={index} value={imageName}>{imageName}</option>
                ))}
                </select>
            </div>
          </div>
        )
      }
}

export default Board