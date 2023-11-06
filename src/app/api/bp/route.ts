import {Page} from "@/models/page";
import fs from "fs";
import {Titulaire} from "@/models/titulaire";
import {parseBoolean, parseIntDefault} from "@/lib/utils";
import {DEFAULT_PAGE_SIZE, FIRST_PAGE} from "@/lib/constants";
import {UtilisateurDeclare} from "@/models/utilisateur-declare";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const nom: string|null = searchParams.get('nom');
    const extendNomUsage: boolean = parseBoolean(searchParams.get('extendNomUsage'));
    const prenom: string|null = searchParams.get('prenom');
    const page: number = parseIntDefault(searchParams.get('page'), FIRST_PAGE);
    const pageSize: number = parseIntDefault(searchParams.get('pageSize'), DEFAULT_PAGE_SIZE);

    // Appliquez la recherche par nom et prénom
    let titulaireList: Titulaire[] = JSON.parse(fs.readFileSync(process.cwd() + '/public/db.json','utf-8'));
    if (nom) {
        titulaireList = titulaireList.filter(
            (titulaire: Titulaire) => {
                const isIncludedInNomNaissance = titulaire.nomNaissance.includes(nom);
                const isIncludedInNomUsage = extendNomUsage && !!titulaire.nomUsage?.includes(nom);
                const isIncludedInUtilisateursDeclares = titulaire.utilisateursDeclares
                    .map((utilisateurDeclare: UtilisateurDeclare) => utilisateurDeclare.nom).includes(nom);
                return isIncludedInNomNaissance || isIncludedInNomUsage || isIncludedInUtilisateursDeclares;
            }
        );
    }
    if (prenom) {
        titulaireList = titulaireList.filter(
            (titulaire: Titulaire) => {
                const isIncludedInTitulaire = titulaire.prenom1.includes(prenom) || titulaire.prenom2?.includes(prenom);
                const isIncludedInUtilisateurDeclare = titulaire.utilisateursDeclares
                    .map((utilisateurDeclare: UtilisateurDeclare) => utilisateurDeclare.prenom).includes(prenom);
                return isIncludedInTitulaire || isIncludedInUtilisateurDeclare;
            }
        );
    }

    // Paginez les résultats
    const titulairePage = new Page<Titulaire>(titulaireList, page, pageSize);

    return Response.json(titulairePage);
}