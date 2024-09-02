import { Heart } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-border p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg text-foreground">Wedding Planner</span>
        </div>
        <nav>
          {/* Add navigation items here if needed */}
        </nav>
      </div>
    </header>
  )
}