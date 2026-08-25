export interface PreEvent {
  date: string;
  title: string;
  organizer: string;
}

export interface MainEventItem {
  time: string;
  event: string;
  isParallel?: boolean;
}

export interface MainEventDay {
  date: string;
  timeline: MainEventItem[];
}

export interface ScheduleData {
  preEvents: PreEvent[];
  mainEvents: MainEventDay[];
}

export const scheduleData: ScheduleData = {
  preEvents: [
    {
      date: "13th September",
      title: "Online Workshop",
      organizer: "IEEE CS CEAL SBC"
    },
    {
      date: "14th September",
      title: "BlindScript",
      organizer: "IEEE CS SCT SBC"
    },
    {
      date: "15th September",
      title: "AI in HealthCare",
      organizer: "IEEE EMBS SCT SBC"
    },
    {
      date: "16th September",
      title: "Competition",
      organizer: "IEEE CS GECBH SBC"
    },
    {
      date: "17th September",
      title: "CypherX",
      organizer: "IEEE COMSOC SCT SBC"
    },
    {
      date: "19th September",
      title: "ADAS — The Future of Driving",
      organizer: "IEEE IAS SCT SBC"
    }
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
