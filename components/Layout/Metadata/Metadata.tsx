import Head from 'next/head';

interface Props {
    pageTitle: string,
    description: string,
    previewImage?: string,
};

const Metadata = ({pageTitle, description, previewImage}: Props) => {

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      <title> {pageTitle} </title>

      <meta name="description" content={description} key="desc"/>

      {/* ------- OG metas -------
        The minimum size you should use is 200 x 200 pixels

        Images smaller than 600 x 315 pixels will often be styled 
        differently on Facebook and Twitter 
        (it will be on the side of the link text, 
        rather than big and in the middle of everything)

        For most cards that appear on Twitter and Facebook, 
        images that are 1200 x 630 pixels have the best display on high resolution

      */}

      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:image" content={previewImage ? previewImage : 'https://cdn.discordapp.com/attachments/815553316390043658/1091565328087138385/Lily_A4.png'} key="ogimage"/>
      <meta property="og:description" content={description} key="ogdesc" />

    </Head>
  )
};

export default Metadata;