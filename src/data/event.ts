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
  title: "TECHX REIGNITE",
  tagline: "Powering Minds, One spark at a time",
  dateRange: "July 13 - 19, 2026",
  dates: {
    start: "July 13",
    end: "July 19",
    year: "2026"
  },
  location: "Sree Chitra Thirunal College of Engineering (SCTCE), Pappanamcode",
  locationShort: "SCT College of Engineering",
  format: "Hybrid Sprint (Online Days 1-4, Offline Days 5-7)",
  organizedBy: "IEEE Computer Society SCT SBC",
  organizedByFull: "IEEE Computer Society SCT Student Branch Chapter",
  registrationOpen: true
};
