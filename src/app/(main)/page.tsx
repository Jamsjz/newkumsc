import Image from "next/image";
import Link from "next/link";

import { EventBanner } from "@/components/features/home/EventBanner";
import Hero from "@/components/features/home/Hero";
import QuickStats from "@/components/features/home/QuickStats";
import ClubIntroduction from "@/components/features/home/ClubIntroduction";
import ClubFeatures from "@/components/features/home/ClubFeatures";
import InfinityFeature from "@/components/features/home/InfinityFeature";

import { Button } from "@/components/ui/button";

import { getAllFrontMatter } from "@/lib/markdown";
import { TestimonialCarousel } from "@/components/features/home/Perspectives";

export default function HomePage() {
	const events = getAllFrontMatter("events");

	return (
		<main className="flex flex-col gap-10 md:gap-16 animate__animated animate__fadeIn">
			<section>
				<Hero />
			</section>
			<section>
				<QuickStats />
			</section>
			<section>
				<h2 className="text-3xl font-bold tracking-tight text-center mb-8">Recent Events</h2>
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

			<section className="w-full bg-muted/50 py-10">
				<div className="px-4 sm:px-6 md:px-8">
					<h1 className="text-center text-balance text-3xl font-extrabold tracking-tight">
						Perspectives on Mathematics Students Club
					</h1>
					<TestimonialCarousel />
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