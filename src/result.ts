export type Result<T> = { ok: true; data: T } | { ok: false; message: string };

export const ok = <T>(data: T): Result<T> => ({ ok: true, data });

export const error = <T>(message: string): Result<T> => ({
  ok: false,
  message,
});
