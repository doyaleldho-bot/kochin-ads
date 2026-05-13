
import React from 'react';
import { Helmet } from 'react-helmet';

const SeoHead = ({ title, description, keywords, image, url, type = 'website', schema }) => {
  const siteTitle = 'Kochin Ads | Premier Advertising Agency in Kerala';
  const defaultDesc = 'Full-service advertising agency in Kochi offering digital marketing, SEO, billboard advertising, and branding solutions across Kerala.';
  const defaultImage = 'https://horizons-cdn.hostinger.com/7ec1cf53-4f51-44ad-ac86-4813f22a6038/468da3ae0bed8e53719c3ab97e40c208.jpg';
  const siteUrl = 'https://kochinads.com';

  return (
    <Helmet>
      <title>{title ? `${title} | Kochin Ads` : siteTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || "advertising agency kerala, digital marketing kochi, billboard ads, seo services, branding"} />
      <link rel="canonical" href={url || siteUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || siteUrl} />
      <meta property="twitter:title" content={title || siteTitle} />
      <meta property="twitter:description" content={description || defaultDesc} />
      <meta property="twitter:image" content={image || defaultImage} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SeoHead;
