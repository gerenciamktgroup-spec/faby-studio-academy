/**
 * Simulación de Video Streaming Service (Cloudflare Stream / Mux / HLS)
 * Proporciona metadatos de video, adaptive bitrate y control de marca de agua anti-piratería.
 */

export interface VideoQuality {
  label: string;
  resolution: string;
  bitrate: string;
}

export interface VideoResource {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  downloadUrl: string;
  type: 'pdf' | 'template' | 'guide';
}

export interface LessonNote {
  id: string;
  timestampSeconds: number;
  timestampFormatted: string;
  text: string;
  createdAt: string;
}

export interface LessonComment {
  id: string;
  author: string;
  avatar: string;
  isTutor?: boolean;
  timeAgo: string;
  question: string;
  answer?: {
    author: string;
    avatar: string;
    text: string;
    timeAgo: string;
  };
}

export const VIDEO_QUALITIES: VideoQuality[] = [
  { label: 'Auto (1080p ABR)', resolution: '1080p', bitrate: '4.5 Mbps' },
  { label: '1080p HD', resolution: '1080p', bitrate: '4.5 Mbps' },
  { label: '720p HD', resolution: '720p', bitrate: '2.5 Mbps' },
  { label: '480p SD', resolution: '480p', bitrate: '1.2 Mbps' },
];

export const PLAYBACK_SPEEDS = [0.75, 1, 1.25, 1.5, 2];

export const DEMO_DOWNLOADABLE_RESOURCES: Record<string, VideoResource[]> = {
  'l1': [
    {
      id: 'res-1',
      title: 'Manual de Bioseguridad e Higiene en Cabina',
      fileName: 'Guia_Bioseguridad_FabyStudio_2026.pdf',
      fileSize: '2.4 MB',
      type: 'pdf',
      downloadUrl: 'data:application/pdf;base64,JVBERi0xLjQKJUZBQlkgU1RVRElPIEFDQURFTVkgLSBNQU5VQUwgREUgQklPU0VHVVJJREFE',
    },
    {
      id: 'res-2',
      title: 'Plantilla de Consentimiento Informado para Clientas',
      fileName: 'Consentimiento_Informado_Pestanas.pdf',
      fileSize: '1.1 MB',
      type: 'template',
      downloadUrl: 'data:application/pdf;base64,JVBERi0xLjQKJUZBQlkgU1RVRElPIEFDQURFTVkgLSBDT05TRU5USU1JRU5UTw==',
    },
  ],
  'l2': [
    {
      id: 'res-3',
      title: 'Ficha Técnica de Mapping Facial y Curvaturas (J, B, C, CC, D, L)',
      fileName: 'Ficha_Tecnica_Mapping_Facial.pdf',
      fileSize: '3.8 MB',
      type: 'guide',
      downloadUrl: 'data:application/pdf;base64,JVBERi0xLjQKJUZBQlkgU1RVRElPIEFDQURFTVkgLSBNQVBQSU5H',
    },
  ],
};

export const INITIAL_DEMO_NOTES: Record<string, LessonNote[]> = {
  'l1': [
    {
      id: 'note-1',
      timestampSeconds: 45,
      timestampFormatted: '00:45',
      text: 'Desinfectar pinzas con glutaraldehído al 2% mínimo 20 minutos antes de cada clienta.',
      createdAt: 'Hace 2 días',
    },
    {
      id: 'note-2',
      timestampSeconds: 210,
      timestampFormatted: '03:30',
      text: 'Humedad relativa ideal en cabina: entre 45% y 60% para que el cianoacrilato cure correctamente.',
      createdAt: 'Hace 2 días',
    },
  ],
};

export const INITIAL_DEMO_COMMENTS: Record<string, LessonComment[]> = {
  'l1': [
    {
      id: 'comm-1',
      author: 'Lucía Martínez',
      avatar: 'LM',
      timeAgo: 'Hace 3 días',
      question: '¿Qué higrómetro recomendáis para monitorizar la humedad del estudio de forma precisa?',
      answer: {
        author: 'Laura Gómez (Tutora)',
        avatar: 'LG',
        text: '¡Hola Lucía! Te recomiendo los higrómetros digitales calibrados de precisión como ThermoPro TP50. Te permiten ajustar el tipo de adhesivo según el clima de cada día.',
        timeAgo: 'Hace 2 días',
      },
    },
  ],
};
