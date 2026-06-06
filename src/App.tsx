import { Cloud, Droplets, MapPin, Search, Thermometer, Wind } from 'lucide-react'
import { ThemeProvider } from './Context/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import './App.css'


function App() {

  return (
    <ThemeProvider>
     <div className="max-w-xl mx-auto mt-10 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Manila,PH</span>
            </div>
            <ThemeToggle />
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search location..."
              className="w-full bg-input-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all duration-300"
            />
          </div>
          {/* Weather Info */}
          <div className="flex items-end gap-6 mt-1">
            <div className="flex items-end gap-1">
              <Thermometer className="w-5 h-5 text-muted-foreground mb-1" />
              <span className="text-5xl font-bold text-foreground">32</span>
              <span className="text-xl text-muted-foreground mb-2">°C</span>
            </div>
            <div className="flex flex-col gap-1 mb-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Cloud className="w-4 h-4" />
                <span>Partly Cloudy</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Droplets className="w-4 h-4" />
                  <span>78%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="w-4 h-4" />
                  <span>14 km/h</span>
                </div>
              </div>
            </div>
          </div>
    </div>
    </ThemeProvider>
  )
}

export default App
