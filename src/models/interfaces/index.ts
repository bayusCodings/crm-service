import { Types } from 'mongoose';

interface IAgent {
  _id: Types.ObjectId,
  firstName: string;
  lastName: string;
  email: string;
  activeMessageCount: number;
}

interface ICategory {
  _id?: Types.ObjectId,
  name: string;
  priority: number;
}

interface IMessage {
  _id: Types.ObjectId,
  userId: string;
  agent: Types.ObjectId | string
  body: string;
  date?: Date;
  reply?: string;
  replied?: boolean;
  category?: string
}

export {
  IAgent,
  ICategory,
  IMessage
}