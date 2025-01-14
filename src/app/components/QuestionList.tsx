import { Card, CardContent } from '@/components/ui/card'

interface Question {
  id: string
  question: string
  createdAt: string
}

export default function QuestionList({ questions }: { questions: Question[] }) {
  return (
    <div className="space-y-4 overflow-y-auto pr-2">
      {questions.map((question) => (
        <Card key={question.id} className="bg-muted border border-input hover:border-primary transition-all">
          <CardContent className="p-4">
            <p className="text-foreground mb-2">{question.question}</p>
            <p className="text-sm text-muted-foreground">
              Asked on {new Date(question.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

