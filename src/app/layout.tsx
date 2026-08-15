import type { Metadata } from 'next';
import './globals.css';
import { WhatsAppAdmissionsWidget } from '@/components/shared/WhatsAppAdmissionsWidget';

export const metadata: Metadata = {
  title: 'FABY STUDIO ACADEMY | Formación Superior en Estética & Campus Virtual',
  description: 'Academia oficial de formación avanzada en extensiones de pestañas, uñas de gel y cosmetología con tutorías 1 a 1 y certificación verificable SHA-256.',
  keywords: ['faby studio academy', 'curso extensiones de pestañas', 'master uñas de gel', 'campus virtual estetica', 'volumen ruso', 'formacion profesional belleza'],
  authors: [{ name: 'FABY STUDIO' }],
  metadataBase: new URL('https://fabystudio.academy'),
  openGraph: {
    title: 'FABY STUDIO ACADEMY | Formación Superior en Estética',
    description: 'Transforma tu pasión por la belleza en una carrera certificada. Campus virtual con seguimiento de tiempo activo y tutorías 1 a 1.',
    url: 'https://fabystudio.academy',
    siteName: 'FABY STUDIO ACADEMY',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'FABY STUDIO ACADEMY Master Classes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FABY STUDIO ACADEMY',
    description: 'Formación profesional de alto nivel en estética y belleza con certificación digital inmutable.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-800 selection:bg-rose-600 selection:text-white antialiased">
        {children}
        <WhatsAppAdmissionsWidget />
      </body>
    </html>
  );
}
