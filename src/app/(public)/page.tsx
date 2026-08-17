import React from 'react';
import type { Metadata } from 'next';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { HeroSection } from '@/components/landing/HeroSection';
import { AuthorityTicker } from '@/components/landing/AuthorityTicker';
import { BeforeAfterSlider } from '@/components/landing/BeforeAfterSlider';
import { ProfitSimulator } from '@/components/landing/ProfitSimulator';
import { MethodBentoGrid } from '@/components/landing/MethodBentoGrid';
import { CourseCatalogCards } from '@/components/landing/CourseCatalogCards';
import { MasterclassShowcase } from '@/components/landing/MasterclassShowcase';
import { MadridSedesShowcase } from '@/components/landing/MadridSedesShowcase';
import { FounderEditorial } from '@/components/landing/FounderEditorial';
import { ComparisonMatrix } from '@/components/landing/ComparisonMatrix';
import { FaqInteractive } from '@/components/landing/FaqInteractive';
import { FloatingWhatsApp } from '@/components/landing/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'FABY STUDIO ACADEMY | Academia de Especialización Estética en Madrid',
  description: 'Másteres profesionales en Uñas de Gel & Acrílico, Hidrafacial y Pestañas. Sedes en Madrid (Aluche y Vallecas) con prácticas reales y diplomas verificables SHA-256.',
  keywords: ['academia estetica madrid', 'curso unas acrilico madrid', 'curso hidrafacial', 'curso extensiones pestanas', 'faby studio', 'manicura rusa'],
  openGraph: {
    title: 'FABY STUDIO ACADEMY • Madrid',
    description: 'Transforma tu pasión por la belleza en un negocio rentable con certificación técnica verificable.',
    url: 'https://faby-studio-academy.vercel.app',
    siteName: 'FABY STUDIO ACADEMY',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://fabyestudio.com/#organization',
        name: 'FABY STUDIO ACADEMY',
        url: 'https://faby-studio-academy.vercel.app',
        telephone: '+34614236200',
        email: 'fabileslie@gmail.com',
        founder: {
          '@type': 'Person',
          name: 'Leslie Fabiola Larico Zapana',
        },
        address: [
          {
            '@type': 'PostalAddress',
            streetAddress: 'Av. de los Poblados, 58 (C.C. Plaza Aluche)',
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
      },
      {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'Course',
            name: 'Máster Profesional en Uñas de Gel & Acrílico Premium',
            description: 'Manicura rusa combinada con torno, nivelación con base rubber, acrigel y esculpido estructural.',
            provider: {
              '@type': 'Organization',
              name: 'FABY STUDIO ACADEMY',
            },
          },
          {
            '@type': 'Course',
            name: 'Especialización en Pestañas, Cejas & Volumen Ruso',
            description: 'Técnica clásica 1:1, abanicos 2D-6D, visagismo con henna, lifting y depilación con hilo.',
            provider: {
              '@type': 'Organization',
              name: 'FABY STUDIO ACADEMY',
            },
          },
          {
            '@type': 'Course',
            name: 'Curso Superior de Cosmetología Facial & Hidrafacial',
            description: 'Protocolos de Hidrafacial, aparatología en cabina, peelings químicos y renovación dérmica.',
            provider: {
              '@type': 'Organization',
              name: 'FABY STUDIO ACADEMY',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 selection:bg-rose-500 selection:text-white">
      {/* Schema.org JSON-LD for rich SEO snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PublicHeader />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Authority & Trust Ticker */}
        <AuthorityTicker />

        {/* 3. Interactive Before/After Visual Transformation Slider */}
        <BeforeAfterSlider />

        {/* 4. Interactive Profit & ROI Simulator for Students */}
        <ProfitSimulator />

        {/* 5. Method Bento Grid (4 Core Pillars) */}
        <MethodBentoGrid />

        {/* 6. Masterclass Video Player Showcase */}
        <MasterclassShowcase />

        {/* 7. Official Course Catalog Cards */}
        <CourseCatalogCards />

        {/* 8. Physical Sedes in Madrid (Aluche & Vallecas) */}
        <MadridSedesShowcase />

        {/* 9. Founder Spotlight & Authority */}
        <FounderEditorial />

        {/* 10. Comparison Matrix vs Traditional Academies */}
        <ComparisonMatrix />

        {/* 11. Interactive FAQ Accordion */}
        <FaqInteractive />
      </main>

      <PublicFooter />

      {/* Floating Interactive WhatsApp Direct Contact */}
      <FloatingWhatsApp />
    </div>
  );
}
