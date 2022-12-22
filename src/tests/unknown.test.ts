import { s } from '..';
import { ok } from '../result';

test('unknown schema', () => {
  const schema = s.unknown();

  const result1 = schema.parse('foo');
  const result2 = schema.parse('');
  const result3 = schema.parse(123);
  const result4 = schema.parse(true);

  expect(result1).toEqual(ok('foo'));
  expect(result2).toEqual(ok(''));
  expect(result3).toEqual(ok(123));
  expect(result4).toEqual(ok(true));
});
