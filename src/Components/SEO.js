import { Helmet } from "react-helmet-async";

const SITE_URL = "https://nikavera.tattoo";
const SITE_NAME = "Nika Vera Tattoo";

function SEO({ title, description, canonicalPath }) {
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const fullTitle = `${title} | ${SITE_NAME}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />
        </Helmet>
    );
}

export default SEO;
