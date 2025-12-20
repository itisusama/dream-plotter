import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MapPin, X, Globe, Navigation, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LocationPresenter({
  data,
  loading,
}: {
  data: any[];
  loading: boolean;
}) {
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);

  // Toggle location selection
  const handleSelect = (location: any) => {
    setSelectedLocations((prev) => {
      const isAlreadySelected = prev.some((c) => c.id === location.id);
      if (isAlreadySelected) {
        return prev.filter((c) => c.id !== location.id);
      }
      return [...prev, location];
    });
  };

  // Check if location is selected
  const isSelected = (locationId: number) => {
    return selectedLocations.some((c) => c.id === locationId);
  };

  // Remove from selection box
  const removeFromSelection = (locationId: number) => {
    setSelectedLocations((prev) => prev.filter((c) => c.id !== locationId));
  };

  // Clear all selections
  const clearAll = () => {
    setSelectedLocations([]);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5 animate-pulse" />
            <p>Loading locations...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Selected Locations Box */}
          {selectedLocations.length > 0 && (
            <div className="m-4 p-4 border-2 border-dashed border-emerald-300 rounded-lg bg-emerald-50">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-emerald-800">
                  <Navigation className="h-5 w-5" />
                  Selected Locations ({selectedLocations.length})
                </h2>
                <button
                  onClick={clearAll}
                  className="text-sm text-emerald-600 hover:text-emerald-800 hover:underline"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedLocations.map((location) => (
                  <span
                    key={location.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-emerald-100 text-emerald-700 border border-emerald-200"
                  >
                    <MapPin className="w-3 h-3" />
                    {location.address}, {location.country}
                    <X
                      className="w-4 h-4 cursor-pointer hover:text-emerald-900 transition-colors"
                      onClick={() => removeFromSelection(location.id)}
                    />
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Location Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {data.map((location) => {
              const selected = isSelected(location.id);
              return (
                <Card
                  key={location.id}
                  onClick={() => handleSelect(location)}
                  className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
                    selected
                      ? "ring-2 ring-offset-2 ring-emerald-500 border-l-emerald-500 bg-emerald-50/50"
                      : "border-l-gray-300 hover:border-l-emerald-400"
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <Checkbox
                        checked={selected}
                        onCheckedChange={() => handleSelect(location)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1 border-emerald-500 data-[state=checked]:bg-emerald-500"
                      />

                      {/* Location Icon */}
                      <div
                        className={`p-2 rounded-full ${
                          selected
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <MapPin className="h-4 w-4" />
                      </div>

                      {/* Country Badge */}
                      <Badge
                        variant="secondary"
                        className="ml-auto flex items-center gap-1"
                      >
                        <Globe className="h-3 w-3" />
                        {location.country}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Address */}
                    <div className="flex items-start gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground leading-relaxed">
                        {location.address}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          {/* Empty State */}
          {data.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No locations found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}