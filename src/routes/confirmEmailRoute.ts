import { Router } from 'express';
import { User } from '../entity/User';
import { redisClient } from '../redisClient';

const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  // if (id) console.log(id);
  let userId;
  redisClient.get(id, (err, key) => {
    if (err) throw err;
    // console.log('key got from redis', key);
    userId = key;
    if (userId) {
      User.update({ id: userId }, { confirmed: true })
        .then(() => {
          redisClient.del(id, () => {
            res.send('ok');
          });
        })
        .catch(() => res.status(400).send('Unable to confirm the user'));
    } else {
      res.status(400).send('Expired/Invalid Confirmation Link');
    }
  });
});

export default router;
