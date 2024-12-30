'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitQuestion } from '../actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 rounded transition-all">
      {pending ? 'Submitting...' : 'Submit Question'}
    </Button>
  )
}

export default function QuestionForm() {
  const [question, setQuestion] = useState('')
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    formData.append('ip', '127.0.0.1') // In a real app, you'd get the actual IP
    const result = await submitQuestion(formData)
    if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      })
    } else {
      setQuestion('')
      toast({
        title: 'Success',
        description: 'Your question has been submitted!',
        className: 'bg-primary text-primary-foreground',
      })
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <Textarea
        name="question"
        placeholder="Ask your anonymous question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="bg-muted border border-input text-foreground placeholder-muted-foreground rounded p-3 min-h-[120px]"
      />
      <SubmitButton />
    </form>
  )
}

