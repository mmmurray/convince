import { createSchema } from '../create-schema';
import { error, ok } from '../result';
import { Schema } from '../types';

export const boolean = (): Schema<boolean> => {
  return createSchema((data) => {
    if (typeof data !== 'boolean') {
      return error(`Expected boolean, received ${typeof data}`);
    }
    return ok(data);
  });
};
