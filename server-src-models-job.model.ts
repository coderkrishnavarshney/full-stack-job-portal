import mongoose, { Document, Schema } from 'mongoose';
import { UserDocument } from './user.model';

export interface JobDocument extends Document {
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  employmentType: string;
  skillsRequired: string[];
  experienceLevel: string;
  employer: UserDocument['_id'];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<JobDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
      required: true
    },
    skillsRequired: [{ type: String }],
    experienceLevel: {
      type: String,
      enum: ['entry', 'mid', 'senior', 'executive'],
      required: true
    },
    employer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

jobSchema.index({ title: 'text', description: 'text', company: 'text', skillsRequired: 'text' });

export const JobModel = mongoose.model<JobDocument>('Job', jobSchema);