import { useState } from "react";
import SearchBarComponent from "../modules/search-constancies/components/search-bar";
import ListConstancies from "../modules/search-constancies/components/list-constancies-component";

export default function SearchConstancies() {
    const [results, setResults] = useState<any[] | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <main className="flex flex-col items-center gap-8">
            <SearchBarComponent setResults={setResults} setLoading={setLoading} />
            <ListConstancies loading={loading} constancies={results} />
        </main>
    )
}