export interface Partner {
  name: string;
  logoUrl?: string; // Optional image URL
  fallbackText: string;
  websiteUrl?: string; // Official website link
}

export const partnersData: Partner[] = [
  {
    name: "IEEE CS CEAL SBC",
    fallbackText: "IEEE CS CEAL SBC",
    websiteUrl: "https://www.computer.org"
  },
  {
    name: "IEEE CS SCT SBC",
    fallbackText: "IEEE CS SCT SBC",
    websiteUrl: "https://sctsb.org"
  },
  {
    name: "IEEE EMBS SCT SBC",
    fallbackText: "IEEE EMBS SCT SBC",
    websiteUrl: "https://www.embs.org"
  },
  {
    name: "IEEE CS GECBH SBC",
    fallbackText: "IEEE CS GECBH SBC",
    websiteUrl: "https://www.computer.org"
  },
  {
    name: "IEEE COMSOC SCT SBC",
    fallbackText: "IEEE COMSOC SCT SBC",
    websiteUrl: "https://www.comsoc.org"
  },
  {
    name: "IEEE IAS SCT SBC",
    fallbackText: "IEEE IAS SCT SBC",
    websiteUrl: "https://ias.ieee.org"
  }
];
