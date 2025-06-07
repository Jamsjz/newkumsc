import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Users } from "lucide-react";

import { EventBanner } from "@/components/features/home/EventBanner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllFrontMatter } from "@/lib/markdown";

function ClubIntroduction() {
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-balance text-left text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
        Kathmandu University Mathematics Student's Club
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
}

function ClubFeatures() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Academic Growth",
      description:
        "Engage in activities designed to foster academic excellence and deepen your understanding of mathematics.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Networking Hub",
      description:
        "Connect with peers, alumni, and professionals in the field of computational mathematics and beyond.",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      title: "Mentorship",
      description:
        "Gain valuable insights and guidance from experienced researchers and industry experts through our programs.",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {features.map((feature) => (
        <Card key={feature.title}>
          <CardHeader>
            {feature.icon}
            <CardTitle className="mt-4">{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

// New component for the Infinity event section
function InfinityFeature() {
  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
      {/* Left Column: Infinity Logo */}
      <div className="flex justify-center">
        <Image
          src="/images/infinity.png" // Make sure this path is correct
          alt="Infinity Event Logo"
          width={250}
          height={250}
          className="h-auto w-48 md:w-64"
        />
      </div>
      {/* Right Column: Infinity Description */}
      <div className="flex flex-col items-start gap-4">
        <h2 className="text-balance text-left text-3xl font-extrabold tracking-tight">
          Our Flagship Event: Infinity
        </h2>
        <p className="text-left text-muted-foreground">
          Every year, Infinity brings together the brightest minds, the most
          innovative thinkers, and the most passionate creators for a
          one-of-a-kind gathering. It’s a celebration of limitless potential and
          a testament to what happens when curiosity meets ingenuity.
        </p>
        <p className="text-left text-muted-foreground">
          So mark your calendars and join us as we embark on an unforgettable
          journey at Infinity. Together, let’s celebrate the power of
          creativity, the joy of discovery, and the endless possibilities that
          lie ahead. Infinity awaits – are you ready to explore?
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const events = getAllFrontMatter("events");

  return (
    <main className="flex flex-col gap-20 md:gap-32 animate__animated animate__fadeIn">
      <section>
        <EventBanner events={events} />
      </section>

      <section className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <ClubIntroduction />
          </div>
          <div className="order-1 md:order-2">
            <div className="relative h-80 overflow-hidden rounded-lg sm:h-96">
              <Image
                src="/images/kumsc-cover.png"
                alt="A cover image featuring students from the KUMSC"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">What We Offer</h2>
          <p className="mt-2 text-muted-foreground">
            Core pillars that define the KUMSC experience.
          </p>
        </div>
        <div className="mt-12">
          <ClubFeatures />
        </div>
      </section>

      {/* New Section: Highlighting the Infinity Event */}
      <section className="bg-muted/50 py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <InfinityFeature />
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Join Our Community
          </h2>
          <p className="mt-2 text-muted-foreground">
            Become a part of a vibrant group of mathematics enthusiasts.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">Become a Member</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
