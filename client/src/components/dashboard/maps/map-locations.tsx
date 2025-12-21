import useCustomization from "@/hooks/useCustomization";
import { Icon } from "@/lib/icons";

export default function MapLocations() {
    const customization = useCustomization();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {customization.selectedLocations.map((location) => (
        <div
          key={location.id}
          onClick={() => customization.moveLocationToCustomization(location.id)}
          className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] bg-emerald-50 border-emerald-200 hover:border-emerald-400">
          <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
            <Icon.MapPin className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{location.address}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Icon.Globe className="h-3 w-3" />
              {location.country}
            </p>
          </div>
          <Icon.Pencil className="h-4 w-4 text-muted-foreground" />
        </div>
      ))}
    </div>
  );
}
