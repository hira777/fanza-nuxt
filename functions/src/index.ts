import * as functions from 'firebase-functions';
import { Nuxt } from 'nuxt';
import * as express from 'express';

import itemList from './routes/itemList';
import users from './routes/users';

const app = express();
const config = {
  dev: false,
  buildDir: '.nuxt',
  build: {
    publicPath: '/assets/'
  }
};
const nuxt = new Nuxt(config);

app.use('/api/itemList', itemList);
app.use('/api/users', users);
app.use(nuxt.render);
export const ssr = functions.https.onRequest(app);
