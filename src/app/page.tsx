'use client';

import Image from 'next/image'
import styles from './page.module.css'
import {useEffect, useState} from "react";

export default function Home() {
    const [nbTitulaires, setNbTitulaires] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        regenerateTitulaires();
    }, [])
    const regenerateTitulaires = async (): Promise<void> => {
        try {
            setLoading(true);
            const response: Response = await fetch('/api/titulaires');
            if (response.status === 200) {
                const data = await response.json();
                setNbTitulaires(data.nbTitulaires);
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <div></div>
                <div>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        By{' '}
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            className={styles.vercelLogo}
                            width={100}
                            height={24}
                            priority
                        />
                    </a>
                </div>
            </div>

            <div className={styles.center}>
                <Image
                    className={styles.logo}
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                />
                <div onClick={regenerateTitulaires} className={styles.button}>
                    {loading ? (
                        <>
                            <h2>
                                <span>Chargement en cours...</span>
                            </h2>
                            <p>Regénération des données de test en cours</p>
                        </>
                    ) : (
                        <>
                            <h2>
                                <span>Générer titulaires</span><span>-&gt;</span>
                            </h2>
                            <p>Regénérer les données de test</p>
                        </>
                    )}

                </div>
            </div>
            <div className={styles.center}>
                <div className={styles.card}>
                    <h2>
                        Nombre de titulaires dans la base:  {nbTitulaires}
                    </h2>
                </div>
            </div>

            <div className={styles.grid}>

            </div>
        </main>
    )
}
