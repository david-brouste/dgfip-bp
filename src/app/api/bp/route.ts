import {Page} from "@/models/page";
import fs from "fs";
import {Titulaire} from "@/models/titulaire";
import {normalizeLowerString, parseBoolean, parseIntDefault} from "@/lib/utils";
import {DEFAULT_PAGE_SIZE, FIRST_PAGE} from "@/lib/constants";
import {UtilisateurDeclare} from "@/models/utilisateur-declare";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const nom: string|undefined = normalizeLowerString(searchParams.get('nom'));
    const extendNomUsage: boolean = parseBoolean(searchParams.get('extendNomUsage'));
    const prenom: string|undefined = normalizeLowerString(searchParams.get('prenom'));
    const page: number = parseIntDefault(searchParams.get('page'), FIRST_PAGE);
    const pageSize: number = parseIntDefault(searchParams.get('pageSize'), DEFAULT_PAGE_SIZE);

    // Appliquez la recherche par nom et prénom
    let titulaireList: Titulaire[] = JSON.parse(fs.readFileSync(process.cwd() + '/public/db.json','utf-8'));
    if (nom) {
        titulaireList = titulaireList.filter(
            (titulaire: Titulaire) => {
                const isIncludedInNomNaissance = !!normalizeLowerString(titulaire.nomNaissance)?.includes(nom);
                const isIncludedInNomUsage = extendNomUsage && !!normalizeLowerString(titulaire.nomUsage)?.includes(nom);
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
    const titulairePage: Page<Titulaire> = new Page<Titulaire>(titulaireList, page, pageSize);

    return Response.json(titulairePage);
}