import { createSchema } from '../create-schema';
import { error, ok } from '../result';
import { Schema } from '../types';

export const tuple = <TElements extends [...any[]]>(
  ...elementParsers: {
    [index in keyof TElements]: Schema<TElements[index]>;
  }
): Schema<TElements> => {
  return createSchema((data) => {
    if (!Array.isArray(data)) {
      return error(`Expected array, received ${typeof data}`);
    }

    const items = data as unknown[];

    if (items.length !== elementParsers.length) {
      return error(
        `Expected tuple to have ${elementParsers.length} elements, received ${items.length}`,
      );
    }

    const elements: unknown[] = [];

    let index = 0;
    for (const item of items) {
      const elementResult = elementParsers[index++].parse(item);

      if (!elementResult.ok) {
        return error(`Tuple element parse error: ${elementResult.message}`);
      }

      elements.push(elementResult.data);
    }

    return ok(elements as TElements);
  });
};
