var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var fs = require('fs');

let counter = 0;


io.on('connection', (socket) => {
    console.log('User Online');

    socket.on('canvas-data', (data) => {
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
      });
})


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