import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const questions = [
  {
    id: 1,
    question: "How can we help you out today?",
    type: "buttons",
    options: ["Plan a Wedding from Scratch", "Track your Wedding", "Trying it out", "Others"],
  },
  {
    id: 2,
    question: "Do you have a location in mind?",
    type: "dropdown",
    options: ["United States", "Canada", "United Kingdom", "Australia", "Other"],
  },
  {
    id: 3,
    question: "A specific city?",
    type: "dropdown",
    options: ["New York", "Los Angeles", "Chicago", "Houston", "Other"],
  },
  {
    id: 4,
    question: "How about a venue type?",
    type: "dropdown",
    options: ["Beach", "Garden", "Ballroom", "Rustic", "Urban", "Other"],
  },
]

interface InteractiveQuestionnaireProps {
  onComplete: (answers: Record<number, string>) => void
}

export default function InteractiveQuestionnaire({ onComplete }: InteractiveQuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer })
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleSubmit = () => {
    console.log("Questionnaire answers:", answers)
    onComplete(answers)
  }

  const renderQuestion = () => {
    const question = questions[currentQuestion]
    if (question.type === "buttons") {
      return (
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option) => (
            <motion.div key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleAnswer(option)}
                variant="outline"
                className="h-auto py-4 px-6 text-left justify-start w-full"
              >
                {option}
              </Button>
            </motion.div>
          ))}
        </div>
      )
    } else if (question.type === "dropdown") {
      return (
        <Select onValueChange={handleAnswer} value={answers[question.id]}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {question.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-rose-800">
          {questions[currentQuestion].question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderQuestion()}
          </motion.div>
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        {currentQuestion === questions.length - 1 ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button onClick={handleNext} disabled={!answers[questions[currentQuestion].id]}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}