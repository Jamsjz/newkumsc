import clubInfo from "@/data/clubInfo.json";
import publicationsData from "@/data/publications.json";

export const clubSocials = clubInfo.clubInfo.socialMedia;





export type Testimonial = {
  name: string;
  role: string;
  image: string;
  perspective: string;
};

export const testimonials: Testimonial[] = publicationsData.testimonials;