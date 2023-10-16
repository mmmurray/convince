import { createSchema } from "../create-schema";
import { ok } from "../result";
import { Schema } from "../types";

export const stringify = (): Schema<string> => {
  return createSchema((data) => {
    if (typeof data !== "string") {
      return ok(JSON.stringify(data));
    }
    return ok(data);
  });
};
