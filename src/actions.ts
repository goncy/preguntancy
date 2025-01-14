'use server'

import { kv } from '@vercel/kv'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { setWithExpiry } from './utils/kv'
import { expire, incr } from './utils/kv'

const RATE_LIMIT = 3
const RATE_LIMIT_WINDOW = 60 // 1 minute
const RATE_LIMIT_PENALTY = 600 // 10 minutes

interface Question {
  question: string  // max length: 1000 characters
  createdAt: string
}

export async function submitQuestion(formData: FormData) {
  const question = formData.get('question') as string
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || 'unknown'

  if (!question) {
    return { error: 'Invalid input' }
  }

  if (question.length > 1000) {
    return { error: 'Question must be 1000 characters or less' }
  }

  const rateLimitKey = `ratelimit:${ip}`
  const count = await incr(rateLimitKey)

  if (count === 1) {
    await expire(rateLimitKey, RATE_LIMIT_WINDOW)
  }

  if (count > RATE_LIMIT) {
    await setWithExpiry(rateLimitKey, count, RATE_LIMIT_PENALTY)
    return { error: 'Rate limit exceeded. Please try again in 10 minutes.' }
  }

  const questionId = `question:${Date.now()}`
  await setWithExpiry(questionId, { question, createdAt: new Date().toISOString() }, 7 * 24 * 60 * 60) // 7 days

  revalidatePath('/')
  return { success: true }
}

export async function getQuestions(): Promise<Array<Question & { id: string }>> {
  const keys = await kv.keys('question:*')
  const values = await kv.mget(...keys)
  
  return keys.map((key, index) => ({
    id: key,
    ...(values[index] as Question)
  })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

