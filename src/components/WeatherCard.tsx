
interface WeatherCardProps {
  title: string;
  value: string;
}

function WeatherCard({ title, value }: WeatherCardProps) {
  return (
  <div className="flex-1 bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-muted-foreground text-sm">
          {title}
        </span>
      </div>

      <div className="text-foreground text-2xl">
        {value}
      </div>
    </div>
  );
}

export default WeatherCard;