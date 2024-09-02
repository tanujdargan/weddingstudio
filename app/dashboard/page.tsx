'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Bell, CalendarDays, CheckSquare, DollarSign, Heart, Home, Image, Menu, MessageCircle, Users, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from 'recharts'
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [currentPage, setCurrentPage] = useState('home')
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    handleSwipe()
  }

  const handleSwipe = () => {
    const swipeDistance = touchStartX.current - touchEndX.current
    if (Math.abs(swipeDistance) > 50) {
      const pages = ['home', 'imagine', 'bookings', 'support']
      const currentIndex = pages.indexOf(currentPage)
      if (swipeDistance > 0 && currentIndex < pages.length - 1) {
        setCurrentPage(pages[currentIndex + 1])
      } else if (swipeDistance < 0 && currentIndex > 0) {
        setCurrentPage(pages[currentIndex - 1])
      }
    }
  }

  useEffect(() => {
    const content = document.getElementById('main-content')
    if (content) {
      content.addEventListener('touchstart', handleTouchStart as any)
      content.addEventListener('touchend', handleTouchEnd as any)
    }
    return () => {
      if (content) {
        content.removeEventListener('touchstart', handleTouchStart as any)
        content.removeEventListener('touchend', handleTouchEnd as any)
      }
    }
  }, [])

  const planningProgress = 65
  const budget = {
    total: 50000,
    spent: 30000,
    remaining: 20000
  }
  const guestList = {
    invited: 200,
    confirmed: 120,
    declined: 30,
    pending: 50
  }
  const daysUntilWedding = 120
  const tasksCompleted = 45

  const guestData = [
    { name: 'Confirmed', value: guestList.confirmed, color: '#10B981' },
    { name: 'Declined', value: guestList.declined, color: '#EF4444' },
    { name: 'Pending', value: guestList.pending, color: '#F59E0B' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      <Header />
      <main id="main-content" className="flex-1 overflow-y-auto pb-16 transition-all duration-300 ease-in-out">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-rose-700">Planning Progress</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Progress value={planningProgress} className="w-full bg-rose-200" indicatorClassName="bg-rose-500" />
                <p className="text-center mt-2 text-sm text-rose-600">{planningProgress}% Complete</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-rose-700">Budget Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="text-sm font-semibold">${budget.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Spent</p>
                    <p className="text-sm font-semibold text-rose-600">${budget.spent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Remaining</p>
                    <p className="text-sm font-semibold text-green-600">${budget.remaining.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-rose-700">Wedding Calendar</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border border-rose-200"
                />
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-rose-700">Guest List</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={guestData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {guestData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend layout="vertical" align="right" verticalAlign="middle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between text-xs mt-4">
                  <p>Invited: {guestList.invited}</p>
                  <p className="text-green-600">Confirmed: {guestList.confirmed}</p>
                  <p className="text-red-600">Declined: {guestList.declined}</p>
                  <p className="text-yellow-600">Pending: {guestList.pending}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-white shadow-sm mb-6">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium text-rose-700">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Tabs defaultValue="tasks">
                <TabsList className="grid w-full grid-cols-3 bg-rose-100">
                  <TabsTrigger value="tasks" className="data-[state=active]:bg-rose-200">Tasks</TabsTrigger>
                  <TabsTrigger value="vendors" className="data-[state=active]:bg-rose-200">Vendors</TabsTrigger>
                  <TabsTrigger value="decor" className="data-[state=active]:bg-rose-200">Décor</TabsTrigger>
                </TabsList>
                <TabsContent value="tasks">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm"><CheckSquare className="mr-2 h-4 w-4 text-rose-600" /> Book venue</li>
                    <li className="flex items-center text-sm"><CheckSquare className="mr-2 h-4 w-4 text-rose-600" /> Send invitations</li>
                    <li className="flex items-center text-sm"><CheckSquare className="mr-2 h-4 w-4 text-rose-600" /> Choose wedding dress</li>
                  </ul>
                </TabsContent>
                <TabsContent value="vendors">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm"><Heart className="mr-2 h-4 w-4 text-rose-600" /> Photographer</li>
                    <li className="flex items-center text-sm"><Heart className="mr-2 h-4 w-4 text-rose-600" /> Caterer</li>
                    <li className="flex items-center text-sm"><Heart className="mr-2 h-4 w-4 text-rose-600" /> Florist</li>
                  </ul>
                </TabsContent>
                <TabsContent value="decor">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm"><Bell className="mr-2 h-4 w-4 text-rose-600" /> Choose color scheme</li>
                    <li className="flex items-center text-sm"><Bell className="mr-2 h-4 w-4 text-rose-600" /> Select centerpieces</li>
                    <li className="flex items-center text-sm"><Bell className="mr-2 h-4 w-4 text-rose-600" /> Design seating chart</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium text-rose-700">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-rose-600 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Total Budget</p>
                    <p className="text-sm font-semibold">${budget.total.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-rose-600 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Guests Invited</p>
                    <p className="text-sm font-semibold">{guestList.invited}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-rose-600 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Days Until Wedding</p>
                    <p className="text-sm font-semibold">{daysUntilWedding}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-8 h-8 text-rose-600 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Tasks Completed</p>
                    <p className="text-sm font-semibold">{tasksCompleted}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <BottomNavigation currentPage={currentPage} />
    </div>
  )
}