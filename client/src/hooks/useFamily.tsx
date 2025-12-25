import { useState } from "react";
import {
  type DragEndEvent,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { hook } from "@/imports/hook";
import type { Character, Location } from "@/types";

export default function useFamily(){
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
    return {hasCharacters, hasLocations, hasFamilies, handleCreateFamily, handleDragEnd, handleDragStart, activeItem, sensors, customization, familyStore, setNewFamilyName, newFamilyName, location }
}