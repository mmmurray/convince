import { Result } from "./result";

type SchemaKind = "Default" | "Optional";

export type Schema<T> = {
  kind: SchemaKind;
  parse: (data: unknown) => Result<T>;
  parseJSON: (json: string) => Result<T>;
  optional: () => Schema<T | undefined>;
  nullable: () => Schema<T | null>;
  validate: (predicate: (value: T) => boolean) => Schema<T>;
  extend: <TOther>(other: Schema<TOther>) => Schema<T & TOther>;
};

export type SchemaType<T extends Schema<any>> = T extends Schema<infer U>
  ? U
  : unknown;
