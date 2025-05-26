
import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Component for adding structured data to improve SEO
 */
const StructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    "name": "WuDe TaijiQuan SA",
    "description": "Authentic TaijiQuan training in South Africa",
    "url": "https://zenforce-registration-hub.lovable.app/",
    "telephone": "+27731742969",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "South Africa"
    },
    "sameAs": ["https://www.facebook.com/wudetaijiquan"],
    "openingHours": "Mo,Tu,We,Th,Fr 08:00-18:00",
    "priceRange": "$$"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
