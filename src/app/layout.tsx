import type { Metadata } from 'next';
import { Bodoni_Moda, Manrope } from 'next/font/google';
import './globals.css';
import { WhatsAppAdmissionsWidget } from '@/components/shared/WhatsAppAdmissionsWidget';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-editorial',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'FABY STUDIO ACADEMY | Academia Profesional de Belleza en Madrid',
  description: 'Formación profesional en uñas de gel, pestañas y estética facial con práctica sobre modelos reales, acompañamiento docente y dos sedes en Madrid.',
  keywords: [
    'faby studio academy',
    'academia estetica madrid',
    'curso unas gel madrid',
    'curso extensiones pestanas madrid',
    'volumen ruso',
    'manicura rusa madrid',
    'formacion profesional belleza',
  ],
  authors: [{ name: 'Leslie Fabiola Larico Zapana' }],
  metadataBase: new URL('https://faby-studio-academy.vercel.app'),
  openGraph: {
    title: 'FABY STUDIO ACADEMY • Academia Profesional en Madrid',
    description: 'Aprende belleza. Domina la técnica. Hazla tu profesión. Formación técnica avanzada con sedes en Plaza Aluche y Vallecas.',
    url: 'https://faby-studio-academy.vercel.app',
    siteName: 'FABY STUDIO ACADEMY',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'FABY STUDIO ACADEMY Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FABY STUDIO ACADEMY • Madrid',
    description: 'Formación profesional en estética y belleza con práctica real y certificación técnica verificable.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || '34614236200';

  return (
    <html lang="es" className={`${manrope.variable} ${bodoni.variable} scroll-smooth`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F8F5F1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Faby Academy" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'FABY STUDIO ACADEMY',
              url: 'https://faby-studio-academy.vercel.app',
              logo: 'https://faby-studio-academy.vercel.app/favicon.ico',
              description: 'Academia de formación profesional en uñas de gel, pestañas y cosmetología facial en Madrid.',
              founder: {
                '@type': 'Person',
                name: 'Leslie Fabiola Larico Zapana',
              },
              address: [
                {
                  '@type': 'PostalAddress',
                  streetAddress: 'Av. de los Poblados 58 (C.C. Plaza Aluche)',
                  addressLocality: 'Madrid',
                  postalCode: '28044',
                  addressCountry: 'ES',
                },
                {
                  '@type': 'PostalAddress',
                  streetAddress: 'Puente de Vallecas',
                  addressLocality: 'Madrid',
                  addressCountry: 'ES',
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F8F5F1] text-[#111117] antialiased selection:bg-[#DD006B] selection:text-white font-sans">
        {children}
        {whatsappNumber && whatsappNumber.length >= 8 ? <WhatsAppAdmissionsWidget phone={whatsappNumber} /> : null}
      </body>
    </html>
  );
}
