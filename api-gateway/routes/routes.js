const httpProxy = require('express-http-proxy');

const authServiceProxy = httpProxy('http://localhost:7000');
const adminServiceProxy = httpProxy('http://localhost:6060');
const instructorServiceProxy = httpProxy('http://localhost:8080');
const courseServiceProxy = httpProxy('http://localhost:5050');

function routes(app) {
  app.post('/auth/register', (req, res) => {
    authServiceProxy(req, res);
  })
  app.get('/auth/login', (req, res) => {
    authServiceProxy(req, res);
  })
}

module.exports = routes;