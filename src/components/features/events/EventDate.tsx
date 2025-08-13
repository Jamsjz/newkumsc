import { format } from 'date-fns';
import { FrontMatter } from '@/lib/markdown';

interface EventDateProps {
  event: FrontMatter;
}

const EventDate: React.FC<EventDateProps> = ({ event }) => {
  if (event.from && event.to) {
    return (
      <span>
        {format(new Date(event.from), 'MMM dd')} - {format(new Date(event.to), 'MMM dd, yyyy')}
      </span>
    );
  } else if (event.date) {
    return <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>;
  }
  return null;
};

export default EventDate;
