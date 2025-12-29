import { IPublisher } from './publisher.interface';
import { Publisher } from './publisher.model';

const createPublisher = async (payload: IPublisher) => {
  return await Publisher.create(payload);
};

const getAllPublishers = async () => {
  return await Publisher.find({});
};

const getSinglePublisher = async (id: string) => {
  return await Publisher.findById(id);
};

export const PublisherServices = {
  getAllPublishers,
  getSinglePublisher,
  createPublisher,
};
