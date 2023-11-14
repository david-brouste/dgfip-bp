'use client';

import ReactSwagger from './react-swagger';
import {useEffect, useState} from "react";

export default function IndexPage() {
    const [spec, setSpec] = useState(undefined)
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
    };

    if (!spec) return <div>Loading...</div>;

    return (
        <section className="container">
            <ReactSwagger spec={spec} />
        </section>
    );
}