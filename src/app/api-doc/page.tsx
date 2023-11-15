'use client';

import {useEffect, useState} from "react";
import YAML from "yaml";

export default function IndexPage() {
    const [spec, setSpec] = useState<undefined|string>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        getOpenApiSpec();
    }, []);

    const getOpenApiSpec = async (): Promise<void> => {
        const response: Response = await fetch('/api/spec');
        if (response.status === 200) {
            const spec = await response.json();
            const yaml = YAML.stringify(spec);
            setSpec(yaml);
        } else {
            console.error(response);
        }
        setLoading(false);
    };

    if (!spec && loading) return <div>Loading...</div>;
    if (!spec && !loading) return <div>Une erreur s&apos;est produite</div>;
    if (!spec) return;
    return (
        <div>
            <pre>{spec}</pre>
        </div>
    );
}