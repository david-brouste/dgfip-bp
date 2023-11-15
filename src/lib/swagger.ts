import path from "path";
import fs from "fs";
import YAML from "yaml";

export const getApiDocs = async (): Promise<any> => {
    const fullPath: string = path.join(process.cwd(), 'src', 'lib', 'api-docs.yaml');
    const fileContents: string = fs.readFileSync(fullPath, 'utf8');
    const spec = YAML.parse(fileContents);
    spec.servers[0].url = process.env.HOSTNAME;
    if (process.env.PORT !== '80') {
        spec.servers[0].url += ':' + process.env.PORT;
    }
    return spec;
};

