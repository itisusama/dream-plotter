import useCustomization from "@/hooks/useCustomization";
import EmptyBlock from "@/components/dashboard/empty-block";
import MapCharacters from "@/components/dashboard/maps/map-character";
import MapLocations from "@/components/dashboard/maps/map-locations";
import MapCustomization from "@/components/dashboard/maps/map-customization";
import SectionHeader from "@/components/dashboard/section-header";
import CustomizationSlot from "@/components/dashboard/customization-slot";

export const dashboardComponent = {
useCustomization,
EmptyBlock,
MapCharacters,
MapLocations,
MapCustomization,
SectionHeader,
CustomizationSlot,
}