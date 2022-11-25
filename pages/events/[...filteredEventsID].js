import { getFilteredEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";

function FilteredEventsPage(props) {
    //Client side data-fetching
    const databaseURL = "https://react-routing-demo-default-rtdb.firebaseio.com/events.json";
    const [loadedEvents, setLoadedEvents] = useState([]);
    const router = useRouter();
    const filteredEventsData = router.query.filteredEventsId;
    const fetcher = (databaseURL) => fetch(databaseURL).then(res => res.json());
    const { data, error } = useSWR(databaseURL, fetcher);
    useEffect(() => {
        if (data) {
            const events = [];
            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                });
            }
            setLoadedEvents(events);
        }
    }, [data]);

    let pageHeadData = <Head>
        <title>Filtered Events</title>
        <meta name="description" content={`A list of filtered events.`} />
    </Head>;

    if (!loadedEvents || loadedEvents.length < 1) {
        return <Fragment>
            {pageHeadData}
            <p className="center">Loading</p>;
        </Fragment>;
    }

    const filterYear = filteredEventsData[0];
    const filterMonth = filteredEventsData[1];
    const numYear = +filterYear;
    const numMonth = +filterMonth;

    pageHeadData = <Head>
        <title>Filtered Events</title>
        <meta name="description" content={`Events for ${numMonth}/${numYear}`} />
    </Head>;

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === (numMonth - 1);
    });

    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        return <Fragment>
            {pageHeadData}
            <ErrorAlert>
                <p>Invalid Filter. Please check values!</p>
            </ErrorAlert>
            <div className="center">
                <Button link="/events">Show All Events</Button>
            </div>
        </Fragment>;
    }

    if (!filteredEvents || filteredEvents.length < 1) {
        return <Fragment>
            {pageHeadData}
            <ErrorAlert>
                <p>No Events Found!</p>
            </ErrorAlert>
            <div className="center">
                <Button link="/events">Show All Events</Button>
            </div>
        </Fragment>;
    }
    const date = new Date(numYear, numMonth - 1);
    return <Fragment>
        {pageHeadData}
        <ResultsTitle date={date} />
        <EventList events={filteredEvents} />
    </Fragment>;
}

// export async function getServerSideProps(context) {
//     const { params } = context;

//     const filterYear = params.filteredEventsId[0];
//     const filterMonth = params.filteredEventsId[1];
//     const numYear = parseInt(filterYear, 10);
//     const numMonth = parseInt(filterMonth, 10);
//     if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
//         return {
//             props: { hasError: true }
//             //other options below
//             // notFound: true,
//             // redirect: {
//             //     destination: '/error'
//             // }
//         };
//     }
//     const dateFilters = {
//         year: numYear,
//         month: numMonth
//     };
//     const filteredEvents = await getFilteredEvents(dateFilters);

//     return {
//         props: {
//             filteredEvents: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     };
// }

export default FilteredEventsPage;