import { ui } from "@/imports/ui";

export default function EmptyBlock({ heading, description }: {heading?: string, description: string}) {
  return (
    <ui.Card className="border-dashed">
      <ui.CardContent className="flex flex-col items-center justify-center py-12">
        <h3 className="text-lg font-semibold">{heading}</h3>
        <p className="text-muted-foreground text-center mt-2">
          {description}
        </p>
      </ui.CardContent>
    </ui.Card>
  );
}
