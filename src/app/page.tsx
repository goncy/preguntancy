import QuestionForm from './components/QuestionForm'
import QuestionList from './components/QuestionList'
import { getQuestions } from './actions'

export default async function Home() {
  const questions = await getQuestions()

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-primary">
          Preguntancy
        </h1>
        <div className="space-y-12">
          <section className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Ask a Question</h2>
            <QuestionForm />
          </section>
          <section className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Recent Questions</h2>
            <QuestionList questions={questions} />
          </section>
        </div>
      </div>
    </main>
  )
}

