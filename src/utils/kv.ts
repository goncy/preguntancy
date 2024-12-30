import { kv } from '@vercel/kv'

export async function setWithExpiry(key: string, value: any, expiryInSeconds: number): Promise<void> {
  await kv.set(key, value, { ex: expiryInSeconds })
}

export async function get<T>(key: string): Promise<T | null> {
  const value = await kv.get<T>(key)
  return value ?? null
}

export async function del(key: string): Promise<void> {
  await kv.del(key)
}

export async function incr(key: string): Promise<number> {
  return kv.incr(key)
}

export async function expire(key: string, expiryInSeconds: number): Promise<boolean> {
  return kv.expire(key, expiryInSeconds)
}

