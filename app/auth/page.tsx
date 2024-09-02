'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart } from 'lucide-react'

export default function AuthChoice() {
  const router = useRouter()

  const handleChoice = (selected: 'login' | 'signup') => {
    router.push(`/${selected}`)
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <motion.div 
            className="mx-auto bg-secondary rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="w-8 h-8 text-primary" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-foreground">Wedding Planner</CardTitle>
          <CardDescription>Plan your perfect day with ease</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            onClick={() => handleChoice('signup')}
          >
            Sign Up
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleChoice('login')}
          >
            Log In
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}