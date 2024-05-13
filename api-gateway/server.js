const express = require('express');
//const routes = require('./routes/routes');
const httpProxy = require('http-proxy-middleware');

const app = express();

const authProxy = httpProxy.createProxyMiddleware({
  target: 'http://localhost:7070',
  changeOrigin: true,
  //pathRewrite:{ '^/gateway/auth': '/auth' }
})

const adminProxy = httpProxy.createProxyMiddleware({
  target: 'http://localhost:6060',
  changeOrigin: true,
  //pathRewrite:{ '^/gateway/auth': '/auth' }
})

const instructorProxy = httpProxy.createProxyMiddleware({
  target: 'http://localhost:8080',
  changeOrigin: true,
  //pathRewrite:{ '^/gateway/auth': '/auth' }
})

const learnerProxy = httpProxy.createProxyMiddleware({
  target: 'http://localhost:9090',
  changeOrigin: true,
  //pathRewrite:{ '^/gateway/auth': '/auth' }
})

const courseProxy = httpProxy.createProxyMiddleware({
  target: 'http://localhost:5050',
  changeOrigin: true,
  //pathRewrite:{ '^/gateway/auth': '/auth' }
})

const paymentProxy = httpProxy.createProxyMiddleware({
  target: 'http://localhost:4040',
  changeOrigin: true,
  //pathRewrite:{ '^/gateway/auth': '/auth' }
})

const notificationProxy = httpProxy.createProxyMiddleware({
  target: 'http://localhost:2020',
  changeOrigin: true,
  //pathRewrite:{ '^/gateway/auth': '/auth' }
})

app.use('/gateway/authProxy', authProxy)
app.use('/gateway/adminProxy', adminProxy)
app.use('/gateway/instructorProxy', instructorProxy)
app.use('/gateway/learnerProxy', learnerProxy)
app.use('/gateway/courseProxy', courseProxy)
app.use('/gateway/paymentProxy', paymentProxy)
app.use('/gateway/notificationProxy', notificationProxy)

//routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;