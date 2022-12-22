import { createSchema } from '../create-schema';
import { ok } from '../result';
import { Schema } from '../types';

export const unknown = (): Schema<unknown> => {
  return createSchema((data) => {
    return ok(data);
  });
};
