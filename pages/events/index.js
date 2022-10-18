import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";
import { getAllEvents } from "../../test-data";

function AllEventsPage() {
    const allEvents = getAllEvents();

    return <Fragment>
        <EventSearch />
        <EventList events={allEvents} />
    </Fragment>;
}

export default AllEventsPage;