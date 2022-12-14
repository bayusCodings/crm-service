import mongoose from 'mongoose';
import { config } from '../config';

import Agent from './agent.model';
import Category from './category.model';
import Message from './message.model';

mongoose.Promise = global.Promise;
const options = {
  useNewUrlParser: true,
  keepAlive: true,
  useUnifiedTopology: true
};

const MONGODB_URI: any = config.MONGODB_URI
mongoose.connect(MONGODB_URI, options);

mongoose.connection.on('error', (err: any) => {
  console.error(`Error connecting to database → ${err.message}`);
});

export {
  Agent,
  Category,
  Message
}
