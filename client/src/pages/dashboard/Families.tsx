import { useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ui } from "@/imports/ui";
import { Icon } from "@/lib/icons";
import { hook } from "@/imports/hook";
import { dashboardComponent } from "@/components";
import type { Character, Location } from "@/types";

export default function Families() {
  const customization = hook.useCustomization();
  const familyStore = hook.useFamilyStore();

  const [newFamilyName, setNewFamilyName] = useState("");
  const [activeItem, setActiveItem] = useState<{
    type: "character" | "location";
    data: Character | Location;
  } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { type, character, location } = active.data.current as any;

    if (type === "character") {
      setActiveItem({ type: "character", data: character });
    } else if (type === "location") {
      setActiveItem({ type: "location", data: location });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.data.current?.type === "family") {
      const familyId = over.data.current.familyId;
      const activeData = active.data.current as any;

      if (activeData.type === "character") {
        // Add character to family and REMOVE from customizing list
        familyStore.addCharacterToFamily(familyId, activeData.character);
        customization.removeCustomizingCharacter(activeData.character.id);
      } else if (activeData.type === "location") {
        // Add location to family but KEEP in customizing list
        familyStore.addLocationToFamily(familyId, activeData.location);
      }
    }

    setActiveItem(null);
  };

  const handleCreateFamily = () => {
    if (newFamilyName.trim()) {
      familyStore.createFamily(newFamilyName.trim());
      setNewFamilyName("");
    }
  };

  const hasCharacters = customization.customizingCharacters.length > 0;
  const hasLocations = customization.customizingLocations.length > 0;
  const hasFamilies = familyStore.families.length > 0;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
                      {customization.customizingCharacters.length}
                    </ui.Badge>
                  </div>

                  {!hasCharacters ? (
                    <p className="text-xs text-muted-foreground text-center py-2">
                      No characters available
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {customization.customizingCharacters.map((character) => (
                        <dashboardComponent.DraggableCharacter
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
                      {customization.customizingLocations.length}
                    </ui.Badge>
                  </div>

                  {!hasLocations ? (
                    <p className="text-xs text-muted-foreground text-center py-2">
                      No locations available
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {customization.customizingLocations.map((location) => (
                        <dashboardComponent.DraggableLocation
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
                    value={newFamilyName}
                    onChange={(e) => setNewFamilyName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateFamily()}
                    className="flex-1"
                  />
                  <ui.Button onClick={handleCreateFamily} disabled={!newFamilyName.trim()}>
                    <Icon.Plus className="h-4 w-4 mr-2" />
                    Create Family
                  </ui.Button>
                </div>
              </ui.CardContent>
            </ui.Card>

            {/* Families Grid */}
            {!hasFamilies ? (
              <dashboardComponent.EmptyBlock
                heading="No families created"
                description="Create a family above and drag characters and locations into it."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {familyStore.families.map((family) => (
                  <dashboardComponent.FamilyBox key={family.id} family={family} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeItem?.type === "character" && (
          <div
            className={`flex items-center gap-2 p-2 rounded-lg border shadow-lg ${
              (activeItem.data as Character).gender === "Male"
                ? "bg-blue-50 border-blue-300"
                : "bg-pink-50 border-pink-300"
            }`}
          >
            <Icon.Users className="h-3 w-3" />
            <span className="text-sm font-medium">
              {(activeItem.data as Character).firstName}{" "}
              {(activeItem.data as Character).lastName}
            </span>
          </div>
        )}
        {activeItem?.type === "location" && (
          <div className="flex items-center gap-2 p-2 rounded-lg border shadow-lg bg-emerald-50 border-emerald-300">
            <Icon.MapPin className="h-3 w-3" />
            <span className="text-sm font-medium">
              {(activeItem.data as Location).address}
            </span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}