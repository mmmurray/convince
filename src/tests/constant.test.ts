import { s } from '..';
import { ok } from '../result';

test('constant null schema', () => {
  const schema = s.constant(null);

  const result1 = schema.parse(true);
  const result2 = schema.parse(false);
  const result3 = schema.parse(0);
  const result4 = schema.parse('true');

  expect(result1).toEqual(ok(null));
  expect(result2).toEqual(ok(null));
  expect(result3).toEqual(ok(null));
  expect(result4).toEqual(ok(null));
});
