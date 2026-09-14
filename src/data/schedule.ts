export interface ScheduleSession {
  id: string;
  time: string;
  title: string;
  description: string;
  venue?: string;
  speaker?: string;
  organizer?: string;
  category?: string;
  isBreak?: boolean;
}

export interface ParallelSessionGroup {
  id: string;
  time: string;
  isParallel: true;
  category?: string;
  sessions: ScheduleSession[];
}

export type ScheduleItem = ScheduleSession | ParallelSessionGroup;

export interface ScheduleDay {
  id: 'day-1' | 'day-2';
  dayNumber: 'DAY 1' | 'DAY 2';
  date: string;
  subtitle: string;
  items: ScheduleItem[];
}

export interface PreEvent {
  date: string;
  title: string;
  organizer: string;
  venue?: string;
  description?: string;
}

export const daysScheduleData: ScheduleDay[] = [
  {
    id: 'day-1',
    dayNumber: 'DAY 1',
    date: '26 September 2026',
    subtitle: 'Summit Kickoff, Hands-On Workshops & Keynotes',
    items: [
      {
        id: 'd1-inauguration',
        time: '09:30 AM – 10:30 AM',
        title: 'Inauguration Ceremony',
        description: 'Official opening ceremony with welcome addresses by college leadership, faculty advisors, and senior IEEE Computer Society dignitaries.',
        venue: 'Seminar Hall',
        category: 'KEYNOTE'
      },
      {
        id: 'd1-workshop-1',
        time: '10:30 AM – 01:00 PM',
        title: 'Workshop Session I (2 Tracks)',
        description: 'Intensive parallel technical sprints covering Full-stack Development and Advanced IoT Systems with live code implementations.',
        venue: 'Computer Labs 2 & 3',
        category: 'WORKSHOP'
      },
      {
        id: 'd1-lunch',
        time: '01:00 PM – 02:00 PM',
        title: 'Lunch Break & Networking',
        description: 'Buffet lunch and informal networking with peers, student branch leaders, and workshop mentors.',
        venue: 'College Cafeteria',
        isBreak: true
      },
      {
        id: 'd1-workshop-2',
        time: '02:00 PM – 03:30 PM',
        title: 'Workshop Session II',
        description: 'Deep-dive project building, guided debugging labs, and preparation for tomorrow\'s capstone challenge sprint.',
        venue: 'Lab Sprints Area',
        category: 'WORKSHOP'
      },
      {
        id: 'd1-softskills',
        time: '03:30 PM – 04:30 PM',
        title: 'Soft Skills Talk Session',
        description: 'Interactive session on campus-to-corporate transition, resume curation, and placement interview communication.',
        venue: 'Auditorium Annex',
        category: 'TRAINING'
      },
      {
        id: 'd1-tea',
        time: '04:30 PM – 05:00 PM',
        title: 'Tea Break & Discussion',
        description: 'Evening refreshments and open discussion among participants and organizing team.',
        venue: 'Courtyard',
        isBreak: true
      },
      {
        id: 'd1-games',
        time: '05:00 PM – 06:30 PM',
        title: 'Tech Games & Icebreakers',
        description: 'Fast-paced technical trivia, lightning coding challenges, and prize giveaways for summit delegates.',
        venue: 'Central Lobby',
        category: 'COMMUNITY'
      }
    ]
  },
  {
    id: 'day-2',
    dayNumber: 'DAY 2',
    date: '27 September 2026',
    subtitle: 'Competitions, Nano-Mentoring & Valedictory',
    items: [
      {
        id: 'd2-competition',
        time: '09:30 AM – 01:00 PM',
        title: 'Competition (Based on Workshop)',
        description: 'Capstone hackathon evaluation where teams build real-world prototypes evaluated by distinguished industry judges.',
        venue: 'Main Labs',
        category: 'HACKATHON'
      },
      {
        id: 'd2-lunch',
        time: '01:00 PM – 02:00 PM',
        title: 'Lunch Break',
        description: 'Afternoon lunch break and informal team discussions before the mentoring pods.',
        venue: 'College Cafeteria',
        isBreak: true
      },
      {
        id: 'd2-parallel-block',
        time: '02:00 PM – 04:00 PM',
        isParallel: true,
        category: 'PARALLEL TRACKS',
        sessions: [
          {
            id: 'd2-nano-mentoring',
            time: '02:00 PM – 04:00 PM',
            title: 'Nano Mentoring',
            description: 'Personalized 1-on-1 counseling pods with distinguished industry mentors for portfolio reviews and career roadmapping.',
            venue: 'Classrooms 101–104',
            category: 'MENTORSHIP'
          },
          {
            id: 'd2-vibe-check',
            time: '02:00 PM – 04:00 PM',
            title: 'Vibe Check / CS MD Session',
            description: 'Interactive Computer Society Membership Development session with open mic talks and community activities.',
            venue: 'CS Lounge',
            category: 'COMMUNITY'
          }
        ]
      },
      {
        id: 'd2-break',
        time: '04:00 PM – 04:30 PM',
        title: 'Break & Refreshments',
        description: 'Short break prior to the cultural showcase and awards presentation.',
        venue: 'Courtyard',
        isBreak: true
      },
      {
        id: 'd2-culturals',
        time: '04:30 PM – 05:30 PM',
        title: 'Culturals',
        description: 'Live musical performances and student artistic showcases celebrating summit camaraderie.',
        venue: 'Auditorium',
        category: 'CULTURALS'
      },
      {
        id: 'd2-closing',
        time: '05:30 PM – 06:30 PM',
        title: 'Closing Ceremony & Awards',
        description: 'Prize distribution for hackathon winners, distribution of certificates, and official valedictory address.',
        venue: 'Main Hall',
        category: 'CEREMONY'
      }
    ]
  }
];

