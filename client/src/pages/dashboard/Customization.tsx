import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icons";
import useCustomization from "@/hooks/useCustomization";
import { dashboardComponent } from "@/components";

export default function Customization() {
  const customization = useCustomization();
  const empty = "Select characters and locations from their respective pages to customize them here.";
  return (
    <dashboardComponent.CustomizationSlot
      headerArea={
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Icon.Settings className="h-6 w-6" />
              Customization
            </h1>
            {customization.hasAnything && (
              <Button
                variant="destructive"
                size="sm"
                onClick={customization.clearAll}>
                <Icon.Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
          {/* Empty State */}
          {!customization.hasAnything && (
            <dashboardComponent.EmptyBlock heading="No selections yet" description={empty} />
          )}
        </>
      }
      customizationArea={
        <>
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-2 border-orange-200 bg-orange-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Icon.Pencil className="h-5 w-5" />
                  Customization Area
                </CardTitle>
                <p className="text-sm text-orange-600">
                  Click on selected items to edit them here
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Empty Customization State */}
                {!customization.hasCustomizing && (
                  <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-orange-200 rounded-lg">
                    <Icon.Pencil className="h-8 w-8 text-orange-300 mb-2" />
                    <p className="text-sm text-orange-400">
                      Click on a selected item to customize it
                    </p>
                  </div>
                )}

                <dashboardComponent.MapCustomization />
              </CardContent>
            </Card>
          </div>
        </>
      }
      mapArea={
        <>
          {/* Selected Characters */}
          <Card>
            <dashboardComponent.SectionHeader
              heading="Selected Characters"
              count={customization.selectedCharacters.length}
            />
            <CardContent>
              {customization.selectedCharacters.length === 0 ? (
                <dashboardComponent.EmptyBlock description="No characters selected" />
              ) : (
                <dashboardComponent.MapCharacters />
              )}
            </CardContent>
          </Card>

          {/* Selected Locations */}
          <Card>
            <dashboardComponent.SectionHeader
              heading="Selected Characters"
              count={customization.selectedLocations.length}
            />
            <CardContent>
              {customization.selectedLocations.length === 0 ? (
                <dashboardComponent.EmptyBlock description="No location selected" />
              ) : (
                <dashboardComponent.MapLocations />
              )}
            </CardContent>
          </Card>
        </>
      }
    />
  );
}