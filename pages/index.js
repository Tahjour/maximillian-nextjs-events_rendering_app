import EventList from "../components/events/event-list";
import { useEffect } from "react";
import { getFeaturedEvents } from "../helpers/api-utils";
import Head from "next/head";
import NewsletterRegistration from "../components/input/newsletter-registration";

function HomeEventsPage(props) {
    return <div>
        <Head>
            <title>NextJS Events</title>
            <meta name="description" content="Find a lot of great events" />
        </Head>
        <NewsletterRegistration />
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