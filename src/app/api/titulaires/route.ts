import fs from "fs";
import {generateTitulaire} from "@/lib/utils";

export async function GET(): Promise<Response> {
    try {
        const nbTitulaires = 200;
        fs.writeFileSync(process.cwd() + '/public/db.json', JSON.stringify(generateTitulaire(nbTitulaires)));
        return new Response(JSON.stringify({message: 'OK', nbTitulaires: nbTitulaires}), {status: 200});
    } catch (e) {
        const errorMessage = {
            error: 'Une erreur s\'est produite lors de la génération des titulaires',
            status: 500
        };
        return new Response(JSON.stringify(errorMessage), {status: 500});
    }
}