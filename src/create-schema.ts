import { error, ok, Result } from './result';
import { Schema } from './types';

export const createSchema = <T>(
  parse: (data: unknown) => Result<T>,
  kind: Schema<T>['kind'] = 'Default',
): Schema<T> => {
  return {
    kind,
    parse,
    parseJSON: (json) => {
      try {
        const data = JSON.parse(json);
        return parse(data);
      } catch (error) {
        return { ok: false, message: 'Invalid JSON' };
      }
    },
    optional: () => {
      return createSchema<T | undefined>((data) => {
        if (data === undefined) {
          return ok(undefined);
        }
        return parse(data);
      }, 'Optional');
    },
    nullable: () => {
      return createSchema<T | null>((data) => {
        if (data === null) {
          return ok(null);
        }
        return parse(data);
      });
    },
    validate: (predicate) => {
      return createSchema<T>((data) => {
        const result = parse(data);
        if (!result.ok) {
          return result;
        }
        const valid = predicate(result.data);
        if (!valid) {
          return error('Validation failed');
        }
        return result;
      });
    },
    extend: (other) => {
      return createSchema((data) => {
        const baseResult = parse(data);
        if (!baseResult.ok) {
          return baseResult;
        }

        const additionalResult = other.parse(data);
        if (!additionalResult.ok) {
          return additionalResult;
        }

        return ok({ ...baseResult.data, ...additionalResult.data });
      });
    },
  };
};
