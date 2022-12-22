import { createSchema } from '../create-schema';
import { error, ok } from '../result';
import { Schema } from '../types';

export const string = (): Schema<string> => {
  return createSchema((data) => {
    if (typeof data !== 'string') {
      return error(`Expected string, received ${typeof data}`);
    }
    return ok(data);
  });
};
