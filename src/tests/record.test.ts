import { s } from "..";
import { error, ok } from "../result";

test("record schema", () => {
  const schema = s.record(s.number());

  const result1 = schema.parse({});
  const result2 = schema.parse({ foo: 0, bar: 1 });
  const result3 = schema.parse({ foo: 0, bar: "1" });
  const result4 = schema.parse("test");
  const result5 = schema.parse(null);

  expect(result1).toEqual(ok({}));
  expect(result2).toEqual(ok({ foo: 0, bar: 1 }));
  expect(result3).toEqual(
    error("Record value parse error: Expected number, received string")
  );
  expect(result4).toEqual(error("Expected object, received string"));
  expect(result5).toEqual(error("Expected object, received null"));
});
