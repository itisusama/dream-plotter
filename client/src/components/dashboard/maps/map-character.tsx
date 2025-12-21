import useCustomization from "@/hooks/useCustomization";
import { Icon } from "@/lib/icons";

export default function MapCharacters() {
    const customization = useCustomization();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {customization.selectedCharacters.map((character) => {
        const isMale = character.gender === "Male";
        return (
          <div
            key={character.id}
            onClick={() =>
              customization.moveCharacterToCustomization(character.id)
            }
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] ${
              isMale
                ? "bg-blue-50 border-blue-200 hover:border-blue-400"
                : "bg-pink-50 border-pink-200 hover:border-pink-400"
            }`}>
            <div
              className={`p-2 rounded-full ${
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
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {character.firstName} {character.lastName}
              </p>
            </div>
            <Icon.Pencil className="h-4 w-4 text-muted-foreground" />
          </div>
        );
      })}
    </div>
  );
}
