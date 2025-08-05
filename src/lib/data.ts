import clubInfo from "@/data/clubInfo.json";
import membersData from "@/data/leadership.json";
import publicationsData from "@/data/publications.json";

export const clubSocials = clubInfo.clubInfo.socialMedia;

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

export const members: Member[] = membersData;

export type Testimonial = {
  name: string;
  role: string;
  image: string;
  perspective: string;
};

export const testimonials: Testimonial[] = publicationsData.testimonials;