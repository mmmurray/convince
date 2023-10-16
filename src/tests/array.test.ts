import { s } from "..";
import { error, ok } from "../result";

test("array schema", () => {
  const schema = s.array(s.string());

  const result1 = schema.parse([]);
  const result2 = schema.parse(["Hello", "", "world"]);
  const result3 = schema.parse(["Hello", 123, "world"]);
  const result4 = schema.parse("test");
  const result5 = schema.parse(true);

  expect(result1).toEqual(ok([]));
  expect(result2).toEqual(ok(["Hello", "", "world"]));
  expect(result3).toEqual(
    error("Array element parse error: Expected string, received number")
  );
  expect(result4).toEqual(error("Expected array, received string"));
  expect(result5).toEqual(error("Expected array, received boolean"));
});
