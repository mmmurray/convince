import { s } from "..";
import { error, ok } from "../result";

test("object schema", () => {
  const schema = s.object({
    foo: s.string(),
    bar: s.number().optional(),
    baz: s.boolean(),
  });

  const result1 = schema.parse({ foo: "a", bar: 1, baz: true });
  const result2 = schema.parse({ foo: "b", baz: false });
  const result3 = schema.parse({ foo: "a", bar: 1 });
  const result4 = schema.parse(true);

  expect(result1).toEqual(ok({ foo: "a", bar: 1, baz: true }));
  expect(result2).toEqual(ok({ foo: "b", baz: false }));
  expect(result3).toEqual(error(`Missing required property 'baz' in object`));
  expect(result4).toEqual(error("Expected object, received boolean"));
});

test("optional object value schema", () => {
  const schema = s.object({
    a: s.number().optional(),
  });

  const result1 = schema.parse({ a: 0 });
  const result2 = schema.parse({ a: 22 });
  const result3 = schema.parse({});
  const result4 = schema.parse({ a: undefined });
  const result5 = schema.parse({ a: null });

  expect(result1).toEqual(ok({ a: 0 }));
  expect(result2).toEqual(ok({ a: 22 }));
  expect(result3).toEqual(ok({}));
  expect(result4).toEqual(ok({}));
  expect(result5).toEqual(
    error("Record property parse error (a): Expected number, received object")
  );
});

test("nullable object value schema", () => {
  const schema = s.object({
    a: s.number().nullable(),
  });

  const result1 = schema.parse({ a: 0 });
  const result2 = schema.parse({ a: 22 });
  const result3 = schema.parse({ a: null });
  const result4 = schema.parse({});
  const result5 = schema.parse({ a: undefined });

  expect(result1).toEqual(ok({ a: 0 }));
  expect(result2).toEqual(ok({ a: 22 }));
  expect(result3).toEqual(ok({ a: null }));
  expect(result4).toEqual(error("Missing required property 'a' in object"));
  expect(result5).toEqual(error("Missing required property 'a' in object"));
});

test("object extend schema", () => {
  const schemaA = s.object({
    foo: s.string(),
    bar: s.number().optional(),
  });

  const schema = schemaA.extend(
    s.object({
      baz: s.boolean(),
    })
  );

  const result1 = schema.parse({ foo: "a", bar: 1, baz: true });
  const result2 = schema.parse({ foo: "b", baz: false });
  const result3 = schema.parse({ foo: "a", bar: 1 });
  const result4 = schema.parse(true);

  expect(result1).toEqual(ok({ foo: "a", bar: 1, baz: true }));
  expect(result2).toEqual(ok({ foo: "b", baz: false }));
  expect(result3).toEqual(error(`Missing required property 'baz' in object`));
  expect(result4).toEqual(error("Expected object, received boolean"));

  if (result1.ok) {
    result1.data.foo;
    result1.data.bar;
    result1.data.baz;
  }
});

test("object JSON schema", () => {
  const schema = s.object({
    foo: s.string(),
    bar: s.number().optional(),
    baz: s.boolean(),
  });

  const result1 = schema.parseJSON('{ "foo": "a", "bar": 1, "baz": true }');
  const result2 = schema.parseJSON('{ "foo": "a", "bar": 1 }');
  const result3 = schema.parseJSON("???");
  const result4 = schema.parseJSON("");

  expect(result1).toEqual(ok({ foo: "a", bar: 1, baz: true }));
  expect(result2).toEqual(error(`Missing required property 'baz' in object`));
  expect(result3).toEqual(error("Invalid JSON"));
  expect(result4).toEqual(error("Invalid JSON"));
});
