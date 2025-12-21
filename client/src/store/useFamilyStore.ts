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

interface Family {
  id: string;
  name: string;
  characters: Character[];
  locations: Location[];
}

interface FamilyState {
  families: Family[];
  createFamily: (name: string) => void;
  deleteFamily: (familyId: string) => void;
  renameFamily: (familyId: string, name: string) => void;
  addCharacterToFamily: (familyId: string, character: Character) => void;
  removeCharacterFromFamily: (familyId: string, characterId: number) => void;
  addLocationToFamily: (familyId: string, location: Location) => void;
  removeLocationFromFamily: (familyId: string, locationId: number) => void;
}

export const useFamilyStore = create<FamilyState>((set) => ({
  families: [],

  createFamily: (name) =>
    set((state) => ({
      families: [
        ...state.families,
        {
          id: crypto.randomUUID(),
          name,
          characters: [],
          locations: [],
        },
      ],
    })),

  deleteFamily: (familyId) =>
    set((state) => ({
      families: state.families.filter((f) => f.id !== familyId),
    })),

  renameFamily: (familyId, name) =>
    set((state) => ({
      families: state.families.map((f) =>
        f.id === familyId ? { ...f, name } : f
      ),
    })),

  addCharacterToFamily: (familyId, character) =>
    set((state) => ({
      families: state.families.map((f) =>
        f.id === familyId
          ? { ...f, characters: [...f.characters, character] }
          : f
      ),
    })),

  removeCharacterFromFamily: (familyId, characterId) =>
    set((state) => ({
      families: state.families.map((f) =>
        f.id === familyId
          ? {
              ...f,
              characters: f.characters.filter((c) => c.id !== characterId),
            }
          : f
      ),
    })),

  addLocationToFamily: (familyId, location) =>
    set((state) => ({
      families: state.families.map((f) => {
        if (f.id !== familyId) return f;
        // Prevent duplicate locations in same family
        const alreadyExists = f.locations.some((l) => l.id === location.id);
        if (alreadyExists) return f;
        return { ...f, locations: [...f.locations, location] };
      }),
    })),

  removeLocationFromFamily: (familyId, locationId) =>
    set((state) => ({
      families: state.families.map((f) =>
        f.id === familyId
          ? {
              ...f,
              locations: f.locations.filter((l) => l.id !== locationId),
            }
          : f
      ),
    })),
}));