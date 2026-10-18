import { Helmet } from "react-helmet";

const SEO = ({ title, description, keywords, noindex = false }) => (
  <Helmet>
    {title && <title>{title}</title>}

    {description && <meta name="description" content={description} />}

    {keywords && <meta name="keywords" content={keywords} />}

    {noindex && <meta name="robots" content="noindex,nofollow" />}

    <link
      rel="canonical"
      href={`https://believersconsultancy.com${window.location.pathname}`}
    />
  </Helmet>
);

export default SEO;
