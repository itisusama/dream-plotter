import { useEffect, useState } from "react"
import { fetchAPI } from "@/functions/fetch-function";
import CharacterPresenter from "./character-presenter";

export default function FetchContainer ({mode} : { mode: string } ) {
    const [charactersData, setCharactersData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCharactersData = async () => {
        const character = await fetchAPI("https://api-repo-rho.vercel.app/people.json", setLoading)
        if(character){setCharactersData(character)}
    }


    useEffect(() => {
        async function load() {
            if (mode === "characters") await fetchCharactersData();
            setLoading(false);
        }

        load();
    }, [mode]);

    return (
        <>
            {mode === "characters" && (<CharacterPresenter data={charactersData} loading={loading} />)}
        </>
    )
}