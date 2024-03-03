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
            <div className="w-4/5 mx-auto flex items-center justify-center mt-6">
                <p className="text-center font-bold">Las constancias emitidas de forma digital a partir de febrero del 2024 cuentan con un folio único y la curp de la trabajadora. Con cualquiera de esos elementos es posible verificar si la constancia es legítima.</p>
            </div>
        </main>
    )
}