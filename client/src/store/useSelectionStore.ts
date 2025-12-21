import { create } from "zustand";

interface Character {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
}

interface Location {
  id: number;
  country: string;
  address: string;
}

interface SelectionState {
  // Selected Characters
  selectedCharacters: Character[];
  toggleCharacter: (character: Character) => void;
  removeCharacter: (characterId: number) => void;
  clearCharacters: () => void;
  isCharacterSelected: (characterId: number) => boolean;

  // Selected Locations
  selectedLocations: Location[];
  toggleLocation: (location: Location) => void;
  removeLocation: (locationId: number) => void;
  clearLocations: () => void;
  isLocationSelected: (locationId: number) => boolean;

  // Customizing Characters
  customizingCharacters: Character[];
  moveCharacterToCustomization: (characterId: number) => void;
  moveCharacterBackToSelected: (characterId: number) => void;
  updateCustomizingCharacter: (
    characterId: number,
    updates: Partial<Character>
  ) => void;
  removeCustomizingCharacter: (characterId: number) => void;

  // Customizing Locations
  customizingLocations: Location[];
  moveLocationToCustomization: (locationId: number) => void;
  moveLocationBackToSelected: (locationId: number) => void;
  updateCustomizingLocation: (
    locationId: number,
    updates: Partial<Location>
  ) => void;
  removeCustomizingLocation: (locationId: number) => void;

  // Clear All
  clearAll: () => void;
}

export const useSelectionStore = create<SelectionState>((set, get) => ({
  // Selected Characters
  selectedCharacters: [],

  toggleCharacter: (character) => {
    const { selectedCharacters } = get();
    const isSelected = selectedCharacters.some((c) => c.id === character.id);
    if (isSelected) {
      set({
        selectedCharacters: selectedCharacters.filter(
          (c) => c.id !== character.id
        ),
      });
    } else {
      set({ selectedCharacters: [...selectedCharacters, character] });
    }
  },

  removeCharacter: (characterId) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.filter(
        (c) => c.id !== characterId
      ),
    })),

  clearCharacters: () => set({ selectedCharacters: [] }),

  isCharacterSelected: (characterId) => {
    return get().selectedCharacters.some((c) => c.id === characterId);
  },

  // Selected Locations
  selectedLocations: [],

  toggleLocation: (location) => {
    const { selectedLocations } = get();
    const isSelected = selectedLocations.some((l) => l.id === location.id);
    if (isSelected) {
      set({
        selectedLocations: selectedLocations.filter(
          (l) => l.id !== location.id
        ),
      });
    } else {
      set({ selectedLocations: [...selectedLocations, location] });
    }
  },

  removeLocation: (locationId) =>
    set((state) => ({
      selectedLocations: state.selectedLocations.filter(
        (l) => l.id !== locationId
      ),
    })),

  clearLocations: () => set({ selectedLocations: [] }),

  isLocationSelected: (locationId) => {
    return get().selectedLocations.some((l) => l.id === locationId);
  },

  // Customizing Characters
  customizingCharacters: [],

  moveCharacterToCustomization: (characterId) => {
    const { selectedCharacters, customizingCharacters } = get();
    const character = selectedCharacters.find((c) => c.id === characterId);
    if (character) {
      set({
        selectedCharacters: selectedCharacters.filter(
          (c) => c.id !== characterId
        ),
        customizingCharacters: [...customizingCharacters, { ...character }],
      });
    }
  },

  moveCharacterBackToSelected: (characterId) => {
    const { selectedCharacters, customizingCharacters } = get();
    const character = customizingCharacters.find((c) => c.id === characterId);
    if (character) {
      set({
        customizingCharacters: customizingCharacters.filter(
          (c) => c.id !== characterId
        ),
        selectedCharacters: [...selectedCharacters, { ...character }],
      });
    }
  },

  updateCustomizingCharacter: (characterId, updates) =>
    set((state) => ({
      customizingCharacters: state.customizingCharacters.map((c) =>
        c.id === characterId ? { ...c, ...updates } : c
      ),
    })),

  removeCustomizingCharacter: (characterId) =>
    set((state) => ({
      customizingCharacters: state.customizingCharacters.filter(
        (c) => c.id !== characterId
      ),
    })),

  // Customizing Locations
  customizingLocations: [],

  moveLocationToCustomization: (locationId) => {
    const { selectedLocations, customizingLocations } = get();
    const location = selectedLocations.find((l) => l.id === locationId);
    if (location) {
      set({
        selectedLocations: selectedLocations.filter(
          (l) => l.id !== locationId
        ),
        customizingLocations: [...customizingLocations, { ...location }],
      });
    }
  },

  moveLocationBackToSelected: (locationId) => {
    const { selectedLocations, customizingLocations } = get();
    const location = customizingLocations.find((l) => l.id === locationId);
    if (location) {
      set({
        customizingLocations: customizingLocations.filter(
          (l) => l.id !== locationId
        ),
        selectedLocations: [...selectedLocations, { ...location }],
      });
    }
  },

  updateCustomizingLocation: (locationId, updates) =>
    set((state) => ({
      customizingLocations: state.customizingLocations.map((l) =>
        l.id === locationId ? { ...l, ...updates } : l
      ),
    })),

  removeCustomizingLocation: (locationId) =>
    set((state) => ({
      customizingLocations: state.customizingLocations.filter(
        (l) => l.id !== locationId
      ),
    })),

  // Clear All
  clearAll: () =>
    set({
      selectedCharacters: [],
      selectedLocations: [],
      customizingCharacters: [],
      customizingLocations: [],
    }),
}));