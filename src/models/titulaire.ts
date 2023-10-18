import {UtilisateurDeclare} from "@/models/utilisateur-declare";

export type Titulaire = {
    nomNaissance: string,
    nomUsage: string|undefined,
    prenom1: string,
    prenom2: string|undefined,
    dateNaissance: Date,
    utilisateursDeclares: UtilisateurDeclare[]
}