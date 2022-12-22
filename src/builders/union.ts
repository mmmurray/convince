import { createSchema } from '../create-schema';
import { error } from '../result';
import { Schema, SchemaType } from '../types';

export const union = <
  TVariants extends [Schema<any>, Schema<any>, ...Schema<any>[]],
>(
  ...variants: TVariants
): Schema<SchemaType<TVariants[number]>> => {
  return createSchema((data) => {
    const errors: string[] = [];
    for (const variant of variants) {
      const result = variant.parse(data);

      if (result.ok) {
        return result;
      } else {
        errors.push(result.message);
      }
    }

    return error(`No matching union variant:\n${errors.join('\n')}`);
  });
};
