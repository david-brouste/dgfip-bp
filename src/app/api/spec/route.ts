import {getApiDocs} from "@/lib/swagger";

export async function GET(): Promise<Response> {
    try {
        const spec = await getApiDocs();
        return Response.json(spec);
    } catch (e) {
        const errorMessage = {
            error: 'Une erreur s\'est produite lors de la récupération de la spec',
            status: 500
        };
        return new Response(JSON.stringify(errorMessage), {status: 500});
    }
}