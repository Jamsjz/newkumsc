import clubInfo from "@/data/clubInfo.json";
import perspectivesData from "@/data/perspectives.json";

export const clubSocials = clubInfo.clubInfo.socialMedia;





export type Testimonial = {
  name: string;
  role: string;
  image: string;
  perspective: string;
};

export const testimonials: Testimonial[] = perspectivesData.testimonials;