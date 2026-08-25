export interface Track {
  id: string;
  num: string;
  name: string;
  description: string;
  badge: string;
  actionLink: string;
}

export const tracksData: Track[] = [
  {
    id: "tech-workshops",
    num: "01",
    name: "Hands-on Workshops",
    description: "Hands-on workshops will be organized as two tracks and held offline.",
    badge: "TECH / OFFLINE SPRINT",
    actionLink: "/register"
  },
  {
    id: "tech-talks",
    num: "02",
    name: "Talk Sessions",
    description: "Interactive talk sessions on interdisciplinary topics including Advanced Driver Assistance Systems (ADAS) and AI in Healthcare.",
    badge: "TECH / INTERDISCIPLINARY TALKS",
    actionLink: "/register"
  },
  {
    id: "train-softskills",
    num: "03",
    name: "Soft Skills",
    description: "Interactive sessions on soft skills and effective communication to aid the placement process of students.",
    badge: "TRAIN / CAREER PLACEMENT SESSIONS",
    actionLink: "/register"
  },
  {
    id: "train-mentoring",
    num: "04",
    name: "Nano-Mentoring",
    description: "A mentoring session for participants based on their requirements by eminent young professionals from the industry. The session will provide personalized guidance to each participant.",
    badge: "TRAIN / 1-ON-1 PERSONALIZED GUIDANCE",
    actionLink: "/register"
  }
];
