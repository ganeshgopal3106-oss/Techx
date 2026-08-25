export interface Partner {
  name: string;
  logoUrl?: string; // Optional image URL
  fallbackText: string;
}

export const partnersData: Partner[] = [
  {
    name: "IEEE CS CEAL SBC",
    fallbackText: "IEEE CS CEAL SBC"
  },
  {
    name: "IEEE CS SCT SBC",
    fallbackText: "IEEE CS SCT SBC"
  },
  {
    name: "IEEE EMBS SCT SBC",
    fallbackText: "IEEE EMBS SCT SBC"
  },
  {
    name: "IEEE CS GECBH SBC",
    fallbackText: "IEEE CS GECBH SBC"
  },
  {
    name: "IEEE COMSOC SCT SBC",
    fallbackText: "IEEE COMSOC SCT SBC"
  },
  {
    name: "IEEE IAS SCT SBC",
    fallbackText: "IEEE IAS SCT SBC"
  }
];
