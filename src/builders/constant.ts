import { createSchema } from "../create-schema";
import { ok } from "../result";
import { Schema } from "../types";

export const constant = <T>(value: T): Schema<T> => {
  return createSchema(() => {
    return ok(value);
  });
};
