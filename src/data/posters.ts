import posterImg from '../assets/poster.jpeg';

export interface Poster {
  slug: string;
  image: string;
  imageUrl?: string;
  alt: string;
  title: string;
  enabled?: boolean;
  order?: number;
}

export const postersData: Record<string, Poster> = {
  'techx-reignite-main-poster': {
    slug: 'techx-reignite-main-poster',
    image: posterImg,
    imageUrl: posterImg,
    alt: 'TECHX REIGNITE event poster',
    title: 'TECHX REIGNITE 2026 Summit Poster',
    enabled: true,
    order: 1,
  },
};

export const getPosterBySlug = (slug: string): Poster | undefined => {
  return postersData[slug];
};
