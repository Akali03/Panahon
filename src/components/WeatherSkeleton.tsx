
function WeatherSkeleton() {
  return (
    <div className="max-w-xl mx-auto mt-10 p-4 space-y-4">
      <div className="h-5 w-32 bg-muted animate-pulse rounded" />

      <div className="h-10 w-full bg-muted animate-pulse rounded-lg" />

      <div className="h-16 w-40 bg-muted animate-pulse rounded" />

      <div className="flex gap-4 overflow-x-auto">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="min-w-[180px] bg-card border border-border rounded-lg p-4"
          >
            <div className="h-4 w-20 bg-muted animate-pulse rounded mb-3" />

            <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherSkeleton;