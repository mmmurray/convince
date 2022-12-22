import { createSchema } from '../create-schema';
import { error, ok } from '../result';
import { Schema } from '../types';

export const record = <TValue>(
  valueParser: Schema<TValue>,
): Schema<{ [key in string]?: TValue }> => {
  return createSchema((data) => {
    if (typeof data !== 'object') {
      return error(`Expected object, received ${typeof data}`);
    }
    if (data === null) {
      return error(`Expected object, received null`);
    }

    const record: { [key in string]?: TValue } = {};

    for (const [key, value] of Object.entries(
      data as { [key in string]?: unknown },
    )) {
      const valueResult = valueParser.parse(value);

      if (!valueResult.ok) {
        return error(`Record value parse error: ${valueResult.message}`);
      }

      record[key] = valueResult.data;
    }

    return ok(record);
  });
};
