import {UtilisateurDeclare} from "@/models/utilisateur-declare";

export enum StatutContrat {
    ACTIF = 'ACTIF',
    BROUILLON = 'BROUILLON',
    RESILIE = 'RESILIE'
}

export type Titulaire = {
    nomNaissance: string|null,
    nomUsage: string,
    prenom1: string,
    prenom2: string|null,
    dateNaissance: string,
    bp: string,
    codePostal: string,
    localite: string,
    utilisateursDeclares: UtilisateurDeclare[],
    statutContrat: StatutContrat,
    dateCreation: Date,
    dateMiseAJour: Date
}