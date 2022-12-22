# Convince

Type safe schema validation library. Lightweight alternative to [Zod](https://github.com/colinhacks/zod)

## Install

```console
yarn add convince
```

Or

```console
npm i convince
```

## Usage

```ts
import { s, SchemaType } from 'convince';

const thingSchema = s.object({
  foo: s.string(),
  bar: s.number().optional(),
  baz: s.boolean(),
});

type Thing = SchemaType<typeof thingSchema>;

const thingResult = thingSchema.parse({
  foo: 'Hello',
  baz: true,
});

if (thingResult.ok) {
  console.log(thingResult.data.foo);
}
```
