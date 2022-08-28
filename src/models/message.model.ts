import { Schema, SchemaTypes, model } from 'mongoose';
import { IMessage } from './interfaces';

const messageSchema = new Schema<IMessage>(
  {
    userId: {
      type: String,
      required: true
    },
    agentId: {
      type: SchemaTypes.ObjectId,
      ref: 'Agent'
    },
    body: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    reply: {
      type: String
    },
    replied: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      default: 'uncategorized'
    }
  },
  { timestamps: true }
);

export default model<IMessage>('Message', messageSchema);
