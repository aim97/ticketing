import { Router } from 'express';
import httpStatus from 'http-status';

const router = Router();

router.post('/logout', async (req, res) => {
  req.session = null;

  res.status(httpStatus.OK).json({});
});

export { router as logoutRouter };