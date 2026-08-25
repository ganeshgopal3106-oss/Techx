export interface EventInfoData {
  title: string;
  tagline: string;
  dateRange: string;
  dates: {
    start: string;
    end: string;
    year: string;
  };
  location: string;
  locationShort: string;
  format: string;
  organizedBy: string;
  organizedByFull: string;
  registrationOpen: boolean;
}

export const eventData: EventInfoData = {
  title: "TechX REIGNITE",
  tagline: "Powering Minds, One spark at a time",
  dateRange: "13th – 27th September 2026",
  dates: {
    start: "13th September",
    end: "27th September",
    year: "2026"
  },
  location: "Sree Chitra Thirunal College of Engineering (SCTCE), Pappanamcode",
  locationShort: "SCT College of Engineering",
  format: "Pre-events (13th–19th September) | Main Programme (26th–27th September)",
  organizedBy: "IEEE CS SCT SBC",
  organizedByFull: "IEEE CS SCT Student Branch Chapter",
  registrationOpen: true
};
