import { ui } from "@/imports/ui";
import { Icon } from "@/lib/icons";
import { useSelectionStore } from "@/store/useSelectionStore";

export default function CharacterPresenter({
  data,
  loading,
}: {
  data: any[];
  loading: boolean;
}) {
  const selection = useSelectionStore();

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon.Users className="h-5 w-5 animate-pulse" />
            <p>Loading characters...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Selected Characters Box */}
          {selection.selectedCharacters.length > 0 && (
            <div className="m-4 p-4 border-2 border-dashed border-violet-300 rounded-lg bg-violet-50">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-violet-800">
                  <Icon.Users className="h-5 w-5" />
                  Selected Characters ({selection.selectedCharacters.length})
                </h2>
                <button
                  onClick={selection.clearCharacters}
                  className="text-sm text-violet-600 hover:text-violet-800 hover:underline"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selection.selectedCharacters.map((character) => (
                  <span
                    key={character.id}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border ${
                      character.gender === "Male"
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : "bg-pink-100 text-pink-700 border-pink-200"
                    }`}
                  >
                    {character.gender === "Male" ? (
                      <Icon.Mars className="w-3 h-3" />
                    ) : (
                      <Icon.Venus className="w-3 h-3" />
                    )}
                    {character.firstName} {character.lastName}
                    <Icon.X
                      className="w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity"
                      onClick={() => selection.removeCharacter(character.id)}
                    />
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Character Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {data.map((character) => {
              const selected = selection.isCharacterSelected(character.id);
              const isMale = character.gender === "Male";

              return (
                <ui.Card
                  key={character.id}
                  onClick={() => selection.toggleCharacter(character)}
                  className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
                    selected
                      ? isMale
                        ? "ring-2 ring-offset-2 ring-blue-500 border-l-blue-500 bg-blue-50/50"
                        : "ring-2 ring-offset-2 ring-pink-500 border-l-pink-500 bg-pink-50/50"
                      : isMale
                        ? "border-l-blue-300 hover:border-l-blue-500"
                        : "border-l-pink-300 hover:border-l-pink-500"
                  }`}
                >
                  <ui.CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <ui.Checkbox
                        checked={selected}
                        onCheckedChange={() => selection.toggleCharacter(character)}
                        onClick={(e) => e.stopPropagation()}
                        className={`mt-1 ${
                          isMale
                            ? "border-blue-500 data-[state=checked]:bg-blue-500"
                            : "border-pink-500 data-[state=checked]:bg-pink-500"
                        }`}
                      />

                      {/* Gender Icon */}
                      <div
                        className={`p-2 rounded-full ${
                          isMale
                            ? selected
                              ? "bg-blue-100 text-blue-600"
                              : "bg-blue-50 text-blue-400"
                            : selected
                              ? "bg-pink-100 text-pink-600"
                              : "bg-pink-50 text-pink-400"
                        }`}
                      >
                        {isMale ? (
                          <Icon.Mars className="h-4 w-4" />
                        ) : (
                          <Icon.Venus className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </ui.CardHeader>

                  <ui.CardContent>
                    {/* Name */}
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">
                        {character.firstName} {character.lastName}
                      </p>
                    </div>
                  </ui.CardContent>
                </ui.Card>
              );
            })}
          </section>

          {/* Empty State */}
          {data.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Icon.Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No characters found</h3>
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