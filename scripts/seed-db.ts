import { kv } from '@vercel/kv'

async function seed() {
  console.log('Seeding database...')

  const questions = [
    {
      question: "Hello?",
      answer: "World",
      createdAt: new Date().toISOString()
    },
    {
      question: "What is the capital of France?",
      answer: "Paris",
      createdAt: new Date().toISOString()
    },
    {
      question: "Who wrote \"Romeo and Juliet\"?",
      answer: "William Shakespeare",
      createdAt: new Date().toISOString()
    },
    {
      question: "What is the chemical symbol for gold?",
      answer: "Au",
      createdAt: new Date().toISOString()
    },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
      createdAt: new Date().toISOString()
    },
    {
      question: "What year did World War II end?",
      answer: "1945",
      createdAt: new Date().toISOString()
    }
  ]

  // Clear existing questions
  const existingKeys = await kv.keys('question:*')
  if (existingKeys.length > 0) {
    await kv.del(...existingKeys)
  }

  // Add new questions
  for (let i = 0; i < questions.length; i++) {
    const key = `question:${i + 1}`
    await kv.set(key, JSON.stringify(questions[i]))
  }

  // Update counter
  await kv.set('question_counter', questions.length.toString())

  console.log('Seeding complete!')
  process.exit(0)
}

seed().catch(console.error) 