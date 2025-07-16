import axios from 'axios';
import { Job, JobApplication } from '../types/job';

const API_URL = process.env.REACT_APP_API_URL;

export const getJobs = async (params: any): Promise<{
  jobs: Job[];
  totalPages: number;
  totalCount: number;
}> => {
  const response = await axios.get(`${API_URL}/jobs`, { params });
  return response.data;
};

export const getJob = async (id: string): Promise<Job> => {
  const response = await axios.get(`${API_URL}/jobs/${id}`);
  return response.data;
};

export const createJob = async (jobData: Partial<Job>): Promise<Job> => {
  const response = await axios.post(`${API_URL}/jobs`, jobData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const applyForJob = async (
  jobId: string,
  applicationData: Partial<JobApplication>
): Promise<JobApplication> => {
  const response = await axios.post(
    `${API_URL}/applications`,
    { jobId, ...applicationData },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
  return response.data;
};