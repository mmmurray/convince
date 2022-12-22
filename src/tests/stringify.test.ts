import { s } from '..';
import { ok } from '../result';

test('stringify schema', () => {
  const schema = s.stringify();

  const result1 = schema.parse('');
  const result2 = schema.parse('Hello');
  const result3 = schema.parse(123);
  const result4 = schema.parse({ foo: true, bar: ['hi', 123] });

  expect(result1).toEqual(ok(''));
  expect(result2).toEqual(ok('Hello'));
  expect(result3).toEqual(ok('123'));
  expect(result4).toEqual(ok('{"foo":true,"bar":["hi",123]}'));
});

test('stringify optional schema', () => {
  const schema = s.stringify().optional();

  const result1 = schema.parse('');
  const result2 = schema.parse('Hello');
  const result3 = schema.parse(123);
  const result4 = schema.parse(undefined);

  expect(result1).toEqual(ok(''));
  expect(result2).toEqual(ok('Hello'));
  expect(result3).toEqual(ok('123'));
  expect(result4).toEqual(ok(undefined));
});
