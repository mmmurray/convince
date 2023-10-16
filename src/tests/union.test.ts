import { s } from "..";
import { error, ok } from "../result";

test("union schema", () => {
  const schema = s.union(
    s.object({
      type: s.literal("FOO"),
      foo: s.number().optional(),
    }),
    s.object({
      type: s.literal("BAR"),
      bar: s.string(),
    })
  );

  const result1 = schema.parse({ type: "FOO", foo: 123 });
  const result2 = schema.parse({ type: "BAR", bar: "hello" });
  const result3 = schema.parse({ type: "FOO" });
  const result4 = schema.parse({ type: "BAR" });
  const result5 = schema.parse({ type: "BAZ" });
  const result6 = schema.parse(true);

  expect(result1).toEqual(ok({ type: "FOO", foo: 123 }));
  expect(result2).toEqual(ok({ type: "BAR", bar: "hello" }));
  expect(result3).toEqual(ok({ type: "FOO" }));
  expect(result4).toEqual(
    error(
      "No matching union variant:\nRecord property parse error (type): Expected 'FOO', received 'BAR'\nMissing required property 'bar' in object"
    )
  );
  expect(result5).toEqual(
    error(
      "No matching union variant:\nRecord property parse error (type): Expected 'FOO', received 'BAZ'\nRecord property parse error (type): Expected 'BAR', received 'BAZ'"
    )
  );
  expect(result6).toEqual(
    error(
      "No matching union variant:\nExpected object, received boolean\nExpected object, received boolean"
    )
  );
});
