import {UtilisateurDeclare} from "@/models/utilisateur-declare";

export enum StatutContrat {
    ACTIF = 'ACTIF',
    BROUILLON = 'BROUILLON',
    RESILIE = 'RESILIE'
}

export type Titulaire = {
    nomNaissance: string,
    nomUsage: string|undefined,
    prenom1: string,
    prenom2: string|undefined,
    dateNaissance: string,
    bp: string,
    codePostal: string,
    localite: string,
    utilisateursDeclares: UtilisateurDeclare[],
    statutContrat: StatutContrat,
    dateCreation: Date,
    dateMiseAJour: Date
}