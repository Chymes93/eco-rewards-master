import React, { useEffect } from "react";

/**
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogUrl - Open Graph URL
 */
const MetaTags = ({
  title = "Ecorewards - Turn Your Everyday Actions into Rewards",
  description = "Earn points, save the planet & get exclusive perks with Ecorewards. Join our community of eco-conscious individuals making a difference.",
  keywords = "eco rewards, sustainability, green rewards, eco-friendly, environmental rewards",
  ogImage = "/og-image.jpg",
  ogUrl = "https://ecorewards.com",
}) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set or update meta tags by name
    const setMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Helper function to set or update meta tags by property (for Open Graph)
    const setProperty = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Primary Meta Tags
    setMeta("title", title);
    setMeta("description", description);
    setMeta("keywords", keywords);

    // Ensure proper viewport settings for mobile responsiveness
    setMeta(
      "viewport",
      "width=device-width, initial-scale=1.0, maximum-scale=5.0"
    );
    setMeta("theme-color", "#228B22");

    // Open Graph / Facebook
    setProperty("og:type", "website");
    setProperty("og:url", ogUrl);
    setProperty("og:title", title);
    setProperty("og:description", description);
    setProperty("og:image", ogImage);

    // Twitter
    setProperty("twitter:card", "summary_large_image");
    setProperty("twitter:url", ogUrl);
    setProperty("twitter:title", title);
    setProperty("twitter:description", description);
    setProperty("twitter:image", ogImage);
  }, [title, description, keywords, ogImage, ogUrl]);

  return null;
};

export default MetaTags;
