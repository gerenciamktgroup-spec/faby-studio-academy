import React from 'react';
import type { Metadata } from 'next';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { EditorialHero } from '@/components/landing/EditorialHero';
import { EditorialTrustRail } from '@/components/landing/EditorialTrustRail';
import { BeforeAfterSlider } from '@/components/landing/BeforeAfterSlider';
import { EditorialCourseShowcase } from '@/components/landing/EditorialCourseShowcase';
import { MethodEditorial } from '@/components/landing/MethodEditorial';
import { ProfessionalJourney } from '@/components/landing/ProfessionalJourney';
import { ProfitSimulator } from '@/components/landing/ProfitSimulator';
import { MasterclassShowcase } from '@/components/landing/MasterclassShowcase';
import { StudentStories } from '@/components/landing/StudentStories';
import { FounderEditorial } from '@/components/landing/FounderEditorial';
import { MadridSedesShowcase } from '@/components/landing/MadridSedesShowcase';
import { MasteryCommitment } from '@/components/landing/MasteryCommitment';
import { CertificateTrust } from '@/components/landing/CertificateTrust';
import { ComparisonMatrix } from '@/components/landing/ComparisonMatrix';
import { CareerPathQuiz } from '@/components/landing/CareerPathQuiz';
import { FaqInteractive } from '@/components/landing/FaqInteractive';
import { FloatingWhatsApp } from '@/components/landing/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'FABY STUDIO ACADEMY | Academia Profesional de Belleza en Madrid',
  description: 'Formación profesional en uñas de gel, pestañas y estética facial con práctica sobre modelos reales, acompañamiento docente y dos sedes en Madrid.',
  keywords: [
    'academia estetica madrid',
    'curso unas gel madrid',
    'curso extensiones pestanas madrid',
    'volumen ruso madrid',
    'faby studio',
    'manicura rusa',
    'hidrafacial madrid',
  ],
  openGraph: {
    title: 'FABY STUDIO ACADEMY • Madrid',
    description: 'Aprende belleza. Domina la técnica. Hazla tu profesión. Academia profesional en Plaza Aluche y Puente de Vallecas.',
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
            name: 'Especialización Profesional en Pestañas, Cejas & Volumen Ruso',
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
    <div className="min-h-screen bg-[#F8F5F1] flex flex-col text-[#111117] selection:bg-[#DD006B] selection:text-white">
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PublicHeader />

      <main className="flex-1">
        {/* 01 — ASPIRACIÓN */}
        <EditorialHero />
        <EditorialTrustRail />

        {/* 02 — RESULTADO */}
        <BeforeAfterSlider />

        {/* 03 — ELIGE TU ESPECIALIDAD */}
        <EditorialCourseShowcase />

        {/* 04 — ASÍ APRENDES (MÉTODO FABY) */}
        <MethodEditorial />

        {/* 05 — DE APRENDER A EJERCER */}
        <ProfessionalJourney />
        <ProfitSimulator />

        {/* 06 — ENTRA EN UNA CLASE */}
        <MasterclassShowcase />

        {/* 07 — ALUMNAS REALES */}
        <StudentStories />

        {/* 08 — LA PROFESORA */}
        <FounderEditorial />

        {/* 09 — MADRID (SEDES FÍSICAS) */}
        <MadridSedesShowcase />

        {/* 10 — CONFIANZA & ACREDITACIÓN */}
        <MasteryCommitment />
        <CertificateTrust />
        <ComparisonMatrix />

        {/* 11 — DECISIÓN & ORIENTACIÓN */}
        <CareerPathQuiz />

        {/* 12 — FAQ */}
        <FaqInteractive />
      </main>

      <PublicFooter />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}
