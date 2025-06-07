// src/app/committee/page.tsx

import Image from "next/image";
import Link from "next/link";
// Corrected: Using the new, non-deprecated icon names
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { members, Member } from "@/lib/data";

function MemberCard({ member }: { member: Member }) {
  return (
    <Card className="flex flex-col overflow-hidden text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full">
          <Image
            src={member.image}
            alt={`Photo of ${member.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg">{member.name}</CardTitle>
        <CardDescription className="mt-1 text-primary">
          {member.role}
        </CardDescription>
        <Badge variant="secondary" className="mt-2">
          {member.major}
        </Badge>
      </CardContent>
      <CardFooter className="flex justify-center gap-3 p-4 pt-0">
        <Link
          href={`mailto:${member.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          {/* Corrected: Using the new icon component */}
          <MailIcon className="h-5 w-5" />
          <span className="sr-only">Email</span>
        </Link>
        {member.socials?.linkedin && (
          <Link
            href={member.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <LinkedinIcon className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        )}
        {member.socials?.github && (
          <Link
            href={member.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <GithubIcon className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        )}
        {member.socials?.instagram && (
          <Link
            href={member.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <InstagramIcon className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

export default function CommitteePage() {
  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 md:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Meet Our Committee
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          The driving force behind KUMSC, dedicated to fostering a vibrant
          mathematical community.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.map((member) => (
          <MemberCard key={member.email} member={member} />
        ))}
      </div>
    </main>
  );
}
