import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

export function SEO({
  title = 'Primary Water - We Find Water Everywhere',
  description = 'Unlocking sustainable water sources worldwide through innovative primary water discovery. Expert solutions for agriculture, industry, and communities.',
  keywords = 'primary water, water finding, sustainable water, water discovery, groundwater, water solutions, water supply, we find water everywhere, water sourcing experts, sustainable water solutions, weather-independent water, pure water source, water for agriculture, industrial water supply, community water solutions',
  image = 'https://primerywater.com/images/logo.png',
  url = 'https://findprimarywater.com'
}: SEOProps) {
  const formattedTitle = title === 'Primary Water - Home' ? 'Primary Water - We Find Water Everywhere' : title

  return (
    <Helmet>
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Primary Water" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@PrimaryWater" />
      <meta name="twitter:url" content={url} />

      {/* Mobile Web App */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#3B82F6" />
      <meta name="application-name" content="Primary Water" />

      {/* iOS */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Primary Water" />

      {/* Additional Meta Tags */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Primary Water Sp. z o. o." />
      <meta name="geo.region" content="PL" />
      <meta name="geo.placename" content="Elbląg" />
      
      {/* Links */}
      <link rel="canonical" href={url} />
      <link rel="icon" href="https://primerywater.com/images/favicon%20primary%20water.png" />
      <link rel="apple-touch-icon" href="https://primerywater.com/images/favicon%20primary%20water.png" />
      
      {/* Preconnect to Important Origins */}
      <link rel="preconnect" href="https://primerywater.com" />
      <link rel="preconnect" href="https://findprimarywater.com" />
    </Helmet>
  )
}
