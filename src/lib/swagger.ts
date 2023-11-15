import path from "path";
import fs from "fs";
import YAML from "yaml";

export const getApiDocs = async (): Promise<any> => {
    const fullPath: string = path.join(process.cwd(), 'src', 'lib', 'api-docs.yaml');
    let fileContents: string = fs.readFileSync(fullPath, 'utf8');
    const oldApiName = '/b2b/apigee/v1/boites-postales';
    fileContents = fileContents.replace(oldApiName, '/api/bp');
    const spec = YAML.parse(fileContents);
    spec.servers[0].url = process.env.HOSTNAME;
    spec.openapi = '3.1.0'
    spec.info.title = 'OpenAPI definition for Apigee Controller'
    spec.info.version = 'v1'
    spec.security = []
    spec.servers[0].description = 'Serveur de test'
    if (process.env.PORT !== '80') {
        spec.servers[0].url += ':' + process.env.PORT;
    }
    return spec;
};

