import {StatutContrat, Titulaire} from "@/models/titulaire";
import {fakerFR, SexType} from '@faker-js/faker';
import {UtilisateurDeclare} from "@/models/utilisateur-declare";
import {BP} from "@/models/bp";

const bpList: BP[] = [
    {
        "code": 98800,
        "localite": "NOUMEA"
    },
    {
        "code": 98801,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98802,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98803,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98804,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98805,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98806,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98807,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98809,
        "localite": "MONT DORE"
    },
    {
        "code": 98810,
        "localite": "MONT DORE"
    },
    {
        "code": 98811,
        "localite": "BELEP"
    },
    {
        "code": 98812,
        "localite": "BOULOUPARIS"
    },
    {
        "code": 98813,
        "localite": "CANALA"
    },
    {
        "code": 98814,
        "localite": "FAYAOUE"
    },
    {
        "code": 98815,
        "localite": "HIENGHENE"
    },
    {
        "code": 98816,
        "localite": "HOUAILOU"
    },
    {
        "code": 98817,
        "localite": "KAALA GOMEN"
    },
    {
        "code": 98818,
        "localite": "KOUAOUA"
    },
    {
        "code": 98819,
        "localite": "MOINDOU"
    },
    {
        "code": 98820,
        "localite": "WE"
    },
    {
        "code": 98821,
        "localite": "OUEGOA"
    },
    {
        "code": 98822,
        "localite": "POINDIMIE"
    },
    {
        "code": 98823,
        "localite": "PONERIHOUEN"
    },
    {
        "code": 98824,
        "localite": "POUEBO"
    },
    {
        "code": 98825,
        "localite": "POUEMBOUT"
    },
    {
        "code": 98826,
        "localite": "POUM"
    },
    {
        "code": 98827,
        "localite": "POYA"
    },
    {
        "code": 98828,
        "localite": "TADINE"
    },
    {
        "code": 98829,
        "localite": "THIO"
    },
    {
        "code": 98830,
        "localite": "DUMBEA"
    },
    {
        "code": 98831,
        "localite": "TOUHO"
    },
    {
        "code": 98832,
        "localite": "VAO"
    },
    {
        "code": 98833,
        "localite": "VOH"
    },
    {
        "code": 98834,
        "localite": "YATE"
    },
    {
        "code": 98835,
        "localite": "DUMBEA"
    },
    {
        "code": 98836,
        "localite": "DUMBEA GA"
    },
    {
        "code": 98837,
        "localite": "DUMBEA"
    },
    {
        "code": 98838,
        "localite": "PORO"
    },
    {
        "code": 98839,
        "localite": "DUMBEA"
    },
    {
        "code": 98840,
        "localite": "TONTOUTA"
    },
    {
        "code": 98841,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98843,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98844,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98845,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98846,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98847,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98848,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98849,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98850,
        "localite": "KOUMAC"
    },
    {
        "code": 98851,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98852,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98853,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98855,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98857,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98859,
        "localite": "KONE"
    },
    {
        "code": 98860,
        "localite": "KONE"
    },
    {
        "code": 98862,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98863,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98865,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98866,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98870,
        "localite": "BOURAIL"
    },
    {
        "code": 98874,
        "localite": "PONT DES FRANÇAIS"
    },
    {
        "code": 98875,
        "localite": "PLUM"
    },
    {
        "code": 98876,
        "localite": "LA COULEE"
    },
    {
        "code": 98877,
        "localite": "NEPOUI"
    },
    {
        "code": 98878,
        "localite": "LA ROCHE"
    },
    {
        "code": 98880,
        "localite": "LA FOA"
    },
    {
        "code": 98881,
        "localite": "FARINO"
    },
    {
        "code": 98882,
        "localite": "SARRAMEA"
    },
    {
        "code": 98883,
        "localite": "OUACO"
    },
    {
        "code": 98884,
        "localite": "CHEPENEHE"
    },
    {
        "code": 98885,
        "localite": "MOU"
    },
    {
        "code": 98889,
        "localite": "PAITA"
    },
    {
        "code": 98890,
        "localite": "PAITA"
    },
    {
        "code": 98895,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98897,
        "localite": "NOUMEA CEDEX"
    },
    {
        "code": 98899,
        "localite": "NOUMEA CEDEX "
    }
];

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
    const dateNaissance = fakerFR.date.birthdate().toISOString().split('T')[0];
    const sexType: SexType = fakerFR.person.sexType();
    const isNomUsage = randomBoolean();
    const isPrenom2 = randomBoolean();
    const isUtilisateurDeclare = Math.random() < 0.3;
    const nbUtilisateursDeclares = random(1, 9);
    const bp = bpList[random(0, bpList.length - 1)];
    const statutContrat = Math.random() < 0.7 ?
        StatutContrat.ACTIF :
        (Math.random() < 0.96 ? StatutContrat.RESILIE : StatutContrat.BROUILLON);
    return {
        nomNaissance: fakerFR.person.lastName(sexType).toUpperCase(),
        nomUsage: sexType === 'female' && isNomUsage ? fakerFR.person.lastName(sexType).toUpperCase(): undefined,
        prenom1: capitalizePrenom(fakerFR.person.firstName(sexType)) as string,
        prenom2: isPrenom2 ? capitalizePrenom(fakerFR.person.middleName(sexType)) : undefined,
        dateNaissance: dateNaissance,
        bp: fakerFR.location.zipCode('####').replace(/^0+/, ''),
        codePostal: bp.code,
        localite: bp.localite,
        utilisateursDeclares: isUtilisateurDeclare ?
            fakerFR.helpers.multiple(createRandomUtilisateurDeclare, {count: nbUtilisateursDeclares}) :
            [],
        statutContrat: statutContrat,
        dateCreation: fakerFR.date.past(),
        dateMiseAJour: fakerFR.date.past()
    }
}

export function createRandomUtilisateurDeclare(): UtilisateurDeclare {
    return {
        nom: fakerFR.person.lastName().toUpperCase(),
        prenom: capitalizePrenom(fakerFR.person.firstName()) as string
    }
}

export function parseIntDefault(input: string|undefined|null, defaultValue: number):number {
    try {
        return input ? parseInt(input) : defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

export function parseBooleanWithException(input: string|undefined|null, defaultValue: boolean): boolean {
    const lowercaseValue = input?.toLowerCase();
    if (lowercaseValue === undefined) {
        return defaultValue;
    }
    if (lowercaseValue === 'true' || lowercaseValue === '1') {
        return true;
    } else if (lowercaseValue === 'false' || lowercaseValue === '0') {
        return false;
    } else {
        throw new Error('La valeur doit être true, 1, false, ou 0 et non ' + input);
    }
}

export function normalizeLowerString(input: string | undefined | null): string|undefined {
    if (!input || input.trim() === '') {
        return undefined;
    }
    return input.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

export function capitalizePrenom(input: string | undefined | null): string | undefined {
    if (!input || input.trim() === '') {
        return undefined;
    }
    return input
        .split('-')
        .map((word: string) => capitalize(word))
        .join('-');
}

export function capitalize(input: string | undefined | null): string | undefined {
    if (!input || input.trim() === '') {
        return undefined;
    }
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}