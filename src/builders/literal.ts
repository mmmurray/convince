import { createSchema } from '../create-schema';
import { error, ok } from '../result';
import { Schema } from '../types';

export const literal = <TLiteral extends string | number | bigint | boolean>(
  literal: TLiteral,
): Schema<TLiteral> => {
  return createSchema((data) => {
    if (data === literal) {
      return ok(data as any);
    }

    const received = typeof data === 'string' ? `'${data}'` : typeof data;

    return error(`Expected '${literal}', received ${received}`);
  });
};
