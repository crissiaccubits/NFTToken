import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import morgan from 'morgan';

import connectServices from './services/customServices';
import env from './config/env';
import logger from './middleware/logger';
import routes from './routes/routes.js';
import corsEnabledURLs from './constants/corsUrls';
import corsOptionsDelegate from './middleware/corsHandler';
import errorHandler from './middleware/errorHandler.js';
import httpResponse from './models/httpResponseModel';

const app = express();

app.use(morgan('short', { stream: logger.stream }));

if (env.NODE_ENV === 'production') {
  if (env.ALLOW_DOMAIN) {
    const domains = env.ALLOW_DOMAIN.split(',');
    domains.forEach((domain) => corsEnabledURLs.push(domain.toLowerCase()));
  }
  app.use(cors(corsOptionsDelegate));
} else {
  app.use(cors());
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//!TO REMOVE
app.use('/', (req, res, next) => {
  logger.log({ level: 'debug', message: JSON.stringify(req.body) });
  next();
});

app.use('/api', routes);
app.use('/', async (req, res, next) => {
  res.send(new httpResponse(true));
});
app.use(errorHandler);

connectServices()
  .then(async () => {
    try {
      app.emit('ready');
    } catch (e) {
      logger.error(`Error in connecting ${e}`);
    }
  })
  .catch((e) => {
    logger.error(`Error connecting : ${e}`);
  });
  
module.exports = app;
