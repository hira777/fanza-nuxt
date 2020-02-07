import * as functions from 'firebase-functions';
import * as express from 'express';
import users from './routes/users';

const app = express();

app.use('/users', users);

export const api = functions.https.onRequest(app);
