import { Router } from 'express';

const router = Router();

router.get('/currentuser', async (req, res) => {
  res.status(200).send({ user: req.currentUser || null });
});

export { router as currentUserRouter };