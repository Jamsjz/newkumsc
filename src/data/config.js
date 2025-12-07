import { Brain, Shield, Leaf, Cpu, Lightbulb, Linkedin, Instagram, Facebook } from 'lucide-react';

export const siteConfig = {
  name: "Infinity CodeWave",
  tagline: "Where Math Meets Code",
  subTagline: "Nepal's Premier Computational Mathematics Hackathon",
  eventName: "Infinity", // KUMSC's annual event
  date: "April 24-25, 2026",
  eventDate: "2026-04-24T00:00:00+05:45", // ISO format with Nepal timezone for countdown
  location: "Kathmandu University, Dhulikhel",
  admission: "Free for all Students",
  registrationLink: "#", // TODO: Update with actual registration link
  mlhCodeOfConduct: "https://static.mlh.io/docs/mlh-code-conduct.pdf",
  
  // SEO Configuration
  seo: {
    title: "Infinity CodeWave | Nepal's Premier Computational Mathematics Hackathon",
    description: "Join Infinity CodeWave on April 24-25, 2026 at Kathmandu University. A 48-hour hackathon where mathematics meets code. Part of KUMSC's annual Infinity event. Free admission for all students!",
    keywords: [
      "hackathon",
      "CodeWave",
      "Kathmandu University",
      "KUMSC",
      "mathematics hackathon",
      "Nepal hackathon",
      "coding competition",
      "computational mathematics",
      "AI hackathon",
      "student hackathon",
      "free hackathon Nepal"
    ],
    ogImage: "/og-image.png", // TODO: Add actual OG image
    siteUrl: "https://codewave.kumsc.org", // TODO: Update with actual URL
    twitterHandle: "@kumsc_ku", // TODO: Update with actual handle
    locale: "en_US",
    type: "website"
  },
  
  socialLinks: [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" }
  ],

  stats: [
    { value: "30+", label: "Universities" },
    { value: "50+", label: "Partners" },
    { value: "Rs. 5L+", label: "in Prizes" }
  ],

  tracks: [
    {
      icon: Brain,
      title: "AI & Applied Mathematics",
      description: "Data science, machine learning, optimization, neural networks.",
      examples: "Smarter traffic flow, ML for health, financial optimization."
    },
    {
      icon: Shield,
      title: "Secure & Smart Future",
      description: "Cryptography, blockchain, cybersecurity, privacy-preserving systems.",
      examples: "Secure messaging, decentralized apps, privacy tools."
    },
    {
      icon: Leaf,
      title: "Math + Computing for Good",
      description: "Sustainability, climate change, education, social impact.",
      examples: "Energy-efficient optimization, disaster response models."
    },
    {
      icon: Cpu,
      title: "Next-Gen Tech & Quantum",
      description: "Quantum computing, post-quantum cryptography, futuristic algorithms.",
      examples: "Quantum-inspired algorithms, secure quantum communication demos."
    },
    {
      icon: Lightbulb,
      title: "Open Innovation (Wildcard)",
      description: "Free track for hackers to build anything creative with math + computing.",
      examples: "Creative visualizations, educational apps, or art + math projects."
    }
  ],

  faqs: [
    {
      question: "Is there an entry fee?",
      answer: "No, Infinity CodeWave is 100% free for all admitted participants. Meals and swag are included."
    },
    {
      question: "Do I need a team?",
      answer: "You can come solo or with a team of up to 4. Don't have a team? No worries! We'll have team formation activities at the start of the event."
    },
    {
      question: "Who can participate?",
      answer: "Any student (High School or University) with a valid ID. Both undergraduate and graduate students are welcome."
    },
    {
      question: "What should I bring?",
      answer: "Bring your laptop, charger, student ID, and any hardware you want to hack with. We'll provide food, drinks, WiFi, and a great hacking environment!"
    },
    {
      question: "Do I need to know advanced math?",
      answer: "Not at all! While the hackathon emphasizes computational mathematics, projects at all skill levels are welcome. Mentors will be available to help."
    },
    {
      question: "When and where is Infinity CodeWave?",
      answer: "Infinity CodeWave takes place on April 24-25, 2026 at Kathmandu University, Dhulikhel. The event runs for 48 hours and is part of KUMSC's annual Infinity event."
    }
  ],

  sponsors: [
    { name: "Platinum Sponsor", tier: "Platinum", logo: null },
    { name: "Platinum Sponsor", tier: "Platinum", logo: null },
    { name: "Gold Sponsor", tier: "Gold", logo: null },
    { name: "Gold Sponsor", tier: "Gold", logo: null },
    { name: "Gold Sponsor", tier: "Gold", logo: null },
    { name: "Silver Sponsor", tier: "Silver", logo: null },
    { name: "Silver Sponsor", tier: "Silver", logo: null },
    { name: "Bronze Sponsor", tier: "Bronze", logo: null },
    { name: "Bronze Sponsor", tier: "Bronze", logo: null },
  ],

  // Organizer information
  organizer: {
    name: "Kathmandu University Mathematics Students' Club (KUMSC)",
    shortName: "KUMSC",
    supportedBy: "Department of Mathematics, Kathmandu University",
    email: "mathsclub@ku.edu.np", // TODO: Update with actual email
    website: "https://kumsc.org" // TODO: Update with actual website
  }
};
