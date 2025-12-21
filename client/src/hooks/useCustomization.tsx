import { useSelectionStore } from "@/store/useSelectionStore";

export default function useCustomization() {
    const {
        // Selected
        selectedCharacters,
        selectedLocations,
        // Customizing
        customizingCharacters,
        customizingLocations,
        // Move functions
        moveCharacterToCustomization,
        moveCharacterBackToSelected,
        moveLocationToCustomization,
        moveLocationBackToSelected,
        // Update functions
        updateCustomizingCharacter,
        updateCustomizingLocation,
        // Remove functions
        removeCustomizingCharacter,
        removeCustomizingLocation,
        // Clear
        clearAll,
      } = useSelectionStore();
    
      const hasSelections =
        selectedCharacters.length > 0 || selectedLocations.length > 0;
      const hasCustomizing =
        customizingCharacters.length > 0 || customizingLocations.length > 0;
      const hasAnything = hasSelections || hasCustomizing;

    return{
        selectedCharacters,
        selectedLocations,
        customizingCharacters,
        customizingLocations,
        moveCharacterToCustomization,
        moveCharacterBackToSelected,
        moveLocationToCustomization,
        moveLocationBackToSelected,
        updateCustomizingCharacter,
        updateCustomizingLocation,
        removeCustomizingCharacter,
        removeCustomizingLocation,
        clearAll, hasAnything, hasCustomizing, hasSelections
    }
}