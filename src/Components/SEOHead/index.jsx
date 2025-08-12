import { Helmet } from 'react-helmet-async';

const SEOHead = ({
  title = "Wilson Santiago - Corretor de Imóveis | Casas, Apartamentos, Chácaras e Pontos Comerciais",
  description = "Wilson Santiago - Corretor de Imóveis especializado em casas, apartamentos, chácaras e pontos comerciais. Encontre o imóvel dos seus sonhos com atendimento personalizado e as melhores oportunidades do mercado.",
  keywords = "corretor de imóveis, imóveis para venda, casas, apartamentos, chácaras, pontos comerciais, Wilson Santiago, imobiliária, comprar imóvel, vender imóvel",
  image = "https://wilsonsantiago.com.br/img/logo-horizontal.png",
  url = "https://wilsonsantiago.com.br/",
  type = "website",
  structuredData = null
}) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Wilson Santiago Corretor",
      "url": "https://wilsonsantiago.com.br"
    },
    "about": {
      "@type": "RealEstateAgent",
      "name": "Wilson Santiago",
      "telephone": "+5535999415176"
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {!structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(defaultStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;