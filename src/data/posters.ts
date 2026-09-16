import posterImg from '../assets/poster.jpeg';

export interface Poster {
  slug: string;
  title: string;
  image?: string;
  imageUrl?: string;
  alt?: string;
  enabled?: boolean;
  order?: number;
}

export const postersData: Record<string, Poster> = {
  // Main Summit Poster (Used by About section)
  'techx-reignite-main-poster': {
    slug: 'techx-reignite-main-poster',
    title: 'TECHX REIGNITE 2026 Summit Poster',
    image: posterImg,
    imageUrl: posterImg,
    alt: 'TECHX REIGNITE event poster',
    enabled: true,
    order: 1,
  },
  // Track 1
  'track-1': {
    slug: 'track-1',
    title: 'TRACK 1',
    image: posterImg,
    imageUrl: posterImg,
    alt: 'TECHX REIGNITE Track 1 Poster',
    enabled: true,
    order: 2,
  },
  // Track 2
  'track-2': {
    slug: 'track-2',
    title: 'TRACK 2',
    image: posterImg,
    imageUrl: posterImg,
    alt: 'TECHX REIGNITE Track 2 Poster',
    enabled: true,
    order: 3,
  },
  // Talk Session
  'talk-session': {
    slug: 'talk-session',
    title: 'TALK SESSION',
    image: posterImg,
    imageUrl: posterImg,
    alt: 'TECHX REIGNITE Talk Session Poster',
    enabled: true,
    order: 4,
  },
  // Nano Mentoring
  'nano-mentoring': {
    slug: 'nano-mentoring',
    title: 'NANO MENTORING',
    image: posterImg,
    imageUrl: posterImg,
    alt: 'TECHX REIGNITE Nano Mentoring Poster',
    enabled: true,
    order: 5,
  },
};

export const getPosterBySlug = (slug: string): Poster | undefined => {
  return postersData[slug];
};
