'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Send } from 'lucide-react'
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'

export default function Support() {
  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      <Header />
      <main className="flex-1 overflow-y-auto p-4">
        <h1 className="text-2xl font-bold text-rose-800 mb-4">Support</h1>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="issue">Describe Your Issue</Label>
                <Textarea id="issue" placeholder="Please describe your issue in detail" className="min-h-[100px]" />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send Issue
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <BottomNavigation currentPage="support" />
    </div>
  )
}