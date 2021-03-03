//requires
const cors = require('cors')
const express = require('express')
const path = require('path')
const server = express()
const helmet = require("helmet")
const compression = require('compression')

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["* 'unsafe-inline'"],
      imgSrc:["* 'self' data: https:"],
    },
  })
);
server.use(compression());

//serving static files
server.use(express.static(path.join(__dirname, 'build')));

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//listening to the port
const port = process.env.PORT || 5000
server.listen(port, () => console.log(`Listening on port ${port}...`))
