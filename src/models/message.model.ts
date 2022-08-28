import { Schema, SchemaTypes, model } from 'mongoose';
import { IMessage } from './interfaces';

const messageSchema = new Schema<IMessage>(
  {
    userId: {
      type: String,
      required: true
    },
    agent: {
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

messageSchema.index({
  userId: 'text',
  body: 'text',
  category: 'text'
});

export default model<IMessage>('Message', messageSchema);
