import { Schema, model } from 'mongoose';
import { IQuestion } from './interfaces';

const questionSchema = new Schema<IQuestion>(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

export default model<IQuestion>('Question', questionSchema);