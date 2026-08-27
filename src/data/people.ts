export interface Person {
  name: string;
  role: string;
  organization: string;
  about: string;
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
      about: "Distinguished technology advisor and senior engineer with over 12 years of experience in system architecture, microservices, and cloud deployments. Actively mentors computer science students and supports IEEE student branch chapter initiatives.",
      image: "" // Empty will render placeholder image UI
    },
    {
      name: "Speaker 2",
      role: "Lead Systems Engineer",
      organization: "Research Lab",
      about: "Experienced systems engineer specializing in Advanced Driver Assistance Systems (ADAS) automation, edge computing, and automotive sensors. Leading multiple initiatives at pioneering industrial research hubs.",
      image: ""
    },
    {
      name: "Speaker 3",
      role: "Senior ML Developer",
      organization: "AI Solutions",
      about: "Deep learning practitioner focused on healthcare informatics, convolutional neural networks, and computer vision models. Passionate about applying AI solutions to enhance clinical diagnostic accuracy.",
      image: ""
    }
  ] as Person[]
};
