import { createSchema } from "../create-schema";
import { error, ok } from "../result";
import { Schema, SchemaType } from "../types";

type UndefinedKeys<T extends object> = {
  [k in keyof T]: undefined extends T[k] ? k : never;
}[keyof T];

type NonUndefinedKeys<T extends object> = Exclude<keyof T, UndefinedKeys<T>>;

type Optionalize<T extends object> = {
  [k in UndefinedKeys<T>]?: T[k];
} & {
  [k in NonUndefinedKeys<T>]: T[k];
};

type PropertyParsersBase = { [key in string]: Schema<any> };

type PropertyParserResult<TPropertyParsers extends PropertyParsersBase> =
  Optionalize<{
    [key in keyof TPropertyParsers]: SchemaType<TPropertyParsers[key]>;
  }>;

export const object = <TPropertyParsers extends PropertyParsersBase>(
  propertyParsers: TPropertyParsers
): Schema<PropertyParserResult<TPropertyParsers>> => {
  return createSchema<PropertyParserResult<TPropertyParsers>>((data) => {
    if (data && typeof data === "object") {
      const record = {} as any;

      for (const [key, parser] of Object.entries(propertyParsers)) {
        if (
          !(key in data) ||
          (data as Record<string, unknown>)[key] === undefined
        ) {
          if (parser.kind !== "Optional") {
            return error(`Missing required property '${key}' in object`);
          }
        } else {
          const property = (data as Record<string, unknown>)[key];
          const propertyResult = parser.parse(property);

          if (!propertyResult.ok) {
            return error(
              `Record property parse error (${key}): ${propertyResult.message}`
            );
          }

          record[key] = propertyResult.data;
        }
      }

      return ok(record);
    }

    return error(`Expected object, received ${typeof data}`);
  });
};
