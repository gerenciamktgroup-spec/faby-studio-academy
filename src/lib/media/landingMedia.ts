export type MediaStatus = 'demo' | 'approved';

export interface MediaAsset {
  src: string;
  alt: string;
  status: MediaStatus;
  notes?: string;
}

export const landingMedia = {
  hero: {
    main: {
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=85&w=1200&auto=format&fit=crop',
      alt: 'Técnica de manicura profesional y trabajo de precisión en estudio',
      status: 'demo',
      notes: 'TODO(PRODUCTION): Replace with approved photography of Faby teaching or working in Madrid studio',
    } as MediaAsset,
    portraitFaby: {
      src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=85&w=800&auto=format&fit=crop',
      alt: 'Retrato provisional para la fundadora y master educator',
      status: 'demo',
      notes: 'TODO(PRODUCTION): Replace with approved portrait of Leslie Fabiola Larico Zapana',
    } as MediaAsset,
  },

  founder: {
    portrait: {
      src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=85&w=900&auto=format&fit=crop',
      alt: 'Retrato editorial provisional de la dirección académica',
      status: 'demo',
      notes: 'TODO(PRODUCTION): Replace with official studio portrait of Leslie Fabiola Larico Zapana',
    } as MediaAsset,
  },

  courses: {
    nails: {
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=85&w=900&auto=format&fit=crop',
      alt: 'Máster Profesional en Uñas de Gel & Acrílico Premium',
      status: 'demo',
      notes: 'TODO(PRODUCTION): Replace with macro photography of Russian Manicure & Rubber Gel created at Faby Studio',
    } as MediaAsset,
    lashes: {
      src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=85&w=900&auto=format&fit=crop',
      alt: 'Especialización Profesional en Pestañas & Volumen Ruso',
      status: 'demo',
      notes: 'TODO(PRODUCTION): Replace with macro photography of 3D Russian Volume fan application',
    } as MediaAsset,
    facial: {
      src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=85&w=900&auto=format&fit=crop',
      alt: 'Curso Superior de Cosmetología Facial & Hidrafacial',
      status: 'demo',
      notes: 'TODO(PRODUCTION): Replace with real cabin photo of Hidrafacial protocol',
    } as MediaAsset,
  },

  transformations: {
    nailsBefore: {
      src: 'https://images.unsplash.com/photo-1519014816548-bf7851c8528b?q=80&w=1000&auto=format&fit=crop',
      alt: 'Cutícula sin tratar y lámina frágil antes de la manicura rusa',
      status: 'demo',
    } as MediaAsset,
    nailsAfter: {
      src: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1000&auto=format&fit=crop',
      alt: 'Resultado de manicura rusa y gel constructor autonivelante',
      status: 'demo',
    } as MediaAsset,
    lashesBefore: {
      src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
      alt: 'Pestaña natural previa al tratamiento',
      status: 'demo',
    } as MediaAsset,
    lashesAfter: {
      src: 'https://images.unsplash.com/photo-1583001809873-a1284a5da677?q=80&w=1000&auto=format&fit=crop',
      alt: 'Resultado de volumen ruso 3D y curvatura D',
      status: 'demo',
    } as MediaAsset,
    facialBefore: {
      src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1000&auto=format&fit=crop',
      alt: 'Piel con impurezas y textura irregular previa',
      status: 'demo',
    } as MediaAsset,
    facialAfter: {
      src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop',
      alt: 'Luminosidad y textura renovada tras protocolo Hidrafacial',
      status: 'demo',
    } as MediaAsset,
  },

  students: {
    hero: {
      src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=85&w=800&auto=format&fit=crop',
      alt: 'Retrato provisional para historia principal de alumna',
      status: 'demo',
    } as MediaAsset,
    micro1: {
      src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=85&w=400&auto=format&fit=crop',
      alt: 'Retrato provisional de alumna de pestañas',
      status: 'demo',
    } as MediaAsset,
    micro2: {
      src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=85&w=400&auto=format&fit=crop',
      alt: 'Retrato provisional de alumna de cosmetología',
      status: 'demo',
    } as MediaAsset,
    micro3: {
      src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=85&w=400&auto=format&fit=crop',
      alt: 'Retrato provisional de alumna de uñas',
      status: 'demo',
    } as MediaAsset,
  },
};
