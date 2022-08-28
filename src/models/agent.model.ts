import { Schema, model } from 'mongoose';
import { IAgent } from './interfaces';

const agentSchema = new Schema<IAgent>(
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
      unique: true,
      required: true
    },
    activeMessageCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default model<IAgent>('Agent', agentSchema);