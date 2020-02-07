import { Router } from 'express';

const router = Router();
const users = [{ name: 'Alexandre' }, { name: 'Pooya' }, { name: 'Sébastien' }];

router.get('/', function(_, res) {
  res.json(users);
});

export default router;
