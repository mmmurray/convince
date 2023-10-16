import { s } from "..";
import { error, ok } from "../result";

test("string schema", () => {
  const schema = s.string();

  const result1 = schema.parse("");
  const result2 = schema.parse("Hello");
  const result3 = schema.parse(123);
  const result4 = schema.parse(true);

  expect(result1).toEqual(ok(""));
  expect(result2).toEqual(ok("Hello"));
  expect(result3).toEqual(error("Expected string, received number"));
  expect(result4).toEqual(error("Expected string, received boolean"));
});
