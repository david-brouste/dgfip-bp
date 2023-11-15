import fs from "fs";
import {generateTitulaire} from "@/lib/utils";
import path from "path";

export async function GET(): Promise<Response> {
    try {
        const nbTitulaires = 200;
        const fullPath: string = path.join(process.cwd(), 'src', 'lib', 'db.json');
        fs.writeFileSync(fullPath, JSON.stringify(generateTitulaire(nbTitulaires)));
        return new Response(JSON.stringify({message: 'OK', nbTitulaires: nbTitulaires}), {status: 200});
    } catch (e) {
        console.error(e);
        const errorMessage = {
            error: 'Une erreur s\'est produite lors de la génération des titulaires',
            status: 500
        };
        return new Response(JSON.stringify(errorMessage), {status: 500});
    }
}