import React from "react";

interface MetadataProps {
    title?: string;
    description?: string;
    keywords?: string[];
    noindex?: boolean;
}

export default function Metadata({ title, description, keywords, noindex }: MetadataProps) {
    const viewTitle = title ? title + " - Open Sékigae" : "Open Sékigae";
    const viewDescription = description || "Open Sékigaeは、教室やイベント会場での座席配置を簡単に決めることができるオープンソースの席替えツールです。";
    const viewKeywords = keywords ? keywords.join(", ") : "れのらり, renorari, renorari.net, renorarinet, ренорари, ленолари, 席替え, 席替えツール, 座席表, 座席表ツール, オープンソース, オープンソースプロジェクト, オープンソース座席表";

    return (
        <>
            <title>{viewTitle}</title>
            <meta name="description" content={viewDescription} />
            <meta name="keywords" content={viewKeywords} />
            <meta name="author" content="renorari" />
            <link rel="icon" type="image/png" href="/images/favicon.png" />
            {noindex && <meta name="robots" content="noindex" />}

            <meta property="og:title" content={viewTitle} />
            <meta property="og:locale" content="ja_JP" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://sekigae.renorari.net/" />
            <meta property="og:image" content="https://sekigae.renorari.net/images/ogp.png" />
            <meta property="og:site_name" content="Open Sékigae" />
            <meta property="og:description" content={viewDescription} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@renorari" />
        </>
        
    );
}
