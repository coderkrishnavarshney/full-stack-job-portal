import { Request, Response } from 'express';
import {
  createJob,
  findJob,
  findJobs,
  updateJob,
  deleteJob
} from '../services/job.service';
import { JobDocument } from '../models/job.model';
import log from '../utils/logger';

export async function createJobHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const userId = res.locals.user._id;
    const job = await createJob({ ...req.body, employer: userId });
    return res.status(201).json(job);
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({ message: 'Error creating job' });
  }
}

export async function getJobsHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const filters = req.query;
    const jobs = await findJobs(filters);
    return res.status(200).json(jobs);
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({ message: 'Error fetching jobs' });
  }
}

// Other handlers (updateJobHandler, getJobHandler, deleteJobHandler) follow similar patterns