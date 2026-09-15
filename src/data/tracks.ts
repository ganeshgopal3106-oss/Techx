export type TrackStatus = 'COMING_SOON' | 'OPEN' | 'CLOSED';
export type TrackCategory = 'TECH' | 'TRAIN';

export interface Track {
  id: string;
  num: string;
  name: string;
  title: string;
  category: TrackCategory;
  description: string;
  badge: string;
  competition?: string;
  competitionDescription?: string;
  image: string;
  status: TrackStatus;
  registrationEnabled: boolean;
  registrationLink: string;
}

export const tracksData: Track[] = [
  {
    id: "track-01",
    num: "01",
    name: "Hands-on Workshops",
    title: "Hands-on Workshops",
    category: "TECH",
    description: "Hands-on coding sprints and practical lab sessions.",
    badge: "TECH / OFFLINE SPRINT",
    competition: "Day 2 CodeSprint Challenge",
    competitionDescription: "Build and deploy prototypes evaluated by industry judges.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    status: "COMING_SOON",
    registrationEnabled: false,
    registrationLink: "/register?track=track-01"
  },
  {
    id: "track-02",
    num: "02",
    name: "Talk Sessions",
    title: "Talk Sessions",
    category: "TECH",
    description: "Expert sessions on ADAS, AI in Healthcare, and future tech.",
    badge: "TECH / TALKS",
    competition: "Day 2 Technical Ideathon",
    competitionDescription: "Present and defend innovative engineering applications.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    status: "COMING_SOON",
    registrationEnabled: false,
    registrationLink: "/register?track=track-02"
  },
  {
    id: "track-03",
    num: "03",
    name: "Soft Skills",
    title: "Soft Skills",
    category: "TRAIN",
    description: "Communication, interview preparation, and placement skills.",
    badge: "TRAIN / CAREER",
    competition: "Day 2 Pitch Challenge",
    competitionDescription: "Mock interview rounds and problem-solving showcase.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    status: "COMING_SOON",
    registrationEnabled: false,
    registrationLink: "/register?track=track-03"
  },
  {
    id: "track-04",
    num: "04",
    name: "Nano-Mentoring",
    title: "Nano-Mentoring",
    category: "TRAIN",
    description: "1-on-1 personalized mentoring with industry professionals.",
    badge: "TRAIN / MENTORING",
    competition: "Day 2 Portfolio Spotlight",
    competitionDescription: "Personalized portfolio reviews and career roadmaps.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    status: "COMING_SOON",
    registrationEnabled: false,
    registrationLink: "/register?track=track-04"
  }
];
