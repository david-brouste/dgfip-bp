import {Page} from "@/models/page";
import fs from "fs";
import {Titulaire} from "@/models/titulaire";
import {normalizeLowerString, parseBooleanWithException, parseIntDefault} from "@/lib/utils";
import {DEFAULT_PAGE_SIZE, FIRST_PAGE} from "@/lib/constants";
import {UtilisateurDeclare} from "@/models/utilisateur-declare";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    let etendreNomNaissance: boolean;
    try {
        etendreNomNaissance = parseBooleanWithException(searchParams.get('etendreNomNaissance'), false);
    } catch (e) {
        const errorMessage = {
            error: 'etendreNomNaissance doit être du type boolean: ' + searchParams.get('etendreNomNaissance'),
            status: 400
        };
        return new Response(JSON.stringify(errorMessage), {status: 400});
    }

    const nom: string|undefined = normalizeLowerString(searchParams.get('nom'));
    const prenom: string|undefined = normalizeLowerString(searchParams.get('prenom'));
    const page: number = parseIntDefault(searchParams.get('page'), FIRST_PAGE);
    const size: number = parseIntDefault(searchParams.get('size'), DEFAULT_PAGE_SIZE);

    try {
        // Appliquez la recherche par nom et prénom
        let titulaireList: Titulaire[] = JSON.parse(fs.readFileSync(process.cwd() + '/public/db.json','utf-8'));
        if (nom) {
            titulaireList = titulaireList.filter(
                (titulaire: Titulaire) => {
                    const isIncludedInNomNaissance = !!normalizeLowerString(titulaire.nomNaissance)?.includes(nom);
                    const isIncludedInNomUsage = etendreNomNaissance && !!normalizeLowerString(titulaire.nomUsage)?.includes(nom);
                    const isIncludedInUtilisateursDeclares = titulaire.utilisateursDeclares
                        .map((utilisateurDeclare: UtilisateurDeclare) => normalizeLowerString(utilisateurDeclare.nom))
                        .some((nomUtilisateur: string|undefined) => nomUtilisateur?.includes(nom));
                    return isIncludedInNomNaissance || isIncludedInNomUsage || isIncludedInUtilisateursDeclares;
                }
            );
        }
        if (prenom) {
            titulaireList = titulaireList.filter(
                (titulaire: Titulaire) => {
                    const isIncludedInTitulaire = !!normalizeLowerString(titulaire.prenom1)?.includes(prenom) || !!normalizeLowerString(titulaire.prenom2)?.includes(prenom);
                    const isIncludedInUtilisateurDeclare = titulaire.utilisateursDeclares
                        .map((utilisateurDeclare: UtilisateurDeclare) => normalizeLowerString(utilisateurDeclare.prenom))
                        .some((prenomUtilisateur: string|undefined) => prenomUtilisateur?.includes(prenom));
                    return isIncludedInTitulaire || isIncludedInUtilisateurDeclare;
                }
            );
        }

        // Paginez les résultats
        const titulairePage: Page<Titulaire> = new Page<Titulaire>(titulaireList, page, size);

        return Response.json(titulairePage);
    } catch (e) {
        const errorMessage = {
            error: 'Une erreur interne s\'est produite',
            status: 500
        };
        return new Response(JSON.stringify(errorMessage), {status: 500});
    }
}