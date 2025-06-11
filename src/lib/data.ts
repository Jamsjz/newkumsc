export const clubSocials = {
  github: "https://github.com/kumsc",
  instagram: "https://instagram.com/kumsc",
  facebook: "https://facebook.com/kumsc",
  linkedin: "https://linkedin.com/company/kumsc",
};

export interface Member {
  name: string;
  email: string;
  role: string;
  major: string;
  image: string;
  socials?: {
    github?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export const members: Member[] = [
  {
    name: "Shubheeksha Shrestha",
    email: "shubheeksha187@gmail.com",
    role: "President",
    major: "CM",
    image: "/images/Committe/Shubheeksha_CM_22.jpeg",
    socials: clubSocials,
  },
  {
    name: "Kala Kusum Kafle",
    email: "kusumacr07@gmail.com",
    role: "Vice President",
    major: "CM",
    image: "/images/Committe/Kala Kusum - CM23.jpg",
    socials: clubSocials,
  },
  {
    name: "Pratik Ray",
    email: "pratikraylight@gmail.com",
    role: "General Secretary",
    major: "CM",
    image: "/images/Committe/pratik_cm-2022.jpeg",
    socials: clubSocials,
  },
  {
    name: "Arpan Acharya",
    email: "arpan9823@student.ku.edu.np",
    role: "Secretary",
    major: "CM",
    image: "/images/Committe/Arpan-CM23.jpg",
    socials: clubSocials,
  },
  {
    name: "Sabin Pokharel",
    email: "savinpokharel@gmail.com",
    role: "Treasurer",
    major: "CM",
    image: "/images/Committe/sabin_cm.jpg",
    socials: clubSocials,
  },
  {
    name: "Pranjal Man Shakya",
    email: "studentpranjal321@gmail.com",
    role: "Vice Treasurer",
    major: "CM",
    image: "/images/Committe/Pranjal CM23.jpg",
    socials: clubSocials,
  },
  {
    name: "Bhaskar Paudyal",
    email: "jamsjz63@gmail.com",
    role: "Technical Lead",
    major: "DS",
    image: "/images/Committe/Bhashkar Paudyal-DS24.jpg",
    socials: clubSocials,
  },
  {
    name: "Anurag Kafle",
    email: "anuragk2992@gmail.com",
    role: "Executive Member",
    major: "CM",
    image: "/images/Committe/anurag CM22.jpg",
    socials: clubSocials,
  },
  {
    name: "Arpita Karn",
    email: "karnarpita7@gmail.com",
    role: "Executive Member",
    major: "DS",
    image: "/images/Committe/Arpita-DS24.JPG",
    socials: clubSocials,
  },
  {
    name: "Nayam Barun",
    email: "Nayambarun7@gmail.com",
    role: "Executive Member",
    major: "CM",
    image: "/images/Committe/Nayam_CM2024.jpg",
    socials: clubSocials,
  },
  {
    name: "Pranis Pandey",
    email: "pranispandey08@gmail.com",
    role: "Executive Member",
    major: "CM",
    image: "/images/Committe/PranisPandeyCM24.jpeg",
    socials: clubSocials,
  },
  {
    name: "Sufal Kadariya",
    email: "sufalkadariya3@gmail.com",
    role: "Executive Member",
    major: "DS",
    image: "/images/Committe/sufal-ds2024.jpeg",
    socials: clubSocials,
  },
];

export type Testimonial = {
  name: string;
  role: string;
  image: string;
  perspective: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Mukesh Tiwari",
    role: "Former President",
    image: "/images/archive/MukeshTiwari.webp", // Replace with your actual image path
    perspective:
      "My time with the Computational Mathematics Club has been transformative. The club’s environment is one of collaboration and innovation, where every member is encouraged to contribute and learn. The practical sessions and real-world problem-solving have prepared me for challenges beyond the classroom. I can’t imagine my university experience without this club.",
  },
  {
    name: "Astha Pandey",
    role: "Alumni",
    image: "/images/archive/AsthaPandey.webp", // Replace with your actual image path
    perspective:
      "As a recent graduate, I attribute much of my success to the experiences I gained through the Computational Mathematics Club. The club’s focus on teamwork and practical applications helped me bridge the gap between academic studies and professional demands. It’s a great platform for anyone eager to excel in computational mathematics.",
  },
  {
    name: "Pratik Sharma",
    role: "Alumni",
    image: "/images/archive/PratikSharma.webp", // Replace with your actual image path
    perspective:
      "The Computational Mathematics Club at Kathmandu University has been instrumental in connecting me with industry leaders and helping me secure valuable internships. The skills and knowledge I’ve gained through club activities have been pivotal in my professional development. I highly recommend this club to any student interested in making significant advancements in their mathematical career.",
  },
];
