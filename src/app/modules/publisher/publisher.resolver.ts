import { IPublisher } from './publisher.interface';
import { PublisherServices } from './publisher.service';

export const publisherResolvers = {
  Query: {
    getAllPublishers: () => PublisherServices.getAllPublishers(),

    getSinglePublisher: (_: unknown, args: { id: string }) =>
      PublisherServices.getSinglePublisher(args.id),
  },

  Mutation: {
    createPublisher: (_: unknown, args: IPublisher) =>
      PublisherServices.createPublisher(args),
  },
};
