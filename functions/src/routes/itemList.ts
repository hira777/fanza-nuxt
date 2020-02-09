/* eslint-disable @typescript-eslint/camelcase */

import * as functions from 'firebase-functions';
import { Router } from 'express';
import axios from 'axios';

const router = Router();

const url = `https://api.dmm.com/affiliate/v3/ItemList`;

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(url, {
      params: {
        api_id: functions.config().fanza_api.id,
        affiliate_id: functions.config().fanza_api.affiliate_id,
        site: 'FANZA'
      }
    });
    res.json(response.data.result);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

export default router;
