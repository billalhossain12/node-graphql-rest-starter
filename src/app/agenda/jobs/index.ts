/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineExpireDocJob } from './expireDoc.job';

export const loadJobs = (agenda: any) => {
  defineExpireDocJob(agenda);
};
