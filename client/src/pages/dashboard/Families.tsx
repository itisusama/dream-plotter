import { DndContext, DragOverlay } from "@dnd-kit/core";
import { ui } from "@/imports/ui";
import { Icon } from "@/lib/icons";
import { dashboardComponent } from "@/components";
import type { Character, Location } from "@/types";
import { hook } from "@/imports/hook";

export default function Families() {
  const family = hook.useFamily();
  const l = family.customization.customizingLocations;
  const c = family.customization.customizingCharacters;
  const d = dashboardComponent;
  const f = family.familyStore.families

  return (
    <DndContext
      sensors={family.sensors}
      onDragStart={family.handleDragStart}
      onDragEnd={family.handleDragEnd}
    >
      <div className="p-4 h-full">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Icon.Home className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Families</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-[calc(100vh-120px)]">
          <div className="lg:col-span-1 space-y-4 overflow-y-auto">
            <ui.Card className="border-2 border-dashed">
              <ui.CardHeader className="pb-2">
                <ui.CardTitle className="text-sm flex items-center gap-2">
                  <Icon.List className="h-4 w-4" />
                  Items to Work With
                </ui.CardTitle>
              </ui.CardHeader>
              <ui.CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Icon.Users className="h-3 w-3 text-violet-600" />
                    <span className="text-xs font-medium">Characters</span>
                    <ui.Badge variant="secondary" className="h-4 text-xs px-1">
                      {c.length}
                    </ui.Badge>
                  </div>

                  {!family.hasCharacters ? (
                    <p className="text-xs text-muted-foreground text-center py-2">
                      No characters available
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {c.map((character) => (
                        <d.DraggableCharacter
                          key={character.id}
                          character={character}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Locations List */}
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Icon.MapPin className="h-3 w-3 text-emerald-600" />
                    <span className="text-xs font-medium">Locations</span>
                    <ui.Badge variant="secondary" className="h-4 text-xs px-1">
                      {l.length}
                    </ui.Badge>
                  </div>

                  {!family.hasLocations ? (
                    <p className="text-xs text-muted-foreground text-center py-2">
                      No locations available
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {l.map((location) => (
                        <d.DraggableLocation
                          key={location.id}
                          location={location}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </ui.CardContent>
            </ui.Card>

            {/* Hint */}
            <div className="p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
              <p className="font-medium mb-1">💡 Tips:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Drag characters to families (removed from list)</li>
                <li>Drag locations to families (stays in list)</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4 overflow-y-auto">
            {/* Create Family */}
            <ui.Card>
              <ui.CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <ui.Input
                    placeholder="Enter family name..."
                    value={family.newFamilyName}
                    onChange={(e) => family.setNewFamilyName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && family.handleCreateFamily()}
                    className="flex-1"
                  />
                  <ui.Button onClick={family.handleCreateFamily} disabled={!family.newFamilyName.trim()}>
                    <Icon.Plus className="h-4 w-4 mr-2" />
                    Create Family
                  </ui.Button>
                </div>
              </ui.CardContent>
            </ui.Card>

            {/* Families Grid */}
            {!family.hasFamilies ? (
              <d.EmptyBlock
                heading="No families created"
                description="Create a family above and drag characters and locations into it."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {f.map((family) => (
                  <d.FamilyBox key={family.id} family={family} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {family.activeItem?.type === "character" && (
          <div
            className={`flex items-center gap-2 p-2 rounded-lg border shadow-lg ${
              (family.activeItem.data as Character).gender === "Male"
                ? "bg-blue-50 border-blue-300"
                : "bg-pink-50 border-pink-300"
            }`}
          >
            <Icon.Users className="h-3 w-3" />
            <span className="text-sm font-medium">
              {(family.activeItem.data as Character).firstName}{" "}
              {(family.activeItem.data as Character).lastName}
            </span>
          </div>
        )}
        {family.activeItem?.type === "location" && (
          <div className="flex items-center gap-2 p-2 rounded-lg border shadow-lg bg-emerald-50 border-emerald-300">
            <Icon.MapPin className="h-3 w-3" />
            <span className="text-sm font-medium">
              {(family.activeItem.data as Location).address}
            </span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}