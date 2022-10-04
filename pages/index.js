import { getFeaturedEvents } from "../test-data";
import EventList from "../components/events/event-list";

function HomeEventsPage() {
    const featuredEvents = getFeaturedEvents();

    return <div>
        <EventList events={featuredEvents} />
    </div>;
}

export default HomeEventsPage;