"use client";

import React, { ReactNode } from "react";
import { useRouter } from "waku";

import { CssBaseline, CssVarsProvider } from "@mui/joy";

import theme from "../theme.config";

type RootLayoutProps = { children: ReactNode };

const baseUrl = "https://sekigae.renorari.net";

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
                        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VLSW5SRFC0"></script>
                        <script dangerouslySetInnerHTML={{
                            "__html": `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-VLSW5SRFC0');
                        `}} />
                    </>
                )}
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1265980632516511" crossOrigin="anonymous"></script>
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