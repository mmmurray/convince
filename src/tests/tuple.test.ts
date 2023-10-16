import { s } from "..";
import { error, ok } from "../result";

test("tuple schema", () => {
  const schema = s.tuple(s.string(), s.number(), s.boolean());

  const result1 = schema.parse(["Hello", 22, true]);
  const result2 = schema.parse(["Hello", "22", "true"]);
  const result3 = schema.parse(["Hello", 22]);
  const result4 = schema.parse(["Hello", 22, true, "world"]);
  const result5 = schema.parse(true);

  expect(result1).toEqual(ok(["Hello", 22, true]));
  expect(result2).toEqual(
    error("Tuple element parse error: Expected number, received string")
  );
  expect(result3).toEqual(
    error("Expected tuple to have 3 elements, received 2")
  );
  expect(result4).toEqual(
    error("Expected tuple to have 3 elements, received 4")
  );
  expect(result5).toEqual(error("Expected array, received boolean"));
});
