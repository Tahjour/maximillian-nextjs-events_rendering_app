import EventList from "../components/events/event-list";
import { useEffect } from "react";
import { getFeaturedEvents } from "../helpers/api-utils";

function HomeEventsPage(props) {
    return <div>
        <EventList events={props.featuredEvents} />
    </div>;
}

export async function getStaticProps(context) {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            featuredEvents: featuredEvents
        },
        revalidate: 1800
    };
}

export default HomeEventsPage;