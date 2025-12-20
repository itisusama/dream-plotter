import { useEffect, useState } from "react"
import { fetchAPI } from "@/functions/fetch-function";
import CharacterPresenter from "./character-presenter";
import LocationPresenter from "./location-presenter";

export default function FetchContainer ({mode} : { mode: string } ) {
    const [charactersData, setCharactersData] = useState<any[]>([]);
    const [locationsData, setLocationsData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCharactersData = async () => {
        const character = await fetchAPI("https://api-repo-rho.vercel.app/people.json", setLoading)
        if(character){setCharactersData(character)}
    }
    const fetchLocationsData = async () => {
        const location = await fetchAPI("https://api-repo-rho.vercel.app/location.json", setLoading)
        if(location){setLocationsData(location)}
    }


    useEffect(() => {
        async function load() {
            if (mode === "characters") await fetchCharactersData();
            if (mode === "locations") await fetchLocationsData();
            setLoading(false);
        }

        load();
    }, [mode]);

    return (
        <>
            {mode === "characters" && (<CharacterPresenter data={charactersData} loading={loading} />)}
            {mode === "locations" && (<LocationPresenter data={locationsData} loading={loading} />)}
        </>
    )
}