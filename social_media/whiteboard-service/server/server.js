var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var fs = require('fs');

let counter = 0;
let canvasData;


io.on('connection', (socket) => {
    console.log('User Online');

    socket.emit('canvas-data', canvasData);

    socket.on("clear-canvas", () => {
        // clear the server's canvas state
        canvasData = [];
      });

    socket.on('canvas-data', (data) => {
        console.log(data);
        canvasData = data;
        socket.broadcast.emit('canvas-data', data);
    })
    socket.on('save-image', (dataURL) => {
    
        // generate a unique file name
        const fileName = `whiteboard-${Date.now()}-${counter}.png`;
        counter++;
        // specify the path where you want to save the file
        const filePath = `./saved_images/${fileName}`;

        // convert the dataURL to a buffer
        const buffer = Buffer.from(dataURL.split(',')[1], 'base64');

        // write the buffer to the file
        fs.writeFile(filePath, buffer, (error) => {
            if (error) {
            console.error(error);
            } else {
            console.log(`Saved image to ${filePath}`);
            }
        });
    })
    socket.on('request-image-list', async () => {
        // get the list of available images from the filesystem
        const imageList = await getImageList();
        // send the list of images back to the client
        console.log("This is the imageList sent back to the client");
        console.log(imageList);
        socket.emit('image-list', imageList);
      })
      socket.on('request-image', async (selectedImage) => {
        try {
          // read the selected image from the filesystem
          console.log(selectedImage);
          const imageData = await readImage(selectedImage);
          const base64ImageData = imageData.toString('base64');
          console.log("This is the base65imageData pulled from the server");
          console.log(base64ImageData);
          // send the image data back to the client
          socket.emit('image-data', base64ImageData);
        } catch (error) {
          console.error(error);
        }
      });  
})

  
async function readImage(imageName) {
    return new Promise((resolve, reject) => {
      fs.readFile(`./saved_images/${imageName}`, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

async function getImageList() {
    try {
      const fileNames = await new Promise((resolve, reject) => {
        fs.readdir('./saved_images/', (error, fileNames) => {
          if (error) {
            reject(error);
          } else {
            resolve(fileNames);
          }
        });
      });
      const imageFileNames = fileNames.filter(fileName => fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg'));
      return imageFileNames;
    } catch (error) {
      console.error(error);
    }
  }

var server_port = process.env.YOUR_PORT || process.env.PORT || 5001;
http.listen(server_port, () => {
    console.log("Started on : " + server_port);
})