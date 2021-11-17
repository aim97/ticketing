import { Router } from 'express';

const router = Router();

router.get('/currentuser', async (req, res) => {
  res.status(200).send(req.currentUser);
});

export { router as currentUserRouter };