export type TrackStatus = 'COMING_SOON' | 'OPEN' | 'CLOSED';
export type TrackCategory = 'TECH' | 'TRAIN';

export interface Track {
  id: string;
  posterSlug: string;
  num: string;
  name: string;
  title: string;
  category: TrackCategory;
  description: string;
  badge: string;
  competition?: string;
  competitionDescription?: string;
  image?: string;
  status: TrackStatus;
  registrationEnabled: boolean;
  registrationLink: string;
}

export const tracksData: Track[] = [
  {
    id: "track-1",
    posterSlug: "track-1",
    num: "01",
    name: "TRACK 1",
    title: "TRACK 1",
    category: "TECH",
    description: "Hands-on coding sprints and practical lab sessions.",
    badge: "TECH / OFFLINE SPRINT",
    competition: "Day 2 CodeSprint Challenge",
    competitionDescription: "Build and deploy prototypes evaluated by industry judges.",
    status: "COMING_SOON",
    registrationEnabled: false,
    registrationLink: "/register?track=track-1"
  },
  {
    id: "track-2",
    posterSlug: "track-2",
    num: "02",
    name: "TRACK 2",
    title: "TRACK 2",
    category: "TECH",
    description: "Hands-on coding sprints and practical lab sessions.",
    badge: "TECH / OFFLINE SPRINT",
    competition: "Day 2 CodeSprint Challenge",
    competitionDescription: "Build and deploy prototypes evaluated by industry judges.",
    status: "COMING_SOON",
    registrationEnabled: false,
    registrationLink: "/register?track=track-2"
  },
  {
    id: "talk-session",
    posterSlug: "talk-session",
    num: "03",
    name: "TALK SESSION",
    title: "TALK SESSION",
    category: "TECH",
    description: "Expert sessions on ADAS, AI in Healthcare, and future tech.",
    badge: "TECH / TALKS",
    competition: "Day 2 Technical Ideathon",
    competitionDescription: "Present and defend innovative engineering applications.",
    status: "COMING_SOON",
    registrationEnabled: false,
    registrationLink: "/register"
  },
  {
    id: "nano-mentoring",
    posterSlug: "nano-mentoring",
    num: "04",
    name: "NANO MENTORING",
    title: "NANO MENTORING",
    category: "TRAIN",
    description: "1-on-1 personalized mentoring with industry professionals.",
    badge: "TRAIN / MENTORING",
    competition: "Day 2 Portfolio Spotlight",
    competitionDescription: "Personalized portfolio reviews and career roadmaps.",
    status: "COMING_SOON",
    registrationEnabled: false,
    registrationLink: "/register"
  }
];
