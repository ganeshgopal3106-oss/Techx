export interface SubEvent {
  time: string;
  title: string;
  description?: string;
}

export interface DaySchedule {
  day: string;
  date: string;
  timeRange: string;
  title: string;
  description?: string;
  subEvents?: SubEvent[];
  isOffline?: boolean;
}

export const scheduleData: DaySchedule[] = [
  {
    day: "Day 1",
    date: "July 13",
    timeRange: "9:00 AM – 4:00 PM",
    title: "Cybersecurity Workshop",
    description: "Hands-on technical session organized in collaboration with IEEE CS College of Engineering Attingal SBC.",
    isOffline: false
  },
  {
    day: "Day 2",
    date: "July 14",
    timeRange: "8:00 AM – 4:00 PM",
    title: "8-Hour AI-thon",
    description: "Intensive software build sprint in collaboration with IEEE CS Government Engineering College Barton Hill SBC.",
    isOffline: false
  },
  {
    day: "Day 3",
    date: "July 15",
    timeRange: "7:00 PM – 8:00 PM",
    title: "Introduction to ADAS",
    description: "Interactive talk session on Advanced Driver Assistance Systems with IEEE IAS SCT SBC.",
    isOffline: false
  },
  {
    day: "Day 4",
    date: "July 16",
    timeRange: "7:00 PM – 8:00 PM",
    title: "Gene Computing",
    description: "Computational biology and genetics talk session with IEEE EMBS SCT SBC.",
    isOffline: false
  },
  {
    day: "Day 5",
    date: "July 17",
    timeRange: "4:30 PM – 6:00 PM",
    title: "Grand Inauguration",
    description: "Launch ceremony and event orientation for all registered participants.",
    isOffline: true
  },
  {
    day: "Day 6",
    date: "July 18",
    timeRange: "Full Day (8:30 AM – 5:00 PM)",
    title: "Main Workshop & Soft Skills",
    description: "Intensive hands-on sessions for both IoT and LLM tracks alongside professional training.",
    isOffline: true,
    subEvents: [
      { time: "8:30 AM", title: "Registration", description: "Collect passes, welcome kit, and assemble at the main hall." },
      { time: "9:30 AM", title: "IoT & LLM Building Workshops", description: "Parallel tracks deep dive. Hardware deployment & model fine-tuning." },
      { time: "1:30 PM", title: "Networking Session", description: "Interactions with peers and session guides over working lunch." },
      { time: "4:00 PM", title: "Interactive Soft Skill Development", description: "Self-leadership and communication coaching." }
    ]
  },
  {
    day: "Day 7",
    date: "July 19",
    timeRange: "Full Day (9:30 AM – 5:00 PM)",
    title: "Competition & Mentoring",
    description: "Submit sprints, pitch to mentors, and present awards.",
    isOffline: true,
    subEvents: [
      { time: "9:30 AM", title: "Track Competitions", description: "Speed trials, firmware checks, and agentic task challenges." },
      { time: "1:30 PM", title: "Nano Mentoring with IEEE CS SYP", description: "One-on-one resume reviews, career mapping, and project guidance." },
      { time: "3:30 PM", title: "Parallel Events", description: "Computer Society ExCom meeting & membership development session." },
      { time: "4:30 PM", title: "Awards & Valedictory Ceremony", description: "Cash prizes, winner plaques, and developer goodies distribution." }
    ]
  }
];
