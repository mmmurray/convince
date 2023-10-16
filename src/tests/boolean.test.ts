import { s } from "..";
import { error, ok } from "../result";

test("boolean schema", () => {
  const schema = s.boolean();

  const result1 = schema.parse(true);
  const result2 = schema.parse(false);
  const result3 = schema.parse(0);
  const result4 = schema.parse("true");

  expect(result1).toEqual(ok(true));
  expect(result2).toEqual(ok(false));
  expect(result3).toEqual(error("Expected boolean, received number"));
  expect(result4).toEqual(error("Expected boolean, received string"));
});
