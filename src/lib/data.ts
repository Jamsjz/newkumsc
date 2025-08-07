import clubInfo from "@/data/clubInfo.json";
import perspectivesData from "@/data/perspectives.json";

export const clubSocials = clubInfo.clubInfo.socialMedia;





export type Testimonial = {
  name: string;
  role: string;
  image: string;
  perspective: string;
};

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: string;
  description: string;
  website: string;
}

export const testimonials: Testimonial[] = perspectivesData.testimonials;