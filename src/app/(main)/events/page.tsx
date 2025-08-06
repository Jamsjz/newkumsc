import { getAllFrontMatter } from '@/lib/markdown';
import EventsClient from '@/components/features/events/EventsClient';

const EventsPage: React.FC = () => {
  const allEvents = getAllFrontMatter("events").sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return <EventsClient initialEvents={allEvents} />;
};

export default EventsPage;