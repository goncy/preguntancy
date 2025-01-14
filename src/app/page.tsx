import QuestionForm from './components/QuestionForm'

export default async function Home() {
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
        </div>
      </div>
    </main>
  )
}

