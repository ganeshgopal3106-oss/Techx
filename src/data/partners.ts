export interface Partner {
  name: string;
  logoUrl?: string; // Optional image URL
  fallbackText: string;
}

export const partnersData: Partner[] = [
  {
    name: "IEEE CS SYP",
    fallbackText: "IEEE CS SYP"
  },
  {
    name: "IEEE CS Kerala Chapter",
    fallbackText: "IEEE CS Kerala"
  },
  {
    name: "IEEE ComSoc Kerala Chapter",
    fallbackText: "IEEE ComSoc Kerala"
  },
  {
    name: "GEC Barton Hill SBC",
    fallbackText: "GECBH SBC"
  },
  {
    name: "CE Attingal SBC",
    fallbackText: "CEA SBC"
  },
  {
    name: "IEEE IAS SCT SBC",
    fallbackText: "IEEE IAS SCT"
  },
  {
    name: "IEEE EMBS SCT SBC",
    fallbackText: "IEEE EMBS SCT"
  }
];
