import { ui } from "@/imports/ui";
import { Icon } from "@/lib/icons"

export default function SectionHeader({heading, description = "Click to move to customization area", count}:{heading: string, description?: string, count: number}) {
  return (
    <ui.CardHeader className="pb-2">
      <ui.CardTitle className="flex items-center gap-2">
        <Icon.Users className="h-5 w-5 text-violet-600" />
        {heading}
        <ui.Badge variant="secondary">
          {count}
        </ui.Badge>
      </ui.CardTitle>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </ui.CardHeader>
  );
}
