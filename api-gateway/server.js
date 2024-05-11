const express = require('express');
const routes = require('./routes/routes');

const app = express();

app.use('/gateway', (req, res, next) => {
  req.url = '/gateway' + req.url;
  next();
});


routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
