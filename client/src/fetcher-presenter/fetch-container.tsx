import { useQuery } from "@tanstack/react-query";
import CharacterPresenter from "./character-presenter";
import LocationPresenter from "./location-presenter";

const fetchData = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export default function FetchContainer({ mode }: { mode: string }) {
  const { data: charactersData, isLoading: charactersLoading} = useQuery({
    queryKey: ["characters"],
    queryFn: () => fetchData("https://api-repo-rho.vercel.app/people.json"),
    enabled: mode === "characters",
  });

  const {data: locationsData, isLoading: locationsLoading} = useQuery({
    queryKey: ["locations"],
    queryFn: () => fetchData("https://api-repo-rho.vercel.app/location.json"),
    enabled: mode === "locations",
  });

  return (
    <>
      {mode === "characters" && (<CharacterPresenter data={charactersData || []} loading={charactersLoading} />)}
      {mode === "locations" && (<LocationPresenter data={locationsData || []} loading={locationsLoading} />)}
    </>
  );
}