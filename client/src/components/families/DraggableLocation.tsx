import { useDraggable } from "@dnd-kit/core";
import { Icon } from "@/lib/icons";

interface Location {
  id: number;
  country: string;
  address: string;
}

export default function DraggableLocation({ location }: { location: Location }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `location-${location.id}`,
      data: {
        type: "location",
        location,
      },
    });

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
      className={`flex items-center gap-2 p-2 rounded-lg border cursor-grab active:cursor-grabbing transition-all bg-emerald-50 border-emerald-200 hover:border-emerald-400 ${
        isDragging ? "opacity-50 scale-105 shadow-lg z-50" : ""
      }`}
    >
      <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-600">
        <Icon.MapPin className="h-3 w-3" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{location.address}</p>
        <p className="text-xs text-muted-foreground truncate">
          {location.country}
        </p>
      </div>
      <Icon.GripVertical className="h-3 w-3 text-muted-foreground" />
    </div>
  );
}