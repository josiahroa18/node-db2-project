const express = require('express');
const carRouter = require('./cars/carRouter');

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
server.use('/cars', carRouter);

server.listen(port, () => console.log(`Server running on port ${port}`));