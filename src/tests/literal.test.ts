import { s } from "..";
import { error, ok } from "../result";

test("literal schema", () => {
  const schema = s.literal("foo");

  const result1 = schema.parse("foo");
  const result2 = schema.parse("");
  const result3 = schema.parse(123);
  const result4 = schema.parse(true);

  expect(result1).toEqual(ok("foo"));
  expect(result2).toEqual(error(`Expected 'foo', received ''`));
  expect(result3).toEqual(error(`Expected 'foo', received number`));
  expect(result4).toEqual(error(`Expected 'foo', received boolean`));
});
