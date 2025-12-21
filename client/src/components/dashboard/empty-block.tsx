import { Card, CardContent } from "../ui/card";

export default function EmptyBlock({ heading, description }: {heading?: string, description: string}) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <h3 className="text-lg font-semibold">{heading}</h3>
        <p className="text-muted-foreground text-center mt-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
