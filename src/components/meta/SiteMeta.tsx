
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SiteMetaProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

/**
 * Component for rendering site meta tags including SEO, social sharing,
 * and performance optimization tags
 */
const SiteMeta: React.FC<SiteMetaProps> = ({
  title = "WuDe TaijiQuan SA - Authentic Martial Arts Training",
  description = "Experience authentic TaijiQuan training in South Africa. Join classes for all ages and skill levels in a traditional martial arts environment focused on health and mindfulness.",
  ogImage = "https://zenforce-registration-hub.lovable.app/og-image.png",
  canonicalUrl = "https://zenforce-registration-hub.lovable.app/"
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content="taijiquan, tai chi, martial arts, south africa, wude, meditation, health, wellness, traditional martial arts" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Performance optimizations */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="dns-prefetch" href="https://vyjhxyazgtdldzejjbzu.supabase.co" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://vyjhxyazgtdldzejjbzu.supabase.co" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SiteMeta;
