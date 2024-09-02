"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Apple, ArrowRight, Facebook, Github, Mail } from 'lucide-react'
import Layout from '../layout'

export default function Login() {
  const [email, setEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const router = useRouter()

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the OTP to the provided email here
    setOtpSent(true)
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would verify the OTP here and log the user in
    console.log('OTP submitted:', otp)
    router.push('/dashboard')
  }

  const handleSocialLogin = (provider: string) => {
    // In a real application, you would initiate the social login process here
    console.log(`Logging in with ${provider}`)
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
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-rose-800">Log In</CardTitle>
              <CardDescription>Access your wedding planner account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!otpSent ? (
                <motion.form onSubmit={handleEmailSubmit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send OTP
                  </Button>
                </motion.form>
              ) : (
                <motion.form onSubmit={handleOtpSubmit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Verify OTP
                  </Button>
                </motion.form>
              )}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-rose-50 px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <motion.div className="grid grid-cols-2 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <Button variant="outline" onClick={() => handleSocialLogin('Google')}>
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" onClick={() => handleSocialLogin('Apple')}>
                  <Apple className="mr-2 h-4 w-4" />
                  Apple
                </Button>
                <Button variant="outline" onClick={() => handleSocialLogin('Facebook')}>
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
                <Button variant="outline" onClick={() => handleSocialLogin('Github')}>
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  )
}