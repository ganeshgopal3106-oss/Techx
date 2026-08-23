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
    id: "iot-building",
    num: "01",
    name: "IoT Building",
    description: "Master firmware deployment, sensor configurations, and embedded systems to construct physical prototypes.",
    badge: "HANDS-ON OFFLINE WORKSHOP",
    actionLink: "#join"
  },
  {
    id: "llm-building",
    num: "02",
    name: "LLM Building",
    description: "Build custom large language models, execute model fine-tuning, and design specialized agentic systems.",
    badge: "HANDS-ON OFFLINE WORKSHOP",
    actionLink: "#join"
  },
  {
    id: "adas-genetech",
    num: "03",
    name: "ADAS & Genetech",
    description: "Dive into Advanced Driver Assistance Systems (ADAS) and explore how computational biology scales through Gene Computing.",
    badge: "INTERDISCIPLINARY TALK SESSIONS",
    actionLink: "#join"
  },
  {
    id: "placement-mentor",
    num: "04",
    name: "Placement & Mentor",
    description: "Engage in interactive self-leadership, resume building, and get personalized mentoring directly from industry professionals.",
    badge: "CAREER LAUNCHPAD & PERSONALIZED GUIDANCE",
    actionLink: "#join"
  }
];
