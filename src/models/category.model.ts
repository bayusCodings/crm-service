import { Schema, model } from 'mongoose';
import { ICategory } from './interfaces';

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true
    },
    priority: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default model<ICategory>('Category', categorySchema);
