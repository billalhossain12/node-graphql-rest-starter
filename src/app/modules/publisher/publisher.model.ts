import { model, Schema } from 'mongoose';
import { IPublisher } from './publisher.interface';

const publisherSchema = new Schema<IPublisher>({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  foundedYear: {
    type: Number,
    required: true,
  },
});

export const Publisher = model<IPublisher>('Publisher', publisherSchema);
