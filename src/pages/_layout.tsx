"use client";

import React, { ReactNode } from "react";
import { useRouter } from "waku";

import { CssBaseline, CssVarsProvider } from "@mui/joy";

import theme from "../theme.config";

type RootLayoutProps = { children: ReactNode };

const baseUrl = import.meta.env.BASE_URL || "https://sekigae.renorari.net";

export default function RootLayout({ children }: RootLayoutProps) {
    const router = useRouter();
    const location = router.path;
    const canonicalUrl = `${baseUrl}${location}`;

    return (
        <html lang="ja">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href={canonicalUrl} />
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