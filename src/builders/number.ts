import { createSchema } from "../create-schema";
import { error, ok } from "../result";
import { Schema } from "../types";

export const number = (): Schema<number> => {
  return createSchema((data) => {
    if (typeof data !== "number") {
      return error(`Expected number, received ${typeof data}`);
    }
    return ok(data);
  });
};
