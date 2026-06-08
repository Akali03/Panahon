import {
  Cloud,
  Droplet,
  Wind,
} from "lucide-react";

function WeatherSkeleton() {
  const skeletonCards = [
     { title: "Condition", value: "Loading...", icon: Cloud },
     { title: "Humidity", value: "Loading...", icon: Droplet },
     { title: "Wind Speed", value: "Loading...", icon: Wind },
     { title: "Icon", value: "Loading..." },
   ];
   return (
     <>
       {/* Temperature Section */}
       <div className="flex items-end gap-6 mt-1 animate-pulse">
         <div className="flex items-end gap-2">
           <div className="w-5 h-5 rounded bg-gray-200 dark:bg-gray-700" />
           <div className="h-16 w-28 rounded bg-gray-200 dark:bg-gray-700" />
         </div>
       </div>

  
       {/* Weather Cards Skeleton */}
       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
         {skeletonCards.map((card, index) => (
           <div
            key={index}
            className="flex-1 min-w-10 sm:min-w-11.25 border border-border rounded-lg p-4 animate-pulse"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" /> {/* Title */}
              {card.icon && <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700" />} {/* Icon */}
            </div>
            <div className="h-6 w-24 rounded bg-gray-200 dark:bg-gray-700" /> {/* Value */}
          </div>
         ))}
       </div>
     </>
   );
}

export default WeatherSkeleton;