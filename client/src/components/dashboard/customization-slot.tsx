import useCustomization from "@/hooks/useCustomization";

export default function CustomizationSlot({
  headerArea,
  customizationArea,
  mapArea,
}: {
  headerArea: React.ReactNode;
  customizationArea: React.ReactNode;
  mapArea: React.ReactNode;
}) {
  const customization = useCustomization();
  return (
    <section className="p-4 space-y-4">
      {headerArea}
      {customization.hasAnything && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 space-y-4">{customizationArea}</div>
          <div className="lg:col-span-3 space-y-4">{mapArea}</div>
        </div>
      )}
    </section>
  );
}
