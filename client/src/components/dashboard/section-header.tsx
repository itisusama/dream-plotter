import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "../ui/card";
import { Icon } from "@/lib/icons"

export default function SectionHeader({heading, description = "Click to move to customization area", count}:{heading: string, description?: string, count: number}) {
  return (
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2">
        <Icon.Users className="h-5 w-5 text-violet-600" />
        {heading}
        <Badge variant="secondary">
          {count}
        </Badge>
      </CardTitle>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </CardHeader>
  );
}
