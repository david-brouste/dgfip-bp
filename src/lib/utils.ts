import {Titulaire} from "@/models/titulaire";
import {fakerFR, SexType} from '@faker-js/faker';
import {UtilisateurDeclare} from "@/models/utilisateur-declare";

export function randomBoolean(): boolean {
    return Math.random() < 0.5;
}

export function random(start: number, end: number): number {
    return Math.floor(Math.random() * end) + start;
}
export function generateTitulaire(nbTitulaire: number): Titulaire[] {
    return fakerFR.helpers.multiple(createRandomTitulaire, {count: nbTitulaire});
}

export function createRandomTitulaire(): Titulaire {
    const dateNaissance = fakerFR.date.birthdate();
    dateNaissance.setHours(0, 0, 0, 0);
    const sexType: SexType = fakerFR.person.sexType();
    const isNomUsage = randomBoolean();
    const isPrenom2 = randomBoolean();
    const isUtilisateurDeclare = Math.random() < 0.3;
    const nbUtilisateursDeclares = random(1, 9);
    return {
        nomNaissance: fakerFR.person.lastName(sexType),
        nomUsage: sexType === 'female' && isNomUsage ? fakerFR.person.lastName(sexType) : undefined,
        prenom1: fakerFR.person.firstName(sexType),
        prenom2: isPrenom2 ? fakerFR.person.middleName(sexType) : undefined,
        dateNaissance: dateNaissance,
        utilisateursDeclares: isUtilisateurDeclare ?
            fakerFR.helpers.multiple(createRandomUtilisateurDeclare, {count: nbUtilisateursDeclares}) :
            []
    }
}

export function createRandomUtilisateurDeclare(): UtilisateurDeclare {
    return {
        nom: fakerFR.person.lastName(),
        prenom: fakerFR.person.firstName()
    }
}

export function parseIntDefault(input: string|undefined|null, defaultValue: number):number {
    try {
        return input ? parseInt(input) : defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

export function parseBoolean(input: string|undefined|null): boolean {
    return !!input && input.toLowerCase() === 'true';
}