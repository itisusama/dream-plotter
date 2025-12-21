import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCustomization from "@/hooks/useCustomization";
import { Icon } from "@/lib/icons";
import { Label } from "@radix-ui/react-label";

export default function MapCustomization() {
  const customization = useCustomization();
  return (
    <div>
      {/* Customizing Characters */}
      {customization.customizingCharacters.map((character) => {
        const isMale = character.gender === "Male";
        return (
          <div
            key={character.id}
            className={`p-4 rounded-lg border-2 space-y-3 ${
              isMale
                ? "bg-blue-50 border-blue-200"
                : "bg-pink-50 border-pink-200"
            }`}>
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`p-1.5 rounded-full ${
                    isMale
                      ? "bg-blue-100 text-blue-600"
                      : "bg-pink-100 text-pink-600"
                  }`}>
                  {isMale ? (
                    <Icon.Mars className="h-4 w-4" />
                  ) : (
                    <Icon.Venus className="h-4 w-4" />
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    customization.moveCharacterBackToSelected(character.id)
                  }
                  className="text-gray-500 hover:text-gray-700">
                  <Icon.ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    customization.removeCustomizingCharacter(character.id)
                  }
                  className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  <Icon.Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-2">
              <div>
                <Label htmlFor={`firstName-${character.id}`}>First Name</Label>
                <Input
                  id={`firstName-${character.id}`}
                  value={character.firstName}
                  onChange={(e) =>
                    customization.updateCustomizingCharacter(character.id, {
                      firstName: e.target.value,
                    })
                  }
                  className="bg-white"
                />
              </div>
              <div>
                <Label htmlFor={`lastName-${character.id}`}>Last Name</Label>
                <Input
                  id={`lastName-${character.id}`}
                  value={character.lastName}
                  onChange={(e) =>
                    customization.updateCustomizingCharacter(character.id, {
                      lastName: e.target.value,
                    })
                  }
                  className="bg-white"
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Customizing Locations */}
      {customization.customizingLocations.map((location) => (
        <div
          key={location.id}
          className="p-4 rounded-lg border-2 space-y-3 bg-emerald-50 border-emerald-200">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-600">
                <Icon.MapPin className="h-4 w-4" />
              </div>
              <span className="font-medium text-emerald-800">Location</span>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  customization.moveLocationBackToSelected(location.id)
                }
                className="text-gray-500 hover:text-gray-700">
                <Icon.ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  customization.removeCustomizingLocation(location.id)
                }
                className="text-red-500 hover:text-red-700 hover:bg-red-50">
                <Icon.Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="space-y-2">
            <div>
              <Label
                htmlFor={`country-${location.id}`}
                className="flex items-center gap-1">
                <Icon.Globe className="h-3 w-3" />
                Country
              </Label>
              <Input
                id={`country-${location.id}`}
                value={location.country}
                onChange={(e) =>
                  customization.updateCustomizingLocation(location.id, {
                    country: e.target.value,
                  })
                }
                className="bg-white"
              />
            </div>
            <div>
              <Label
                htmlFor={`address-${location.id}`}
                className="flex items-center gap-1">
                <Icon.Building2 className="h-3 w-3" />
                Address
              </Label>
              <Input
                id={`address-${location.id}`}
                value={location.address}
                onChange={(e) =>
                  customization.updateCustomizingLocation(location.id, {
                    address: e.target.value,
                  })
                }
                className="bg-white"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
