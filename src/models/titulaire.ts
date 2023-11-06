import {UtilisateurDeclare} from "@/models/utilisateur-declare";

export type Titulaire = {
    id: number,
    nomNaissance: string,
    nomUsage: string|undefined,
    prenom1: string,
    prenom2: string|undefined,
    dateNaissance: string,
    bp: string,
    codePostal: number,
    localite: string,
    utilisateursDeclares: UtilisateurDeclare[],
    dateMiseAJour: Date
}