'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Download, RefreshCw, Share2, ThumbsUp, Wand2 } from 'lucide-react'
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'

export default function Imagine() {
  const [prompt, setPrompt] = useState('')

  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      <Header />
      <main className="flex-1 overflow-y-auto p-4">
        <h1 className="text-2xl font-bold text-rose-800 mb-4">Imagine Your Wedding</h1>
        <div className="flex flex-col space-y-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <img src="/placeholder.svg" alt="Generated wedding image" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="flex space-x-2 mb-4">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Describe your wedding scene..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="flex-grow"
                />
                <Button>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <BottomNavigation currentPage="imagine" />
    </div>
  )
}