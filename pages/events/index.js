import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-utils";

function AllEventsPage(props) {
    return <Fragment>
        <EventSearch />
        <EventList events={props.allEvents} />
    </Fragment>;
}

export async function getServerSideProps() {
    const allEvents = await getAllEvents();
    return {
        props: {
            allEvents: allEvents
        }
    };
}

export default AllEventsPage;