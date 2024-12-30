'use server'

import { kv } from '@vercel/kv'
import { revalidatePath } from 'next/cache'
import { setWithExpiry, incr, expire } from './utils/kv'

interface Question {
  question: string
  createdAt: string
}

export async function submitQuestion(formData: FormData) {
  const question = formData.get('question') as string
  const ip = formData.get('ip') as string

  if (!question || !ip) {
    return { error: 'Invalid input' }
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

