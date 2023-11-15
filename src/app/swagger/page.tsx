'use client';

import ReactSwagger from './react-swagger';
import {useEffect, useState} from "react";

export default function IndexPage() {
    const [spec, setSpec] = useState(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        getOpenApiSpec();
    }, []);

    const getOpenApiSpec = async (): Promise<void> => {
        const response: Response = await fetch('/api/spec');
        if (response.status === 200) {
            const spec = await response.json();
            setSpec(spec);
        } else {
            console.error(response);
        }
        setLoading(false);
    };

    if (!spec && loading) return <div>Loading...</div>;
    if (!spec && !loading) return <div>Une erreur s'est produite</div>;
    if (!spec) return;
    return (
        <section className="container">
            <ReactSwagger spec={spec} />
        </section>
    );
}