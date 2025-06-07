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
