//https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express
const http = require("http");
const path = require("path");
const fs = require("fs");

const express = require('express');
const app = express();

const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5500;

httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
  
app.get("/", express.static(path.join(__dirname, "./public")));



