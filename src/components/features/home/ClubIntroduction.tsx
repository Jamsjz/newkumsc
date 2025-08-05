import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ClubIntroduction = () => {
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-balance text-left text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
        Kathmandu University Mathematics Student&apos;s Club
      </h1>
      <p className="max-w-2xl text-left text-muted-foreground">
        Kathmandu University Mathematics Students Club, shortly known as KUMSC,
        is a Departmental Club which fully and faithfully runs academic
        activities for the smooth growth of its members. The club was
        established back in 2018 as the youngest Department club of Kathmandu
        University, registered under the Student Welfare Council.
      </p>
      <p className="max-w-2xl text-left text-muted-foreground">
        Moreover, KUMSC serves as a hub for networking and mentorship,
        connecting students with experienced professionals and researchers in
        the field of computational mathematics.
      </p>
      <Button asChild size="lg" className="mt-4">
        <Link href="/events">
          Explore Events
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default ClubIntroduction;
