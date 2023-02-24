import Head from 'next/head';

export default function Meta({
  title = 'Adil Khan, Software Engineer.',
  description = 'Full stack developer, passionate about building random things.',
}: {
  title?: string;
  description?: string;
  image?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="apple-touch-icon" sizes="180x180" />
      <link rel="icon" type="image/png" sizes="32x32" />
      <link rel="icon" type="image/png" sizes="16x16" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta itemProp="image" content="" />
      <meta property="og:logo" content=""></meta>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@none" />
      <meta name="twitter:creator" content="@none" />
      <meta name="twitter:title" content="" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="" />
    </Head>
  );
}
