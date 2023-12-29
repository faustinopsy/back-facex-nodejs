const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const presencesRouter = require('./routes/presencesRouters');

const app = express();

const allowedOrigins = ['https://rest.faustinopsy.com', 'http://rest.faustinopsy.com'];
//const allowedOrigins = ['http://localhost:9000', 'localhost:9000'];
const corsOptions = {
  origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
          callback(null, true); 
      } else {
          callback(new Error('Origem não autorizada')); 
      }
  }
};

function corsErrorHandler(err, req, res, next) {
  if (err.message === 'Origem não autorizada') {
      res.status(403).json({ status: false , message: 'Acesso negado: origem não autorizada.' });
  } else {
      next(err); 
  }
}

app.use(cors(corsOptions));
app.use(corsErrorHandler);

app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
  
app.use(userRoutes);
app.use(presencesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
