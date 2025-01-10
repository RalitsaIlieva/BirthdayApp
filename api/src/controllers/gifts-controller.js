import express from 'express';
import giftsService from '../services/gifts-service.js';
import giftsData from '../data/gifts-data.js';
import { authMiddleware } from '../auth/auth-middleware.js';

const giftsController = express.Router();

giftsController
  .get('/', authMiddleware, async (req, res) => {
    const gifts = await giftsService.getGifts(giftsData)();
    if (!gifts) {
      return res.status(404).send([]);
    }

    res.status(200).send(gifts);
  })

export default giftsController;
