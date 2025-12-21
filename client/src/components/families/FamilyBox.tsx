// src/components/families/FamilyBox.tsx
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@/lib/icons";
import { useFamilyStore } from "@/store/useFamilyStore";

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

export default function FamilyBox({ family }: { family: Family }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(family.name);
  const [copied, setCopied] = useState(false);

  const {
    deleteFamily,
    renameFamily,
    removeCharacterFromFamily,
    removeLocationFromFamily,
  } = useFamilyStore();

  const { isOver, setNodeRef } = useDroppable({
    id: `family-${family.id}`,
    data: {
      type: "family",
      familyId: family.id,
    },
  });

  const handleRename = () => {
    if (name.trim()) {
      renameFamily(family.id, name.trim());
    }
    setIsEditing(false);
  };

  const handleCopyJSON = async () => {
    const familyData = {
      name: family.name,
      characters: family.characters.map((c) => ({
        id: c.id,
        firstName: c.firstName,
        lastName: c.lastName,
        gender: c.gender,
      })),
      locations: family.locations.map((l) => ({
        id: l.id,
        country: l.country,
        address: l.address,
      })),
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(familyData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      className={`transition-all ${
        isOver
          ? "ring-2 ring-primary ring-offset-2 bg-primary/5"
          : "hover:shadow-md"
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          {isEditing ? (
            <div className="flex items-center gap-2 flex-1">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={(e) => e.key === "Enter" && handleRename()}
                className="h-8"
                autoFocus
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Icon.Home className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">{family.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6 p-0"
              >
                <Icon.Pencil className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            {/* Copy JSON Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyJSON}
                    className={`h-6 w-6 p-0 ${
                      copied
                        ? "text-green-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {copied ? (
                      <Icon.Check className="h-3 w-3" />
                    ) : (
                      <Icon.Copy className="h-3 w-3" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? "Copied!" : "Copy as JSON"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Delete Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteFamily(family.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0"
            >
              <Icon.Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Drop Hint */}
        {isOver && (
          <p className="text-xs text-primary animate-pulse">
            Drop here to add to family
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Characters in Family */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <Icon.Users className="h-3 w-3 text-violet-600" />
            <span className="text-xs font-medium text-muted-foreground">
              Characters
            </span>
            <Badge variant="secondary" className="h-4 text-xs px-1">
              {family.characters.length}
            </Badge>
          </div>

          {family.characters.length === 0 ? (
            <div className="border-2 border-dashed rounded-lg p-2 text-center">
              <p className="text-xs text-muted-foreground">
                Drag characters here
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {family.characters.map((character) => {
                const isMale = character.gender === "Male";
                return (
                  <div
                    key={character.id}
                    className={`flex items-center gap-2 p-1.5 rounded border text-sm ${
                      isMale
                        ? "bg-blue-50 border-blue-200"
                        : "bg-pink-50 border-pink-200"
                    }`}
                  >
                    {isMale ? (
                      <Icon.Mars className="h-3 w-3 text-blue-600" />
                    ) : (
                      <Icon.Venus className="h-3 w-3 text-pink-600" />
                    )}
                    <span className="flex-1 truncate">
                      {character.firstName} {character.lastName}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        removeCharacterFromFamily(family.id, character.id)
                      }
                      className="h-5 w-5 p-0 text-red-400 hover:text-red-600"
                    >
                      <Icon.X className="h-3 w-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Locations in Family */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <Icon.MapPin className="h-3 w-3 text-emerald-600" />
            <span className="text-xs font-medium text-muted-foreground">
              Locations
            </span>
            <Badge variant="secondary" className="h-4 text-xs px-1">
              {family.locations.length}
            </Badge>
          </div>

          {family.locations.length === 0 ? (
            <div className="border-2 border-dashed rounded-lg p-2 text-center">
              <p className="text-xs text-muted-foreground">
                Drag locations here
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {family.locations.map((location) => (
                <div
                  key={location.id}
                  className="flex items-center gap-2 p-1.5 rounded border text-sm bg-emerald-50 border-emerald-200"
                >
                  <Icon.MapPin className="h-3 w-3 text-emerald-600" />
                  <span className="flex-1 truncate">{location.address}</span>
                  <span className="text-xs text-muted-foreground">
                    {location.country}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      removeLocationFromFamily(family.id, location.id)
                    }
                    className="h-5 w-5 p-0 text-red-400 hover:text-red-600"
                  >
                    <Icon.X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}