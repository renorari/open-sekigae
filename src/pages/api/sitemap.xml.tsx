interface Page {
    url: string;
    lastModified?: Date;
    changeFrequency?: string;
    priority: number;
}

function w3cDateTime(date: Date): `${number}-${string}-${string}` {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export const GET = async (request: Request): Promise<Response> => {
    const url = new URL(request.url);
    const baseUrl = "https://" + url.host;

    const staticPages: Page[] = [
        {
            "url": "/",
            "changeFrequency": "monthly",
            "lastModified": new Date(),
            "priority": 1.0
        }
    ];

    const pages = [...staticPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
        .map(
            (page) => `
    <url>
        <loc>${baseUrl}${page.url}</loc>
        ${page.lastModified ? `<lastmod>${w3cDateTime(page.lastModified)}</lastmod>` : ""}
        ${page.changeFrequency ? `<changefreq>${page.changeFrequency}</changefreq>` : ""}
        <priority>${page.priority}</priority>
    </url>`
        )
        .join("")}
</urlset>`;

    return new Response(sitemap, {
        "headers": {
            "Content-Type": "application/xml"
        }
    });
};
