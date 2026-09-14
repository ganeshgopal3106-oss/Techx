export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "what-is-techx",
    question: "What is TechX Reignite?",
    answer: "TechX Reignite is a premier 7-day engineering sprint and flagship event of IEEE SCT Student Branch Chapter. It is designed specifically for builders, developers, and designers to collaborate, configure complex systems, compete in speed trials, and learn from industry experts."
  },
  {
    id: "who-is-eligible",
    question: "Who is eligible to participate?",
    answer: "The event is open to all university students, developers, and tech enthusiasts. Whether you are a beginner looking to build your first system or a seasoned hacker aiming for speed records, there is a track for you."
  },
  {
    id: "team-configurations",
    question: "How do teams work?",
    answer: "You can register individually or in teams of up to 4 members. If you register individually, we will host team-matching activities on Day 1 to help you find your team."
  },
  {
    id: "hardware-software",
    question: "What hardware or software do I need to bring?",
    answer: "All participants should bring their personal laptops. For specialized tracks, testing equipment and physical prototyping hardware will be fully provided by the organization."
  },
  {
    id: "ticket-prices",
    question: "What are the ticket prices for the event?",
    answer: "Tickets are priced based on your registration status: ₹200 for IEEE Computer Society members, ₹300 for general IEEE members, and ₹400 for non-IEEE members."
  },
  {
    id: "event-venue",
    question: "Where is the event venue?",
    answer: "Pre-events (Days 1 to 4) including tech talks and webinars will be held online. The main flagship inauguration and hands-on workshops (Days 5 to 7) will take place offline at Sree Chitra Thirunal College of Engineering (SCTCE)."
  },
  {
    id: "certificates",
    question: "Will I get certificates for participating?",
    answer: "Yes, all active participants who complete the workshop tracks and submit sprint challenges will receive official participation certificates from the IEEE SCT Student Branch Chapter."
  },
  {
    id: "food-refreshments",
    question: "Are there food and refreshments provided?",
    answer: "Yes, working lunch, high-tea, and refreshments will be fully provided to all registered participants during the offline workshop days."
  }
];
