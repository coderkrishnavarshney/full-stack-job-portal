import { Router } from 'express';
import { validate } from '../middleware/validate';
import { createJobSchema, updateJobSchema, getJobsSchema } from '../schemas/job.schema';
import {
  createJobHandler,
  updateJobHandler,
  getJobHandler,
  getJobsHandler,
  deleteJobHandler
} from '../controllers/job.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';

const router = Router();

router.use(deserializeUser, requireUser);

router
  .route('/')
  .post(restrictTo('employer', 'admin'), validate(createJobSchema), createJobHandler)
  .get(validate(getJobsSchema), getJobsHandler);

router
  .route('/:jobId')
  .get(getJobHandler)
  .patch(restrictTo('employer', 'admin'), validate(updateJobSchema), updateJobHandler)
  .delete(restrictTo('employer', 'admin'), deleteJobHandler);

export default router;