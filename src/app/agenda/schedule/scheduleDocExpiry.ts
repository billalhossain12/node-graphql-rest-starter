/* eslint-disable @typescript-eslint/no-explicit-any */

import { agenda } from '..';

export const scheduleDocExpiry = async (doc: any) => {
  await agenda.schedule(doc.expiryDate, 'expire-doc', {
    testId: doc._id,
  });
};
