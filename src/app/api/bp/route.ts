import {NextApiRequest, NextApiResponse} from 'next';
import {generateTitulaire, Titulaire} from "@/lib/generate-data";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        nom,
        useNomUsage,
        prenom,
        page,
        pageSize
    } = req.query;

    // Appliquez la recherche par nom et prénom
    let filteredData: Titulaire[] = global._TITULAIRE_LIST_ as Titulaire[];
    if (nom) {
        filteredData = filteredData.filter(
            (titulaire: Titulaire) => {
                const isIncludedInNomNaissance = titulaire.nomNaissance.includes(nom);
                const isIncludedInNomUsage = useNomUsage && titulaire.nomUsage.includes(nom);
                return isIncludedInNomNaissance || isIncludedInNomUsage;
            }
        );
    }
    if (prenom) {
        filteredData = filteredData.filter(
            (titulaire: Titulaire) => titulaire.prenom1.includes(prenom) || titulaire.prenom2.includes(prenom)
        );
    }

    // Paginez les résultats
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + Number(pageSize);
    const paginatedData = filteredData.slice(startIndex, endIndex);

    res.status(200).json({
        content: paginatedData,
        page: page,
        size: pageSize,
        totalElements: filteredData.length,
    });
};