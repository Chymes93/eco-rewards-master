import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * MetaTags component for setting page metadata and ensuring proper mobile responsiveness
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogUrl - Open Graph URL
 */
const MetaTags = ({ 
  title = 'Ecorewards - Turn Your Everyday Actions into Rewards',
  description = 'Earn points, save the planet & get exclusive perks with Ecorewards. Join our community of eco-conscious individuals making a difference.',
  keywords = 'eco rewards, sustainability, green rewards, eco-friendly, environmental rewards',
  ogImage = '/og-image.jpg',
  ogUrl = 'https://ecorewards.com'
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Ensure proper viewport settings for mobile responsiveness */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#228B22" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default MetaTags;
