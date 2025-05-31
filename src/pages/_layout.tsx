"use client";

import React, { ReactNode } from "react";
import { useRouter } from "waku";

import { CssBaseline, CssVarsProvider } from "@mui/joy";

import theme from "../theme.config";

type RootLayoutProps = { children: ReactNode };

const baseUrl = import.meta.env.WAKU_PUBLIC_URL || "https://sekigae.renorari.net";
const gTagId = import.meta.env.WAKU_PUBLIC_GTAG_ID || "";

export default function RootLayout({ children }: RootLayoutProps) {
    const router = useRouter();
    const location = router.path;
    const canonicalUrl = `${baseUrl}${location}`;

    return (
        <html lang="ja">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href={canonicalUrl} />
                {process.env.NODE_ENV === "production" && (
                    <>
                        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gTagId}`}></script>
                        <script dangerouslySetInnerHTML={{
                            "__html": `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${gTagId}');
                        `}} />
                    </>
                )}
            </head>
            <body>
                <CssVarsProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </CssVarsProvider>
            </body>
        </html>
    );
}