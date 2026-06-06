import { Sun } from "lucide-react";

function WeatherCard() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 transition-all duration-300">
      <div className="flex items-center gap-2 mb-2">
       <Sun className="w-4 h-4" />
        <span className="text-muted-foreground text-sm transition-colors duration-300">trse</span>
      </div>
      <div className="text-foreground text-2xl transition-colors duration-300">tes</div>
    </div>
  );
}

export default WeatherCard;