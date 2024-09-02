'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarDays, Clock, MapPin, Users, Utensils } from 'lucide-react'
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'

export default function Bookings() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      <Header />
      <main className="flex-1 overflow-y-auto p-4">
        <h1 className="text-2xl font-bold text-rose-800 mb-4">Bookings</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="vendor">Vendor Type</Label>
                  <Select>
                    <SelectTrigger id="vendor">
                      <SelectValue placeholder="Select vendor type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venue">Venue</SelectItem>
                      <SelectItem value="catering">Catering</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="florist">Florist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="name">Vendor Name</Label>
                  <Input id="name" placeholder="Enter vendor name" />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Input id="notes" placeholder="Any additional notes" />
                </div>
                <Button type="submit">Book Appointment</Button>
              </form>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="mr-2 h-4 w-4" /> View Venues
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Utensils className="mr-2 h-4 w-4" /> Catering Options
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" /> Guest List
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" /> Timeline
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarDays className="mr-2 h-4 w-4" /> All Appointments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <BottomNavigation currentPage="bookings" />
    </div>
  )
}