// Backward compatibility export
export const scheduleData = {
  preEvents: [
    { date: "13th September", title: "Online Workshop", organizer: "IEEE CS CEAL SBC" },
    { date: "14th September", title: "BlindScript", organizer: "IEEE CS SCT SBC" },
    { date: "15th September", title: "AI in HealthCare", organizer: "IEEE EMBS SCT SBC" },
    { date: "16th September", title: "Competition", organizer: "IEEE CS GECBH SBC" },
    { date: "17th September", title: "CypherX", organizer: "IEEE COMSOC SCT SBC" },
    { date: "19th September", title: "ADAS — The Future of Driving", organizer: "IEEE IAS SCT SBC" }
  ],
  mainEvents: [
    {
      date: "26th September",
      timeline: [
        { time: "9:30 AM – 10:30 AM", event: "Inauguration" },
        { time: "10:30 AM – 1:00 PM", event: "Workshop Session I (2 Tracks)" },
        { time: "1:00 PM – 2:00 PM", event: "Lunch Break" },
        { time: "2:00 PM – 3:30 PM", event: "Workshop Session II" },
        { time: "3:30 PM – 4:30 PM", event: "Soft Skills Talk Session" },
        { time: "4:30 PM – 5:00 PM", event: "Break" },
        { time: "5:00 PM – 6:30 PM", event: "Games" }
      ]
    },
    {
      date: "27th September",
      timeline: [
        { time: "9:30 AM – 1:00 PM", event: "Competition (based on workshop)" },
        { time: "1:00 PM – 2:00 PM", event: "Lunch Break" },
        { time: "2:00 PM – 4:00 PM", event: "Nano Mentoring", isParallel: true },
        { time: "2:00 PM – 4:00 PM", event: "Vibe Check, CS MD Session", isParallel: true },
        { time: "4:00 PM – 4:30 PM", event: "Break" },
        { time: "4:30 PM – 5:30 PM", event: "Culturals" },
        { time: "5:30 PM – 6:30 PM", event: "Closing Ceremony" }
      ]
    }
  ]
};
