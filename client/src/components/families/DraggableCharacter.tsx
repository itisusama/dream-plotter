import { useDraggable } from "@dnd-kit/core";
import { Icon } from "@/lib/icons";

interface Character {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
}

export default function DraggableCharacter({
  character,
}: {
  character: Character;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `character-${character.id}`,
      data: {
        type: "character",
        character,
      },
    });

  const isMale = character.gender === "Male";

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 p-2 rounded-lg border cursor-grab active:cursor-grabbing transition-all ${
        isDragging ? "opacity-50 scale-105 shadow-lg z-50" : ""
      } ${
        isMale
          ? "bg-blue-50 border-blue-200 hover:border-blue-400"
          : "bg-pink-50 border-pink-200 hover:border-pink-400"
      }`}
    >
      <div
        className={`p-1.5 rounded-full ${
          isMale ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"
        }`}
      >
        {isMale ? (
          <Icon.Mars className="h-3 w-3" />
        ) : (
          <Icon.Venus className="h-3 w-3" />
        )}
      </div>
      <span className="text-sm font-medium truncate">
        {character.firstName} {character.lastName}
      </span>
      <Icon.GripVertical className="h-3 w-3 text-muted-foreground ml-auto" />
    </div>
  );
}