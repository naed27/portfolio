import Head from 'next/head';

interface Props {
    pageTitle?: string,
    description?: string,
    previewImage?: string,
};

const Metadata = ({
  pageTitle = `Dean's Portfolio`, 
  description = `Discover the diversity of my work with my website portfolio - a collection of projects that showcase my range of skills and creativity.`, 
  previewImage = `https://cdn.discordapp.com/attachments/815553316390043658/1091565328087138385/Lily_A4.png`
}: Props) => {

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      <title>{pageTitle}</title>

      <meta name="description" content={description} key="desc"/>

      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:image" content={previewImage} key="ogimage"/>
      <meta property="og:description" content={description} key="ogdesc" />

    </Head>
  )
  
};

export default Metadata;