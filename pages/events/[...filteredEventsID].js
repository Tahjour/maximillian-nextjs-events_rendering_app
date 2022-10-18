import { getFilteredEvents } from "../../test-data";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";

function FilteredEventsPage() {
    const router = useRouter();
    const filteredEventsId = router.query.filteredEventsID;

    const filterYear = router.query.filteredEventsID[0];
    const filterMonth = router.query.filteredEventsID[1];
    const numYear = +filterYear;
    const numMonth = +filterMonth;
    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        return <p>Invalid Filter. Please check values!</p>;
    }
    const dateFilters = {
        year: numYear,
        month: numMonth
    };
    const filteredEvents = getFilteredEvents(dateFilters);
    if (!filteredEvents || filteredEvents.length < 1) {
        return <p>No Events Found!</p>;
    }
    return <div>
        <EventList events={filteredEvents} />
    </div>;
}

export default FilteredEventsPage;