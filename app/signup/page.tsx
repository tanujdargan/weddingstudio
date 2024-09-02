"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Layout from '../layout'
import InteractiveQuestionnaire from './iq'

export default function Signup() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleQuestionnaireComplete = (answers: Record<number, string>) => {
    console.log('Questionnaire answers:', answers)
    // Here you would typically send the answers to your backend
    router.push('/dashboard')
  }

  return (
    <Layout showHeader={false} showBottomNav={false}>
      <div className="flex flex-col min-h-screen bg-rose-50 justify-center items-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 ? (
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-rose-800">Sign Up</CardTitle>
                <CardDescription>Create your account to start planning</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.form onSubmit={handleSubmit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Next
                  </Button>
                </motion.form>
              </CardContent>
            </Card>
          ) : (
            <InteractiveQuestionnaire onComplete={handleQuestionnaireComplete} />
          )}
        </motion.div>
      </div>
    </Layout>
  )
}