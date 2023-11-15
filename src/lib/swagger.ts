import path from "path";
import fs from "fs";
import YAML from "yaml";

export const getApiDocs = async (): Promise<any> => {
    const fullPath: string = path.join(process.cwd(), 'src', 'lib', 'api-docs.yaml');
    let fileContents: string = fs.readFileSync(fullPath, 'utf8');
    const oldApiName = '/b2b/apigee/v1/boites-postales';
    fileContents = fileContents.replace(oldApiName, '/api/bp');
    const spec = YAML.parse(fileContents);
    let url = process.env.VERCEL_ENV === 'local' ? 'http://' : 'https://';
    url += process.env.VERCEL_URL;
    url += process.env.VERCEL_ENV === 'local' ? ':3000' : '';
    spec.servers[0].url = url;
    spec.openapi = '3.1.0'
    spec.info.title = 'OpenAPI definition for Apigee Controller'
    spec.info.version = 'v1'
    spec.security = []
    spec.servers[0].description = 'Serveur de test'
    return spec;
};

