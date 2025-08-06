


import { EventBanner } from "@/components/features/home/EventBanner";
import Hero from "@/components/features/home/Hero";
import QuickStats from "@/components/features/home/QuickStats";



import SponsorsSection from "@/components/features/home/SponsorsSection";
import UpcomingEvents from "@/components/features/home/UpcomingEvents";



import { getAllFrontMatter } from "@/lib/markdown";
import { TestimonialCarousel } from "@/components/features/home/Perspectives";
import CallToAction from "@/components/features/home/CallToAction";

export default function HomePage() {
	const allEvents = getAllFrontMatter("events").sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
	const now = new Date().setHours(0,0,0,0); // Get today's date at midnight for comparison

	const futureEvents = allEvents.filter(event => new Date(event.date).getTime() >= now);
	const pastEvents = allEvents.filter(event => new Date(event.date).getTime() < now);

	// Map future events for UpcomingEvents component
	const upcomingEventsForComponent = futureEvents.slice(0, 4).map(event => ({
		...event,
		time: event.time || "N/A",
		location: event.location || "N/A",
		category: event.category || "all",
		attendees: event.attendees || 0,
		maxAttendees: event.maxAttendees || 0,
		speaker: event.speaker || "N/A",
		featured: event.featured || false,
		image: event.image || "",
		registrationOpen: event.registrationOpen || false,
		price: event.price || "Free",
		prerequisites: event.prerequisites || "N/A",
		materials: event.materials || [],
		formLink: event.formLink || "",
	}));

	// Map past events for EventBanner
	const recentEventsForBanner = pastEvents.slice(0, 4);

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
				<EventBanner events={recentEventsForBanner} />
			</section>

			<SponsorsSection />

			<section>
				<h2 className="text-3xl font-bold tracking-tight text-center mb-8">Upcoming Events</h2>
				<UpcomingEvents events={upcomingEventsForComponent} />
			</section>

			<section className="w-full bg-muted/50 py-10">
				<div className="px-4 sm:px-6 md:px-8">
					<h1 className="text-center text-balance text-3xl font-extrabold tracking-tight">
						Perspectives on Mathematics Students Club
					</h1>
					<TestimonialCarousel />
				</div>
			</section>

			
			<CallToAction />
		</main>
	);
}