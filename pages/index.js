import EventList from "../components/events/event-list";
import { useEffect } from "react";
import { getFeaturedEvents } from "../helpers/api-utils";
import Head from "next/head";

function HomeEventsPage(props) {
    return <div>
        <Head>
            <title>NextJS Events</title>
            <meta name="description" content="Find a lot of great events" />
        </Head>
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