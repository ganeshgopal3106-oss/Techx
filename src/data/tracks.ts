export type TrackStatus = 'coming-soon' | 'open' | 'closed';
export type TrackCategory = 'TECH' | 'TRAIN';

export interface Track {
  id: string;
  num: string;
  name: string;
  category: TrackCategory;
  description: string;
  badge: string;
  image: string;
  status: TrackStatus;
  registrationLink: string;
}

export const tracksData: Track[] = [
  {
    id: "track-01",
    num: "01",
    name: "Hands-on Workshops",
    category: "TECH",
    description: "Intensive coding sprints and technical labs organized as two specialized offline tracks.",
    badge: "TECH / OFFLINE SPRINT",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    status: "coming-soon",
    registrationLink: "/register?track=track-01"
  },
  {
    id: "track-02",
    num: "02",
    name: "Talk Sessions",
    category: "TECH",
    description: "Expert keynotes on interdisciplinary breakthroughs including Advanced Driver Assistance Systems (ADAS) and AI in Healthcare.",
    badge: "TECH / INTERDISCIPLINARY TALKS",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    status: "coming-soon",
    registrationLink: "/register?track=track-02"
  },
  {
    id: "track-03",
    num: "03",
    name: "Soft Skills",
    category: "TRAIN",
    description: "Master placement communication, resume curation, pitch delivery, and industry-ready soft skills.",
    badge: "TRAIN / CAREER PLACEMENT SESSIONS",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    status: "coming-soon",
    registrationLink: "/register?track=track-03"
  },
  {
    id: "track-04",
    num: "04",
    name: "Nano-Mentoring",
    category: "TRAIN",
    description: "Personalized 1-on-1 career counseling and portfolio roadmapping with distinguished young professionals from top tech firms.",
    badge: "TRAIN / 1-ON-1 PERSONALIZED GUIDANCE",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    status: "coming-soon",
    registrationLink: "/register?track=track-04"
  }
];
