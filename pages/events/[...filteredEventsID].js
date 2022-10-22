import { getFilteredEvents } from "../../test-data";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage() {
    const router = useRouter();
    const filteredEventsId = router.query.filteredEventsID;
    if (!filteredEventsId) {
        return;
    }
    console.log(filteredEventsId);
    const filterYear = filteredEventsId[0];
    const filterMonth = filteredEventsId[1];
    const numYear = +filterYear;
    const numMonth = +filterMonth;
    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        return <Fragment>
            <ErrorAlert>
                <p>Invalid Filter. Please check values!</p>
            </ErrorAlert>
            <div className="center">
                <Button link="/events">Show All Events</Button>
            </div>
        </Fragment>;
    }

    const dateFilters = {
        year: numYear,
        month: numMonth
    };
    const filteredEvents = getFilteredEvents(dateFilters);
    if (!filteredEvents || filteredEvents.length < 1) {
        return <Fragment>
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
        <ResultsTitle date={date} />
        <EventList events={filteredEvents} />
    </Fragment>;
}

export default FilteredEventsPage;