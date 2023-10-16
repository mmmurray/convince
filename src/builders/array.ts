import { createSchema } from "../create-schema";
import { error, ok } from "../result";
import { Schema } from "../types";

export const array = <TElement>(
  elementParser: Schema<TElement>
): Schema<TElement[]> => {
  return createSchema((data) => {
    if (!Array.isArray(data)) {
      return error(`Expected array, received ${typeof data}`);
    }

    const elements: TElement[] = [];

    for (const element of data as unknown[]) {
      const elementResult = elementParser.parse(element);

      if (!elementResult.ok) {
        return error(`Array element parse error: ${elementResult.message}`);
      }

      elements.push(elementResult.data);
    }

    return ok(elements);
  });
};
