import { s } from '..';
import { error, ok } from '../result';

test('number schema', () => {
  const schema = s.number();

  const result1 = schema.parse(0);
  const result2 = schema.parse(22);
  const result3 = schema.parse('123');
  const result4 = schema.parse(true);

  expect(result1).toEqual(ok(0));
  expect(result2).toEqual(ok(22));
  expect(result3).toEqual(error('Expected number, received string'));
  expect(result4).toEqual(error('Expected number, received boolean'));
});

test('optional number schema', () => {
  const schema = s.number().optional();

  const result1 = schema.parse(0);
  const result2 = schema.parse(22);
  const result3 = schema.parse(undefined);
  const result4 = schema.parse(null);

  expect(result1).toEqual(ok(0));
  expect(result2).toEqual(ok(22));
  expect(result3).toEqual(ok(undefined));
  expect(result4).toEqual(error('Expected number, received object'));
});

test('nullable number schema', () => {
  const schema = s.number().nullable();

  const result1 = schema.parse(0);
  const result2 = schema.parse(22);
  const result3 = schema.parse(null);
  const result4 = schema.parse(undefined);

  expect(result1).toEqual(ok(0));
  expect(result2).toEqual(ok(22));
  expect(result3).toEqual(ok(null));
  expect(result4).toEqual(error('Expected number, received undefined'));
});

test('optional nullable number schema', () => {
  const schema = s.number().nullable().optional();

  const result1 = schema.parse(0);
  const result2 = schema.parse(22);
  const result3 = schema.parse(null);
  const result4 = schema.parse(undefined);

  expect(result1).toEqual(ok(0));
  expect(result2).toEqual(ok(22));
  expect(result3).toEqual(ok(null));
  expect(result4).toEqual(ok(undefined));
});

test('even number schema', () => {
  const isEven = (x: number): boolean => x % 2 === 0;
  const schema = s.number().validate(isEven);

  const result1 = schema.parse(2);
  const result2 = schema.parse(5);
  const result3 = schema.parse('123');
  const result4 = schema.parse(true);

  expect(result1).toEqual(ok(2));
  expect(result2).toEqual(error('Validation failed'));
  expect(result3).toEqual(error('Expected number, received string'));
  expect(result4).toEqual(error('Expected number, received boolean'));
});
