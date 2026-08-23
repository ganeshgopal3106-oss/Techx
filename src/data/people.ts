export interface Person {
  name: string;
  role: string;
  organization: string;
  image?: string;
}

export const peopleConfig = {
  isEnabled: true, // Toggle this to show/hide the Speakers section completely
  title: "Meet the Speakers & Mentors",
  sectionNum: "03",
  people: [
    {
      name: "Speaker 1",
      role: "Industry Professional / Advisor",
      organization: "Tech Organization",
      image: "" // Empty will render placeholder image UI
    },
    {
      name: "Speaker 2",
      role: "Lead Systems Engineer",
      organization: "Research Lab",
      image: ""
    },
    {
      name: "Speaker 3",
      role: "Senior ML Developer",
      organization: "AI Solutions",
      image: ""
    }
  ] as Person[]
};
