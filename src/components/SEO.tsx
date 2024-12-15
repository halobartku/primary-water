import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

export function SEO({
  title = 'Primary Water - Natural Water Source Discovery',
  description = 'Discover sustainable water sources with Primary Water. We specialize in locating natural water sources using innovative methods.',
  keywords = 'primary water, water source, sustainable water, water discovery, natural water',
  image = 'https://primerywater.com/images/Primary-Water_LOGO_v03.png',
  url = 'https://primerywater.com'
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Mobile Web App */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#E3F2F9" />
      <meta name="application-name" content="Primary Water" />

      {/* iOS */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

      {/* Additional Meta Tags */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="robots" content="index, follow" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      
      {/* Preconnect to Important Origins */}
      <link rel="preconnect" href="https://primerywater.com" />
    </Helmet>
  )
}
