import { ui } from "@/imports/ui";
import { Icon } from "@/lib/icons";
import { hook } from "@/imports/hook";
import { dashboardComponent } from "@/components";

export default function Customization() {
  const customization = hook.useCustomization();
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
              <ui.Button
                variant="destructive"
                size="sm"
                onClick={customization.clearAll}>
                <Icon.Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </ui.Button>
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
            <ui.Card className="border-2 border-orange-200 bg-orange-50/50">
              <ui.CardHeader className="pb-2">
                <ui.CardTitle className="flex items-center gap-2 text-orange-800">
                  <Icon.Pencil className="h-5 w-5" />
                  Customization Area
                </ui.CardTitle>
                <p className="text-sm text-orange-600">
                  Click on selected items to edit them here
                </p>
              </ui.CardHeader>
              <ui.CardContent className="space-y-4">
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
              </ui.CardContent>
            </ui.Card>
          </div>
        </>
      }
      mapArea={
        <>
          {/* Selected Characters */}
          <ui.Card>
            <dashboardComponent.SectionHeader
              heading="Selected Characters"
              count={customization.selectedCharacters.length}
            />
            <ui.CardContent>
              {customization.selectedCharacters.length === 0 ? (
                <dashboardComponent.EmptyBlock description="No characters selected" />
              ) : (
                <dashboardComponent.MapCharacters />
              )}
            </ui.CardContent>
          </ui.Card>

          {/* Selected Locations */}
          <ui.Card>
            <dashboardComponent.SectionHeader
              heading="Selected Characters"
              count={customization.selectedLocations.length}
            />
            <ui.CardContent>
              {customization.selectedLocations.length === 0 ? (
                <dashboardComponent.EmptyBlock description="No location selected" />
              ) : (
                <dashboardComponent.MapLocations />
              )}
            </ui.CardContent>
          </ui.Card>
        </>
      }
    />
  );
}