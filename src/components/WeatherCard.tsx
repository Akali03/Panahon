import {type LucideIcon } from "lucide-react";

interface WeatherCardProps{
    title: string;
    value: string;
    icon?: LucideIcon
}


function WeatherCard({ title, value, icon: Icon }: WeatherCardProps) {
  return (
  <div className="flex-1 min-w-[40] sm:min-w-[45] bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-muted-foreground text-md">
          {title}
        </span>
      {Icon && (
          <Icon className="w-4 h-4 text-muted-foreground" />
        )}      </div>

      <div className="text-foreground">
         <span className="text-muted-foreground text-sm">
          {value}
        </span>
      </div>
    </div>
  );
}

export default WeatherCard;